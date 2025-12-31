import pandas as pd
import numpy as np

# --- Configuration ---
NUM_ROWS = 5000
np.random.seed(42)

# --- Updated Feature Lists ---
TERRAINS = ['Plain', 'Desert', 'Coastal', 'Himalayan']
TERRAIN_WEIGHTS = [0.34, 0.30, 0.20, 0.16]
TERRAIN_DISTRIBUTION = np.random.choice(TERRAINS, size=NUM_ROWS, p=TERRAIN_WEIGHTS)

ALL_COLUMNS = [
    'Timestamp', 'Terrain_Type', 'Weather_Condition', 
    'Irradiance_W_m2', 'Panel_Bus_Voltage', 'Shunt_Current', 
    'Temperature_Ambient', 'Temperature_Panel', 'Humidity_Relative', 
    'Atm_Pressure', 'Altitude_Approx', 'Panel_Tilt_Angle_Z', 
    'Dust_Density_g_m2', 'RGB_Red', 'RGB_Green', 'RGB_Blue', 'Motion_Detected',
    'Current_Predicted', 'Voltage_Predicted', 'Power_Predicted', 
    'Efficiency_Predicted', 'Efficiency_Drop_Percent', 'Ideal_Max_Power',
    'Heat_Dissipation_C', 'Root_Cause_Class', 'Recommended_Action'
]

df = pd.DataFrame({'Terrain_Type': TERRAIN_DISTRIBUTION})

# Initialize Columns
for col in ALL_COLUMNS:
    if col not in df.columns:
        if col in ['Timestamp', 'Terrain_Type', 'Weather_Condition', 'Root_Cause_Class', 'Recommended_Action', 'Motion_Detected']:
            df[col] = ''
        else:
            df[col] = 0.0

df['Timestamp'] = pd.to_datetime(pd.Series(range(NUM_ROWS)), unit='h', origin=pd.Timestamp('2025-01-01'))

def calculate_metrics_v3(row):
    # Mapping Root Causes to Actions
    ACTION_MAP = {
        'Normal_Operation': 'No action required. System healthy.',
        'Soiling_Severe': '🚨 URGENT: High-pressure water cleaning required immediately.',
        'Temperature_Severe': '⚠️ WARNING: Critical temperature. Check cooling/ventilation.',
        'High_Temperature_Loss': 'Monitor ventilation. Consider surface cooling.',
        'Dust_Accumulation_Loss': 'Scheduled cleaning recommended within 48 hours.',
        'Normal_High_Loss': 'Check for partial shading or wiring resistance.'
    }

    Pmax_stc = 300
    irr = row['Irradiance_W_m2']
    row['Ideal_Max_Power'] = (Pmax_stc / 1000) * irr 

    # Loss factors
    temp_loss = 1 - (max(0, row['Temperature_Panel'] - 25) * 0.004)
    dust_loss = 1 - (row['Dust_Density_g_m2'] / 35)
    net_factor = np.clip(temp_loss * dust_loss, 0.1, 1.0)

    # Simulation logic for Root Cause
    row['Root_Cause_Class'] = 'Normal'
    fault_seed = np.random.rand()
    if fault_seed < 0.05:
        row['Root_Cause_Class'] = 'Soiling_Severe'
        net_factor *= 0.6
    elif fault_seed < 0.10:
        row['Root_Cause_Class'] = 'Temperature_Severe'
        net_factor *= 0.7

    # Calculate Outputs
    row['Current_Predicted'] = (irr / 100) * net_factor * np.random.uniform(0.9, 1.0)
    row['Voltage_Predicted'] = 28.5 * net_factor * np.random.uniform(0.95, 1.05)
    row['Power_Predicted'] = row['Current_Predicted'] * row['Voltage_Predicted']
    row['Efficiency_Predicted'] = np.clip((row['Power_Predicted'] / (irr * 1.5 + 1)) * 100, 0, 22)
    row['Efficiency_Drop_Percent'] = np.clip((1 - (row['Power_Predicted'] / (row['Ideal_Max_Power'] + 1))) * 100, 0, 100)

    # Classify Root Cause if not already set by severe fault
    if row['Root_Cause_Class'] == 'Normal':
        if row['Efficiency_Drop_Percent'] > 15:
            row['Root_Cause_Class'] = 'Dust_Accumulation_Loss' if dust_loss < temp_loss else 'High_Temperature_Loss'
        else:
            row['Root_Cause_Class'] = 'Normal_Operation'

    row['Recommended_Action'] = ACTION_MAP.get(row['Root_Cause_Class'], 'Inspect System.')
    row['Heat_Dissipation_C'] = row['Temperature_Panel'] - row['Temperature_Ambient']
    
    return row

# --- Terrain Specific Logic for RGB and Motion ---
for terrain in TERRAINS:
    idx = df[df['Terrain_Type'] == terrain].index
    n = len(idx)
    
    if terrain == 'Plain':
        df.loc[idx, 'Irradiance_W_m2'] = np.random.normal(700, 200, n).clip(0, 1100)
        df.loc[idx, 'RGB_Red'], df.loc[idx, 'RGB_Green'], df.loc[idx, 'RGB_Blue'] = 0.33, 0.33, 0.33 # Balanced
        df.loc[idx, 'Motion_Detected'] = np.random.choice(['Stable', 'Vibration'], n, p=[0.95, 0.05])
    
    elif terrain == 'Desert':
        df.loc[idx, 'Irradiance_W_m2'] = np.random.normal(900, 150, n).clip(0, 1250)
        # Higher Red, lower Blue due to sand/dust scattering
        df.loc[idx, 'RGB_Red'] = np.random.normal(0.45, 0.05, n).clip(0, 1)
        df.loc[idx, 'RGB_Green'] = np.random.normal(0.30, 0.05, n).clip(0, 1)
        df.loc[idx, 'RGB_Blue'] = np.random.normal(0.25, 0.05, n).clip(0, 1)
        df.loc[idx, 'Motion_Detected'] = np.random.choice(['Stable', 'Sand_Drift'], n, p=[0.8, 0.2])
        df.loc[idx, 'Dust_Density_g_m2'] = np.random.uniform(10, 30, n)

    elif terrain == 'Coastal':
        df.loc[idx, 'Irradiance_W_m2'] = np.random.normal(550, 300, n).clip(0, 1000)
        # Blue/Green shift due to moisture
        df.loc[idx, 'RGB_Red'] = 0.25; df.loc[idx, 'RGB_Green'] = 0.35; df.loc[idx, 'RGB_Blue'] = 0.40
        df.loc[idx, 'Motion_Detected'] = np.random.choice(['Stable', 'Wind_High'], n, p=[0.7, 0.3])
        df.loc[idx, 'Humidity_Relative'] = np.random.uniform(70, 95, n)

    elif terrain == 'Himalayan':
        df.loc[idx, 'Irradiance_W_m2'] = np.random.normal(750, 100, n).clip(0, 1100)
        # High Blue shift (High UV at altitude)
        df.loc[idx, 'RGB_Red'] = 0.20; df.loc[idx, 'RGB_Green'] = 0.30; df.loc[idx, 'RGB_Blue'] = 0.50
        df.loc[idx, 'Motion_Detected'] = np.random.choice(['Stable', 'Snow_Slide'], n, p=[0.9, 0.1])
        df.loc[idx, 'Temperature_Ambient'] = np.random.uniform(-10, 15, n)

# Run physics calculations
df = df.apply(calculate_metrics_v3, axis=1)
df.to_csv('solar_data_5000_v3.csv', index=False)
print("✅ V3 Dataset Generated with RGB, Motion, and Actions.")