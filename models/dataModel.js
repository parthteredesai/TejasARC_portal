const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  panel_id: {
    type: String,
    required: true,
  },
  voltage: Number,
  current: Number,
  irradiance: Number,
  panel_temp: Number,
  ambient_temp: Number,
  dust: Number,
  pressure: Number,
  humidity: Number,
  source: String,
  efficiency: Number,
});

const dataModel = mongoose.model("dataModel", dataSchema);
module.exports = dataModel;
