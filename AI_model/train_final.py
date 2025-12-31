import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization, Input
from tensorflow.keras.optimizers import Adam

df = pd.read_csv('solar_data_5000_v3.csv')
df = df.rename(columns={
    'RGB_Red': 'r_p', 'RGB_Green': 'g_p', 'RGB_Blue': 'b_p',
    'Temperature_Ambient': 'atp', 'Temperature_Panel': 'ptp',
    'Panel_Bus_Voltage': 'v', 'Shunt_Current': 'ma', 'Irradiance_W_m2': 'lux',
    'Panel_Tilt_Angle_Z': 'tlt', 'Humidity_Relative': 'hum',
    'Dust_Density_g_m2': 'dst'
})
cause_encoder = LabelEncoder()
action_encoder = LabelEncoder()
df['Root_Cause_ID'] = cause_encoder.fit_transform(df['Root_Cause_Class'])
df['Action_ID'] = action_encoder.fit_transform(df['Recommended_Action'])
joblib.dump(cause_encoder, 'cause_encoder.pkl')
joblib.dump(action_encoder, 'action_encoder.pkl')

def apply_expert_relations(data):
    eps = 1e-6
    data['blue_red_ratio'] = data['b_p'] / (data['r_p'] + eps)
    data['temp_diff'] = data['ptp'] - data['atp']
    data['tilt_eff'] = np.cos(np.radians(data['tlt']))
    data['raw_power'] = (data['v'] * data['ma']) / 1000.0
    data['eff_per_lux'] = data['raw_power'] / (data['lux'] + eps)
    data['env_stress'] = (data['hum'] * data['atp']) / 100.0
    return data

df = apply_expert_relations(df)
X_features = [
    'lux', 'r_p', 'g_p', 'b_p', 'v', 'ma', 'ptp', 'atp', 'tlt', 'hum', 'dst',
    'blue_red_ratio', 'temp_diff', 'tilt_eff', 'eff_per_lux', 'env_stress'
]
Y_targets = [
    'Current_Predicted', 'Voltage_Predicted', 'Power_Predicted',
    'Efficiency_Predicted', 'Ideal_Max_Power', 'Efficiency_Drop_Percent', 
    'Heat_Dissipation_C', 'Root_Cause_ID', 'Action_ID'
]
X = df[X_features].values
Y = df[Y_targets].values

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.15, random_state=42)
X_scaler = StandardScaler()
Y_scaler = StandardScaler()
X_train_scaled = X_scaler.fit_transform(X_train)
Y_train_scaled = Y_scaler.fit_transform(Y_train)
X_test_scaled = X_scaler.transform(X_test)
Y_test_scaled = Y_scaler.transform(Y_test)
joblib.dump(X_scaler, 'X_scaler_expert.pkl')
joblib.dump(Y_scaler, 'Y_scaler_expert.pkl')
print("X and Y Scalers saved.")

model = Sequential([
    Dense(512, activation='swish', input_shape=(len(X_features),)),
    BatchNormalization(),
    Dropout(0.2),
    Dense(256, activation='swish'),
    Dense(128, activation='swish'),
    Dense(len(Y_targets), activation='linear')
])
model.compile(optimizer=Adam(learning_rate=0.001), loss='huber', metrics=['mae'])
print("Training AI to predict Efficiency, Root Causes, and Recommended Actions...")
model.fit(X_train_scaled, Y_train_scaled, epochs=150, batch_size=64, verbose=1)
model.save('solar_expert_ai.h5')
print("Model Saved Successfully.")