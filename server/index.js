const express = require("express");
const connectDb = require("./src/db/dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/AuthRoutes.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use("/", authRoutes); // Mount the routes

const startServer = async () => {
  try {
    connectDb("mongodb://localhost:27017/sns_squares");
    app.listen(3001, () =>
      console.log(`Server running on port http://localhost:3001/`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
