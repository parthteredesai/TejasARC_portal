const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },

    insight: {
      timestamp: {
        type: Date,
        default: Date.now,
        required: true,
      },

      live_diagnosis: {
        actual_power: Number,
        predicted_power: Number,
        efficiency_pct: Number,
        health_score: String,
        root_cause: String,
        action: String,
      },

      weather_benchmark: {
        efficiency_score: Number,
        benchmark_pct: Number,
        temp: Number,
        recommendation: String,

        weather_snapshot: {
          visibility_km: Number,
          clouds: Number,
          wind_cooling_factor: Number,
        },
      },

      // UPDATED five_day_forecast STRUCTURE
      five_day_forecast: [
        {
          day: String,
          efficiency: Number,

          meta: {
            condition: String,
            temp: String,
            wind: String,
            humidity: String,
          },
        },
      ],

      // FIXED type (was "string")
      expert_recommendation: {
        type: String,
      },
    },
  },
);

// Use specific database
const postDataDb = mongoose.connection.useDb("TejasArk_post_data");

// Create model
const AIDataCollectionModel = postDataDb.model(
  "AIDataCollection",
  dataSchema,
  "aiDatacollection"
);

module.exports = AIDataCollectionModel;
