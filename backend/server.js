const express = require("express");
const app = express();
const cors = require("cors");
const home = require("./routes/home");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cluster = process.env.CLUSTER;

app.use(express.json());
app.use(cors({ origin: "*" })); //allow access from anywhere for now!

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hey docker!</h1>");
});

app.use("/home", home);

async function connectDB(req, res) {
  try {
    await mongoose.connect(cluster, { useNewUrlParser: true });
    console.log("Connected to Database! ");
  } catch (err) {
    console.error(err);
  }
}

app.listen(port, connectDB(), console.log(`Servers up on port ${port}`));
