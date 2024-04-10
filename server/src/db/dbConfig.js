const mongoose = require("mongoose");

const connectDb = async (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((e) => console.log(e));
};

module.exports = connectDb;
