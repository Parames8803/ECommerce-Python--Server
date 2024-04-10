const express = require("express");
const connectDb = require("./src/db/dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./src/routes/AuthRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
app.use("/", authRoutes); // Mount the routes
app.use("/user", userRoutes);

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_DB_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port http://localhost:3001/`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
