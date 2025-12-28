const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
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

    five_day_forecast: [
      {
        day: String,
        efficiency: Number,
        weather: String,
        soiling_loss_factor: Number,
      },
    ],
  },
},
);

const postDataDb = mongoose.connection.useDb("TejasArk_post_data"); 

// 2. Create the model using the custom connection object
const AIDataCollectionModel = postDataDb.model(
  "AIDataCollection", // Mongoose model name
  dataSchema,
  "aiDatacollection" // Collection name in the DB
);

module.exports = AIDataCollectionModel;
