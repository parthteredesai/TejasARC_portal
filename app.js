const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const dataModel = require("./models/dataModel.js"); //importing (requiring) datamodels
const espData = require("./models/espData"); //importing (requiring) datamodels
const path = require("path");
const ejsMate = require("ejs-mate");
const fetch = require("node-fetch");
app.use(express.json());// for esp32 data receiving
require("dotenv").config();

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas Cluster");
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });


app.get("/", (req, res) => {
  res.redirect("/main");
});

// sample data insertion
// app.get("/add", async (req, res) => {
//   const sample = new dataModel({
//     timestamp: new Date(),
//     panel_id: "PANEL-1",
//     voltage: 12.3,
//     current: 1.2,
//     irradiance: 450,
//     panel_temp: 25,
//     ambient_temp: 22,
//     dust: 0.12,
//     pressure: 1012,
//     humidity: 55,
//     source: "test",
//   });

//   await sample.save();
//   res.send("Sample data added");
// });

app.get("/main", (req, res) => {
  res.render("routes/main");
});

app.get("/dashboard", async (req, res) => {
  // Fetch MongoDB data
  const allData = await dataModel.find({});

  // Weather API setup
  const CITY = "Mumbai"; // change city as needed
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Use your exact URL format
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

  // Fetch weather
  const response = await fetch(url);
  const weatherData = await response.json();

  // Prepare weather object
  const weather = response.ok
    ? {
        city: weatherData.name,
        city_lon:weatherData.coord.lon,
        city_lat:weatherData.coord.lat,
        visibility:weatherData.visibility,
        temp: weatherData.main.temp,
        sealvl: weatherData.main.sea_level,
        gndlvl: weatherData.main.grnd_level,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        wind: weatherData.wind.speed,
        condition: weatherData.weather[0].main,
      }
    : null;

  // Render EJS with MongoDB + weather data
  res.render("routes/dashboard", { allData, weather });
});


app.get("/api/solar", async (req, res) => {
    const data = await dataModel.find().sort({ timestamp: -1 });
    res.json(data);
});

app.get("/panel", (req, res) => {
  res.render("routes/panel");
});

// ESP32 DATA INGESTION API
app.post("/api/esp32/data", async (req, res) => {
  const sensorData = new espData(req.body);
  await sensorData.save();
  res.status(201).json({ message: "Data stored successfully" });
});






















