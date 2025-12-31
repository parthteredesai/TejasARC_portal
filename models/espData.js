const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const espSchema = new Schema({
  
    lux: Number,
    r: Number,
    g: Number,
    b: Number,
    v: Number,
    ma: Number,
    vib: Number,
    prox: Number,
    ta: Number,
    tp: Number,
    hum: Number,
    tlt: Number,
    dst: Number,
    ts: {
      type: Date,
      default: Date.now,
    },
  }
);

const espdataModel = mongoose.connection.useDb("TejasArk_pre_data");

const espDataCollectionModel = espdataModel.model(
  "espDataCollection",   // Mongoose model name
  espSchema,
  "espDatacollection"    // Actual MongoDB collection name
);

module.exports = espDataCollectionModel;
