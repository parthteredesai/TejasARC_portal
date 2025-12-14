const sampleData1 = [
  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T10:45:00Z",
    "sensors": {
      "temperature": 31.5,
      "humidity": 63,
      "pressure": 1002,
      "altitude": 54.5,
      "bus_voltage": 12.1,
      "shunt_voltage": 0.12,
      "current": 0.64,
      "power": 7.74,
      "light_intensity": 812,
      "dust_density": 22.4,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 86.4,
      "ideal_power": 9.0,
      "efficiency_drop": 2.1,
      "panel_health_score": 94.5,
      "weather_condition": "Partly Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust accumulation",
      "contributing_factors": [
        "High panel temperature",
        "Mild dust presence"
      ],
      "recommendation": "Clean panel surface for optimal output"
    },
    "forecast": {
      "next_24_hours": "Moderate sunlight expected",
      "week_trend": "Improving irradiance after 3 days"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T11:00:00Z",
    "sensors": {
      "temperature": 32.1,
      "humidity": 60,
      "pressure": 1003,
      "altitude": 54.5,
      "bus_voltage": 12.3,
      "shunt_voltage": 0.13,
      "current": 0.67,
      "power": 8.02,
      "light_intensity": 840,
      "dust_density": 21.8,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 87.1,
      "ideal_power": 9.2,
      "efficiency_drop": 1.9,
      "panel_health_score": 95.0,
      "weather_condition": "Sunny",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Panel temperature",
      "contributing_factors": ["Dust presence"],
      "recommendation": "Keep panel surface cool"
    },
    "forecast": {
      "next_24_hours": "Clear sky expected",
      "week_trend": "Stable sunlight"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T11:15:00Z",
    "sensors": {
      "temperature": 33.0,
      "humidity": 58,
      "pressure": 1004,
      "altitude": 54.5,
      "bus_voltage": 12.2,
      "shunt_voltage": 0.14,
      "current": 0.70,
      "power": 8.40,
      "light_intensity": 870,
      "dust_density": 23.1,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 85.8,
      "ideal_power": 9.4,
      "efficiency_drop": 2.4,
      "panel_health_score": 93.8,
      "weather_condition": "Hazy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust accumulation",
      "contributing_factors": ["High temperature"],
      "recommendation": "Consider cleaning in next cycle"
    },
    "forecast": {
      "next_24_hours": "High sunlight",
      "week_trend": "Possible haze"
    }
  },

  {
    "panel_id": "PANEL_B",
    "timestamp": "2025-12-09T11:30:00Z",
    "sensors": {
      "temperature": 30.4,
      "humidity": 66,
      "pressure": 1001,
      "altitude": 48.2,
      "bus_voltage": 11.9,
      "shunt_voltage": 0.11,
      "current": 0.61,
      "power": 7.26,
      "light_intensity": 780,
      "dust_density": 19.5,
      "tilt_angle": 30.0
    },
    "ai_output": {
      "predicted_efficiency": 89.2,
      "ideal_power": 8.5,
      "efficiency_drop": 1.4,
      "panel_health_score": 96.1,
      "weather_condition": "Partly Cloudy",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "No action needed"
    },
    "forecast": {
      "next_24_hours": "Bright conditions",
      "week_trend": "Increasing sunlight"
    }
  },

  {
    "panel_id": "PANEL_B",
    "timestamp": "2025-12-09T11:45:00Z",
    "sensors": {
      "temperature": 31.0,
      "humidity": 64,
      "pressure": 1000,
      "altitude": 48.2,
      "bus_voltage": 12.0,
      "shunt_voltage": 0.11,
      "current": 0.63,
      "power": 7.56,
      "light_intensity": 810,
      "dust_density": 20.1,
      "tilt_angle": 30.0
    },
    "ai_output": {
      "predicted_efficiency": 88.7,
      "ideal_power": 8.7,
      "efficiency_drop": 1.6,
      "panel_health_score": 95.7,
      "weather_condition": "Clear",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Mild dust",
      "contributing_factors": ["Temperature rise"],
      "recommendation": "Monitor dust levels"
    },
    "forecast": {
      "next_24_hours": "Clear sky",
      "week_trend": "Sunny days ahead"
    }
  },

  {
    "panel_id": "PANEL_C",
    "timestamp": "2025-12-09T12:00:00Z",
    "sensors": {
      "temperature": 29.8,
      "humidity": 70,
      "pressure": 999,
      "altitude": 62.0,
      "bus_voltage": 12.4,
      "shunt_voltage": 0.15,
      "current": 0.72,
      "power": 8.93,
      "light_intensity": 890,
      "dust_density": 26.2,
      "tilt_angle": 25.0
    },
    "ai_output": {
      "predicted_efficiency": 84.9,
      "ideal_power": 9.8,
      "efficiency_drop": 3.1,
      "panel_health_score": 92.0,
      "weather_condition": "Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Heavy dust",
      "contributing_factors": ["Cloud cover"],
      "recommendation": "Clean urgently for best performance"
    },
    "forecast": {
      "next_24_hours": "Cloudy",
      "week_trend": "Improving after 2 days"
    }
  },

  {
    "panel_id": "PANEL_C",
    "timestamp": "2025-12-09T12:15:00Z",
    "sensors": {
      "temperature": 30.2,
      "humidity": 68,
      "pressure": 998,
      "altitude": 62.0,
      "bus_voltage": 12.2,
      "shunt_voltage": 0.14,
      "current": 0.69,
      "power": 8.41,
      "light_intensity": 860,
      "dust_density": 24.9,
      "tilt_angle": 25.0
    },
    "ai_output": {
      "predicted_efficiency": 85.5,
      "ideal_power": 9.5,
      "efficiency_drop": 3.0,
      "panel_health_score": 92.7,
      "weather_condition": "Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": ["Moisture"],
      "recommendation": "Consider cleaning soon"
    },
    "forecast": {
      "next_24_hours": "Light clouds",
      "week_trend": "Sunny after 3 days"
    }
  },

  {
    "panel_id": "PANEL_D",
    "timestamp": "2025-12-09T12:30:00Z",
    "sensors": {
      "temperature": 27.4,
      "humidity": 72,
      "pressure": 1005,
      "altitude": 40.1,
      "bus_voltage": 12.6,
      "shunt_voltage": 0.16,
      "current": 0.75,
      "power": 9.45,
      "light_intensity": 910,
      "dust_density": 18.5,
      "tilt_angle": 32.0
    },
    "ai_output": {
      "predicted_efficiency": 91.3,
      "ideal_power": 10.1,
      "efficiency_drop": 1.0,
      "panel_health_score": 97.5,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "System optimal"
    },
    "forecast": {
      "next_24_hours": "Strong sunlight",
      "week_trend": "Consistent irradiance"
    }
  },

  {
    "panel_id": "PANEL_D",
    "timestamp": "2025-12-09T12:45:00Z",
    "sensors": {
      "temperature": 28.0,
      "humidity": 70,
      "pressure": 1004,
      "altitude": 40.1,
      "bus_voltage": 12.4,
      "shunt_voltage": 0.15,
      "current": 0.73,
      "power": 9.05,
      "light_intensity": 900,
      "dust_density": 19.1,
      "tilt_angle": 32.0
    },
    "ai_output": {
      "predicted_efficiency": 90.4,
      "ideal_power": 10.0,
      "efficiency_drop": 1.2,
      "panel_health_score": 97.1,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "Minor dust",
      "contributing_factors": [],
      "recommendation": "Monitoring only"
    },
    "forecast": {
      "next_24_hours": "Good sunlight",
      "week_trend": "Clear weather"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T13:00:00Z",
    "sensors": {
      "temperature": 34.0,
      "humidity": 55,
      "pressure": 1003,
      "altitude": 54.5,
      "bus_voltage": 12.1,
      "shunt_voltage": 0.12,
      "current": 0.66,
      "power": 7.98,
      "light_intensity": 850,
      "dust_density": 25.4,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 84.0,
      "ideal_power": 9.2,
      "efficiency_drop": 2.7,
      "panel_health_score": 92.5,
      "weather_condition": "Hazy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": ["High temp"],
      "recommendation": "Clean panel soon"
    },
    "forecast": {
      "next_24_hours": "Hazy sunlight",
      "week_trend": "Clear in 4 days"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T13:15:00Z",
    "sensors": {
      "temperature": 33.6,
      "humidity": 57,
      "pressure": 1004,
      "altitude": 54.5,
      "bus_voltage": 12.3,
      "shunt_voltage": 0.13,
      "current": 0.68,
      "power": 8.36,
      "light_intensity": 875,
      "dust_density": 26.0,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 83.8,
      "ideal_power": 9.4,
      "efficiency_drop": 3.0,
      "panel_health_score": 91.9,
      "weather_condition": "Hazy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Heavy dust",
      "contributing_factors": [],
      "recommendation": "Immediate cleaning advised"
    },
    "forecast": {
      "next_24_hours": "Less sunlight",
      "week_trend": "Clear in 3 days"
    }
  },

  {
    "panel_id": "PANEL_B",
    "timestamp": "2025-12-09T13:30:00Z",
    "sensors": {
      "temperature": 29.0,
      "humidity": 68,
      "pressure": 1002,
      "altitude": 48.2,
      "bus_voltage": 12.5,
      "shunt_voltage": 0.16,
      "current": 0.74,
      "power": 9.25,
      "light_intensity": 920,
      "dust_density": 18.0,
      "tilt_angle": 30.0
    },
    "ai_output": {
      "predicted_efficiency": 91.8,
      "ideal_power": 10.3,
      "efficiency_drop": 1.1,
      "panel_health_score": 97.8,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "Optimal performance"
    },
    "forecast": {
      "next_24_hours": "Sunlight peak",
      "week_trend": "Stable"
    }
  },

  {
    "panel_id": "PANEL_C",
    "timestamp": "2025-12-09T13:45:00Z",
    "sensors": {
      "temperature": 28.7,
      "humidity": 72,
      "pressure": 999,
      "altitude": 62.0,
      "bus_voltage": 12.3,
      "shunt_voltage": 0.15,
      "current": 0.71,
      "power": 8.73,
      "light_intensity": 890,
      "dust_density": 24.2,
      "tilt_angle": 25.0
    },
    "ai_output": {
      "predicted_efficiency": 86.2,
      "ideal_power": 9.7,
      "efficiency_drop": 2.9,
      "panel_health_score": 93.3,
      "weather_condition": "Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": ["Humidity"],
      "recommendation": "Clean recommended soon"
    },
    "forecast": {
      "next_24_hours": "Cloudy sunshine",
      "week_trend": "Clear trend"
    }
  },

  {
    "panel_id": "PANEL_D",
    "timestamp": "2025-12-09T14:00:00Z",
    "sensors": {
      "temperature": 27.9,
      "humidity": 69,
      "pressure": 1003,
      "altitude": 40.1,
      "bus_voltage": 12.7,
      "shunt_voltage": 0.17,
      "current": 0.78,
      "power": 9.91,
      "light_intensity": 940,
      "dust_density": 17.0,
      "tilt_angle": 32.0
    },
    "ai_output": {
      "predicted_efficiency": 92.5,
      "ideal_power": 10.5,
      "efficiency_drop": 0.9,
      "panel_health_score": 98.5,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "Excellent condition"
    },
    "forecast": {
      "next_24_hours": "High sunlight",
      "week_trend": "Very stable"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T14:15:00Z",
    "sensors": {
      "temperature": 35.0,
      "humidity": 50,
      "pressure": 1003,
      "altitude": 54.5,
      "bus_voltage": 12.2,
      "shunt_voltage": 0.13,
      "current": 0.71,
      "power": 8.66,
      "light_intensity": 870,
      "dust_density": 28.1,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 82.1,
      "ideal_power": 9.6,
      "efficiency_drop": 3.3,
      "panel_health_score": 91.1,
      "weather_condition": "Hazy",
      "status": "Needs Attention"
    },
    "root_cause_analysis": {
      "major_factor": "Heavy dust",
      "contributing_factors": ["High temp"],
      "recommendation": "Recommended to clean now"
    },
    "forecast": {
      "next_24_hours": "Low visibility sunlight",
      "week_trend": "Improves after rainfall"
    }
  },

  {
    "panel_id": "PANEL_B",
    "timestamp": "2025-12-09T14:30:00Z",
    "sensors": {
      "temperature": 29.5,
      "humidity": 65,
      "pressure": 1002,
      "altitude": 48.2,
      "bus_voltage": 12.6,
      "shunt_voltage": 0.17,
      "current": 0.76,
      "power": 9.57,
      "light_intensity": 910,
      "dust_density": 19.2,
      "tilt_angle": 30.0
    },
    "ai_output": {
      "predicted_efficiency": 92.0,
      "ideal_power": 10.2,
      "efficiency_drop": 1.1,
      "panel_health_score": 97.7,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "No action required"
    },
    "forecast": {
      "next_24_hours": "Clear",
      "week_trend": "Stable sun"
    }
  },

  {
    "panel_id": "PANEL_C",
    "timestamp": "2025-12-09T14:45:00Z",
    "sensors": {
      "temperature": 30.1,
      "humidity": 66,
      "pressure": 1000,
      "altitude": 62.0,
      "bus_voltage": 12.3,
      "shunt_voltage": 0.14,
      "current": 0.70,
      "power": 8.61,
      "light_intensity": 870,
      "dust_density": 23.1,
      "tilt_angle": 25.0
    },
    "ai_output": {
      "predicted_efficiency": 87.0,
      "ideal_power": 9.4,
      "efficiency_drop": 2.4,
      "panel_health_score": 94.0,
      "weather_condition": "Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": ["Humidity"],
      "recommendation": "Cleaning helps improve output"
    },
    "forecast": {
      "next_24_hours": "Mild clouds",
      "week_trend": "Better sunlight"
    }
  },

  {
    "panel_id": "PANEL_D",
    "timestamp": "2025-12-09T15:00:00Z",
    "sensors": {
      "temperature": 28.1,
      "humidity": 68,
      "pressure": 1004,
      "altitude": 40.1,
      "bus_voltage": 12.8,
      "shunt_voltage": 0.18,
      "current": 0.80,
      "power": 10.24,
      "light_intensity": 950,
      "dust_density": 16.3,
      "tilt_angle": 32.0
    },
    "ai_output": {
      "predicted_efficiency": 93.1,
      "ideal_power": 10.7,
      "efficiency_drop": 0.8,
      "panel_health_score": 98.9,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "Excellent generation"
    },
    "forecast": {
      "next_24_hours": "Clear and strong",
      "week_trend": "Peak sunlight"
    }
  },

  {
    "panel_id": "PANEL_A",
    "timestamp": "2025-12-09T15:15:00Z",
    "sensors": {
      "temperature": 33.2,
      "humidity": 54,
      "pressure": 1003,
      "altitude": 54.5,
      "bus_voltage": 12.0,
      "shunt_voltage": 0.12,
      "current": 0.64,
      "power": 7.68,
      "light_intensity": 830,
      "dust_density": 27.3,
      "tilt_angle": 28.5
    },
    "ai_output": {
      "predicted_efficiency": 83.5,
      "ideal_power": 9.1,
      "efficiency_drop": 2.8,
      "panel_health_score": 92.0,
      "weather_condition": "Hazy",
      "status": "Needs Attention"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": ["Temperature"],
      "recommendation": "Clean recommended"
    },
    "forecast": {
      "next_24_hours": "Hazy sunlight",
      "week_trend": "Clearer conditions soon"
    }
  },

  {
    "panel_id": "PANEL_B",
    "timestamp": "2025-12-09T15:30:00Z",
    "sensors": {
      "temperature": 28.7,
      "humidity": 63,
      "pressure": 1002,
      "altitude": 48.2,
      "bus_voltage": 12.7,
      "shunt_voltage": 0.17,
      "current": 0.79,
      "power": 10.03,
      "light_intensity": 940,
      "dust_density": 17.5,
      "tilt_angle": 30.0
    },
    "ai_output": {
      "predicted_efficiency": 92.4,
      "ideal_power": 10.4,
      "efficiency_drop": 1.0,
      "panel_health_score": 98.1,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "Everything OK"
    },
    "forecast": {
      "next_24_hours": "Strong sunlight",
      "week_trend": "Stable energy"
    }
  },

  {
    "panel_id": "PANEL_C",
    "timestamp": "2025-12-09T15:45:00Z",
    "sensors": {
      "temperature": 29.4,
      "humidity": 64,
      "pressure": 1001,
      "altitude": 62.0,
      "bus_voltage": 12.2,
      "shunt_voltage": 0.13,
      "current": 0.67,
      "power": 8.17,
      "light_intensity": 850,
      "dust_density": 22.7,
      "tilt_angle": 25.0
    },
    "ai_output": {
      "predicted_efficiency": 87.4,
      "ideal_power": 9.2,
      "efficiency_drop": 2.1,
      "panel_health_score": 94.3,
      "weather_condition": "Partly Cloudy",
      "status": "Normal"
    },
    "root_cause_analysis": {
      "major_factor": "Dust",
      "contributing_factors": [],
      "recommendation": "Clean optional"
    },
    "forecast": {
      "next_24_hours": "Mixed clouds",
      "week_trend": "Improvements ahead"
    }
  },
  
  {
    "panel_id": "PANEL_D",
    "timestamp": "2025-12-09T16:00:00Z",
    "sensors": {
      "temperature": 27.3,
      "humidity": 67,
      "pressure": 1005,
      "altitude": 40.1,
      "bus_voltage": 12.9,
      "shunt_voltage": 0.19,
      "current": 0.82,
      "power": 10.58,
      "light_intensity": 960,
      "dust_density": 15.8,
      "tilt_angle": 32.0
    },
    "ai_output": {
      "predicted_efficiency": 93.7,
      "ideal_power": 10.8,
      "efficiency_drop": 0.7,
      "panel_health_score": 99.1,
      "weather_condition": "Sunny",
      "status": "Excellent"
    },
    "root_cause_analysis": {
      "major_factor": "None",
      "contributing_factors": [],
      "recommendation": "Best performance"
    },
    "forecast": {
      "next_24_hours": "Very strong sunlight",
      "week_trend": "High irradiance"
    }
  }
]


module.exports = { data: sampleData1 };
