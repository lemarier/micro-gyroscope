const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Gyroscope",
  mongoose.Schema({
    key: String,
    name: String,
    section: String,
    heartRate: String,
    heartRateUnits: String,
    weight: String,
    weightUnits: String,
    extractedData: Array
  })
);
