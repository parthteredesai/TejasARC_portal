const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const dataModel = require("./models/dataModel.js");
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

const MONGO_URL = "mongodb://127.0.0.1:27017/testdata1";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("/ route initiated");
});

app.get("/add", async (req, res) => {
  const sample = new dataModel({
    timestamp: new Date(),
    panel_id: "PANEL-1",
    voltage: 12.3,
    current: 1.2,
    irradiance: 450,
    panel_temp: 25,
    ambient_temp: 22,
    dust: 0.12,
    pressure: 1012,
    humidity: 55,
    source: "test",
  });

  await sample.save();
  res.send("Sample data added");
});
