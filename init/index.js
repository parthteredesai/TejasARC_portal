const mongoose = require("mongoose");
const initData = require("./data1.js");
const dataModel = require("../models/dataModel.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/testdata1";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await dataModel.deleteMany({});
  await dataModel.insertMany(initData.data);
  console.log("Data Initialized");
};

initDB();
