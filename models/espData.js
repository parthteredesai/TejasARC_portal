const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const espSchema = new mongoose.Schema({
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
  tilt_angle: Number
});

const espdataModel = mongoose.connection.useDb("TejasArk_pre_data");

module.exports = espdataModel.model("espdataModel", espSchema);
