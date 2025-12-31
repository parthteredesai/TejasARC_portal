import os
from dotenv import load_dotenv
import requests
import numpy as np
import pymongo
import joblib
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta,  timezone

app = Flask(__name__)
load_dotenv()
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
CITY = "Mumbai"
lat = 19.0144 
lon = 72.8479
MONGO_URI = "mongodb+srv://parthteredesai_dbuser:Parthx1806@cluster0.zqbwwem.mongodb.net/?appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)
raw_db = client["TejasArk_pre_data"]
diag_db = client["TejasArk_post_data"]
raw_collection = raw_db["espDatacollection"]
diag_collection = diag_db["aiDatacollection"]

live_model = load_model('solar_expert_ai.h5', compile = False)
scaler_x = joblib.load('X_scaler_expert.pkl') 
scaler_y = joblib.load('Y_scaler_expert.pkl')

#P1
def run_sensor_pipeline(data):
    eps = 1e-6
    p_act = (data['v'] * data['ma']) / 1000.0
    blue_red_ratio = data['b'] / (data['r'] + eps)
    temp_diff = data.get('ptp', 25) - data.get('atp', 25) 
    tilt_eff = np.cos(np.radians(data.get('tlt', 0)))
    eff_per_lux = p_act / (data['lux'] + eps)
    env_stress = (data.get('hum', 50) * data.get('atp', 25)) / 100.0

    features = np.array([[
        data['lux'], data['r'], data['g'], data['b'], data['v'], data['ma'],
        data.get('ptp', 25), data.get('atp', 25), data.get('tlt', 0), 
        data.get('hum', 50), data.get('dst', 0),
        blue_red_ratio, temp_diff, tilt_eff,  eff_per_lux, env_stress
    ]])

    try:
        scaled_x = scaler_x.transform(features)
        prediction_scaled = live_model.predict(scaled_x, verbose=0) 
        p_all = scaler_y.inverse_transform(prediction_scaled)[0]
        p_pred = p_all[2]
        health_score = p_all[4]
        physics_max = (data['lux'] / 100000.0) * 10.0
        if p_pred > (physics_max * 1.5) or p_pred < 0.1:
            p_pred = physics_max
            health_score = 0.5 
    except Exception as e:
        p_pred = (data['lux'] / 100000.0) * 10.0
        health_score = 0.5
        print(f"AI Pipeline Error: {e}")
    actual_eff_pct = (p_act / p_pred) * 100 if p_pred > 0.01 else 0
    actual_eff_pct = np.clip(actual_eff_pct, 0, 100)
    status = "Excellent" if health_score > 0.9 else "Good" if health_score > 0.7 else "Fair"
    if actual_eff_pct < 50: status = "Critical"
    
    cause, action = "Normal", "None"
    
    # Diagnostic Logic
    if actual_eff_pct < 85:
        if data['g'] > (data['r'] * 1.2): 
            cause, action = "Biological Growth", "Clean moss/algae with anti-fungal solution."
        elif data['lux'] > 500 and data['v'] < 10.0: 
            cause, action = "Hardware Fault", "Bypass diode or wiring failure. Inspect junction box."
        elif data['lux'] > 600 and data['v'] < 14.0:
            cause, action = "Partial Shading", "Physical obstruction detected. Check for leaves/shadows."
        elif data['r'] > (data['b'] * 1.5) and data['lux'] < 800:
            cause, action = "Urban Smog/Haze", "Atmospheric interference. No manual action required."
        else:
            cause, action = "Surface Soiling", f"Wipe surface. Estimated {round(100-actual_eff_pct)}% power recovery."
    if data.get('vib', 0) > 3.5:
        cause, action = "Structural Instability", "High vibration! Tighten mounting bolts." 
    if data.get('ptp', 0) > 60:
        cause, action = "Thermal Stress", "Panel overheating (>60°C). Improve rear ventilation."

    return {
        "efficiency_pct": round(float(actual_eff_pct), 2),
        "health_score": status,
        "root_cause": cause,
        "action": action,
        "predicted_power": round(float(p_pred), 3),
     
        "actual_power": round(float(p_act), 3)
    }
#P2
def run_weather_pipeline():
    url = f"https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={WEATHER_API_KEY}&units=metric"
    w = requests.get(url).json()
    temp = w['main']['temp']
    hum = w['main']['humidity']
    clouds = w['clouds']['all']
    wind = w['wind']['speed']
    vis = w.get('visibility', 10000) / 1000 #VisNormalization
    cloud_loss = clouds * 0.8
    effective_cell_temp = temp - (wind * 0.4) 
    temp_penalty = max(0, (effective_cell_temp - 25) * 0.004)
    vis_penalty = max(0, (10 - vis) * 0.02) #EffLost
    current_benchmark_eff = 100 - (cloud_loss + (temp_penalty * 100) + (vis_penalty * 100))
    return {
        "efficiency_score": round(np.clip(current_benchmark_eff / 100, 0, 1), 2),
        "benchmark_pct": round(np.clip(current_benchmark_eff, 0, 100), 2),
        "temp": temp,
        "recommendation": "Optimum Weather" if current_benchmark_eff > 80 else "Atmospheric Interference",
        "weather_snapshot": {
            "visibility_km": vis,
            "clouds": clouds,
            "wind_cooling_factor": round(wind * 0.4, 2)
        }
    }
