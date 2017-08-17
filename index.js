const ms = require("ms");
const mongoose = require("mongoose");
const Gyroscope = require("./models/gyroscope");
const crypto = require("crypto");

let data = [];

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  return data;
};

// Cache data now and every X ms
cacheData();
setInterval(cacheData, ms("15m"));

function cacheData() {
  const start = Date.now();

  // config from env vars
  const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    KEY: crypto
      .createHash("md5")
      .update(process.env.GYROSCOPE_USERNAME)
      .digest("hex")
  };

  // initialize the connection to DB
  mongoose.connect(config.DATABASE_URL, {
    useMongoClient: true
  });

  const db = mongoose.connection;
  Gyroscope.findOne({ key: config.KEY }, function(err, data_) {
    // now agregate the whole database to get total steps
    Gyroscope.aggregate(
      [
        {
          $unwind: "$extractedData"
        },
        {
          $group: {
            _id: "total",
            total: {
              $sum: "$extractedData.steps.total"
            }
          }
        }
      ],
      function(err, total_) {
        if (err) {
          log(err);
          db.close();
        } else {
          // Cache our data
          data = {
            steps: total_[0].total,
            weight: data_.weight,
            weightUnits: data_.weightUnits,
            heartRate: data_.heartRate,
            heartRateUnits: data_.heartRateUnits
          };
          db.close();
        }
      }
    );
  });
}
