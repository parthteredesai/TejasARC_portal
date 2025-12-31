import os
from dotenv import load_dotenv
import requests
import numpy as np
import pymongo
import joblib
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta, timezone

# =========================
# ENVIRONMENT SETUP (FIXED)
# =========================
load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
MONGO_URI = os.getenv("MONGO_URL")

CITY = "Mumbai"
lat = 19.0144
lon = 72.8479

# =========================
# FLASK APP
# =========================
app = Flask(__name__)

# =========================
# DATABASE SETUP
# =========================
client = pymongo.MongoClient(MONGO_URI)

raw_db = client["TejasArk_pre_data"]
diag_db = client["TejasArk_post_data"]

raw_collection = raw_db["espDatacollection"]
diag_collection = diag_db["aiDatacollection"]

# =========================
# AI MODEL & SCALERS
# =========================
live_model = load_model("solar_expert_ai.h5", compile=False)
scaler_x = joblib.load("X_scaler_expert.pkl")
scaler_y = joblib.load("Y_scaler_expert.pkl")

# =========================
# P1: SENSOR PIPELINE
# =========================
def run_sensor_pipeline(data):
    eps = 1e-6
    p_act = (data["v"] * data["ma"]) / 1000.0
    blue_red_ratio = data["b"] / (data["r"] + eps)
    temp_diff = data.get("ptp", 25) - data.get("atp", 25)
    tilt_eff = np.cos(np.radians(data.get("tlt", 0)))
    eff_per_lux = p_act / (data["lux"] + eps)
    env_stress = (data.get("hum", 50) * data.get("atp", 25)) / 100.0

    features = np.array([[  
        data["lux"], data["r"], data["g"], data["b"], data["v"], data["ma"],
        data.get("ptp", 25), data.get("atp", 25), data.get("tlt", 0),
        data.get("hum", 50), data.get("dst", 0),
        blue_red_ratio, temp_diff, tilt_eff, eff_per_lux, env_stress
    ]])

    try:
        scaled_x = scaler_x.transform(features)
        prediction_scaled = live_model.predict(scaled_x, verbose=0)
        p_all = scaler_y.inverse_transform(prediction_scaled)[0]
        p_pred = p_all[2]
        health_score = p_all[4]

        physics_max = (data["lux"] / 100000.0) * 10.0
        if p_pred > (physics_max * 1.5) or p_pred < 0.1:
            p_pred = physics_max
            health_score = 0.5

    except Exception as e:
        p_pred = (data["lux"] / 100000.0) * 10.0
        health_score = 0.5
        print(f"AI Pipeline Error: {e}")

    actual_eff_pct = (p_act / p_pred) * 100 if p_pred > 0.01 else 0
    actual_eff_pct = np.clip(actual_eff_pct, 0, 100)

    status = (
        "Excellent" if health_score > 0.9 else
        "Good" if health_score > 0.7 else
        "Fair"
    )
    if actual_eff_pct < 50:
        status = "Critical"

    cause, action = "Normal", "None"

    if actual_eff_pct < 85:
        if data["g"] > (data["r"] * 1.2):
            cause, action = "Biological Growth", "Clean moss/algae with anti-fungal solution."
        elif data["lux"] > 500 and data["v"] < 10.0:
            cause, action = "Hardware Fault", "Inspect bypass diode or wiring."
        elif data["lux"] > 600 and data["v"] < 14.0:
            cause, action = "Partial Shading", "Check for leaves or shadows."
        elif data["r"] > (data["b"] * 1.5) and data["lux"] < 800:
            cause, action = "Urban Smog/Haze", "Atmospheric interference detected."
        else:
            cause, action = "Surface Soiling", f"Wipe surface. Estimated {round(100-actual_eff_pct)}% recovery."

    if data.get("vib", 0) > 3.5:
        cause, action = "Structural Instability", "Tighten mounting bolts."

    if data.get("ptp", 0) > 60:
        cause, action = "Thermal Stress", "Improve rear ventilation."

    return {
        "efficiency_pct": round(float(actual_eff_pct), 2),
        "health_score": status,
        "root_cause": cause,
        "action": action,
        "predicted_power": round(float(p_pred), 3),
        "actual_power": round(float(p_act), 3),
    }

# =========================
# P2: WEATHER PIPELINE
# =========================
def run_weather_pipeline():
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={WEATHER_API_KEY}&units=metric"
    w = requests.get(url).json()

    temp = w["main"]["temp"]
    hum = w["main"]["humidity"]
    clouds = w["clouds"]["all"]
    wind = w["wind"]["speed"]
    vis = w.get("visibility", 10000) / 1000

    cloud_loss = clouds * 0.8
    effective_cell_temp = temp - (wind * 0.4)
    temp_penalty = max(0, (effective_cell_temp - 25) * 0.004)
    vis_penalty = max(0, (10 - vis) * 0.02)

    current_eff = 100 - (cloud_loss + temp_penalty * 100 + vis_penalty * 100)

    return {
        "efficiency_score": round(np.clip(current_eff / 100, 0, 1), 2),
        "benchmark_pct": round(np.clip(current_eff, 0, 100), 2),
        "temp": temp,
        "recommendation": "Optimum Weather" if current_eff > 80 else "Atmospheric Interference",
        "weather_snapshot": {
            "visibility_km": vis,
            "clouds": clouds,
            "wind_cooling_factor": round(wind * 0.4, 2),
        },
    }

# =========================
# API ENDPOINT
# =========================
@app.route("/sync", methods=["POST"])
def sync_all():
    sensor_data = request.json
    now_utc = datetime.now(timezone.utc)

    sensor_data["ts"] = now_utc.strftime("%Y-%m-%dT%H:%MZ")
    raw_collection.insert_one(sensor_data)

    p1 = run_sensor_pipeline(sensor_data)
    p2 = run_weather_pipeline()

    final_report = {
        "status": "Success",
        "insight": {
            "timestamp": now_utc.strftime("%Y-%m-%dT%H:%MZ"),
            "live_diagnosis": p1,
            "weather_benchmark": p2,
        },
    }

    diag_collection.insert_one(final_report)
    return jsonify(final_report)

# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