#P3
def run_hybrid_forecast():
    five_days_ago = datetime.now() - timedelta(days=5)
    history = list(raw_db.logs.find({"ts": {"$gte": five_days_ago}}))
    health_multiplier = 1.0
    if len(history) > 10:
        ratios = [(h['v'] * h['ma'] / 1000) / (h['lux'] + 1e-6) for h in history if h['lux'] > 200]
        if ratios:
            current_avg_eff = np.mean(ratios)
            health_multiplier = np.clip(current_avg_eff / 0.01, 0.5, 1.0)
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={WEATHER_API_KEY}&units=metric"
    res = requests.get(url).json()
    forecast_list = res['list'][::8][:5]
    chart_data = []
    for day in forecast_list:
        f_clouds = day['clouds']['all']
        f_temp = day['main']['temp']
        f_hum = day['main']['humidity']
        f_wind = day['wind']['speed']
        f_vis = day.get('visibility', 10000) / 1000
        f_pres = day['main']['pressure']
        light_entry = (100 - (f_clouds * 0.7)) / 100
        smog_impact = 1.0 - (max(0, 10 - f_vis) * 0.02)
        effective_temp = f_temp + 20 - (f_wind * 1.5)
        temp_impact = 1.0 - (max(0, effective_temp - 25) * 0.004)
        hum_impact = 1.0 - (max(0, f_hum - 60) * 0.001)
        total_potential = (light_entry * smog_impact * temp_impact * hum_impact)
        predicted_percentage = total_potential * health_multiplier * 100
        
        chart_data.append({
            "day": datetime.fromtimestamp(day['dt']).strftime('%a'),
            "efficiency": round(np.clip(predicted_percentage, 0, 100), 1),
            "meta": {
                "condition": day['weather'][0]['main'],
                "temp": f"{f_temp}°C",
                "wind": f"{f_wind}m/s",
                "humidity": f"{f_hum}%"
            }
        })
        
    return chart_data
        
def run_expert_diagnostics(data, p2):
    insights = []
    if data.get('ptp', 0) > 45 and p2['weather_snapshot']['wind_cooling_factor'] < 1.5:
        insights.append("High panel temperature detected with low airflow. Cooling recommended.")
    if "Rain" in p2['recommendation'] or p2['weather_snapshot']['clouds'] > 90:
         insights.append("Precipitation detected. Natural cleaning in progress; soiling levels resetting.")
    if data.get('lux', 0) < 150:
        insights.append("System in low-power mode. Normal behavior for current sun angle.")
    if p2['weather_snapshot']['visibility_km'] < 4 and p2['weather_snapshot']['clouds'] < 25:
        insights.append("Efficiency drop due to urban smog/haze despite clear skies.")
    if data.get('r', 0) > (data.get('b', 0) * 1.5):
        insights.append("Red-shifted light detected. Likely late afternoon or heavy dust haze.")
    if data.get('lux', 0) > 600 and data.get('v', 0) < 10:
        insights.append("Partial Shading Alert: Voltage low despite high light. Check for obstructions like leaves.")
    if data.get('vib', 0) > 3.5:
        insights.append("Mechanical Alert: High vibration detected. Mounting integrity check required.")

    return insights
#AppScript
@app.route('/sync', methods=['POST'])
def sync_all():
    sensor_data = request.json 
    now_utc = datetime.now(timezone.utc)
    sensor_data['ts'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
    raw_collection.insert_one(sensor_data)
    p1 = run_sensor_pipeline(sensor_data)
    p2 = run_weather_pipeline()
    p3 = run_hybrid_forecast()
    expert_alerts = run_expert_diagnostics(sensor_data, p2)
    final_report = {
        "status": "Success",
        "insight": {
            "timestamp": now_utc, 
            "live_diagnosis": {
                "actual_power": p1.get('actual_power'),
                "predicted_power": p1.get('predicted_power'),
                "efficiency_pct": p1.get('efficiency_pct'),
                "health_score": p1.get('health_score'),
                "root_cause": p1.get('root_cause'),
                "action": p1.get('action')
            },
            "weather_benchmark": {
                "efficiency_score": p2.get('efficiency_score'),
                "benchmark_pct": p2.get('benchmark_pct'),
                "temp": p2.get('temp'),
                "recommendation": p2.get('recommendation'),
                "weather_snapshot": p2.get('weather_snapshot')
            },
            "five_day_forecast": p3,
            "expert_recommendation": ". ".join(expert_alerts) if expert_alerts else "System Stable"
        }
    }
    diag_collection.insert_one(final_report)
    final_report.pop("_id", None)
    if "insight" in final_report:
        final_report["insight"].pop("_id", None)
    final_report["insight"]["timestamp"] = now_utc.strftime('%Y-%m-%dT%H:%MZ')
    return jsonify({"status": "Success", "insight": final_report})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)