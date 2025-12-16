const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new mongoose.Schema({
  panel_id: {
    type: String,
    required: true,
    index: true,
  },

  timestamp: {
    type: Date,
    required: true,
  },

  sensors: {
    temperature: Number,
    humidity: Number,
    pressure: Number,
    altitude: Number,
    bus_voltage: Number,
    shunt_voltage: Number,
    current: Number,
    power: Number,
    light_intensity: Number,
    dust_density: Number,
    tilt_angle: Number,
  },

  ai_output: {
    predicted_efficiency: Number,
    ideal_power: Number,
    efficiency_drop: Number,
    panel_health_score: Number,
    weather_condition: String,
    status: String,
  },

  root_cause_analysis: {
    major_factor: String,
    contributing_factors: [String],
    recommendation: String,
  },

  forecast: {
    next_24_hours: String,
    week_trend: String,
  },
});

const dataModel = mongoose.connection.useDb("TejasArk_post_data");

module.exports = dataModel.model("dataModel", dataSchema);
