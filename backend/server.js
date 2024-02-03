const express = require("express");
const app = express();
const cors = require("cors");
const home = require("./routes/home");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const { join } = require("path");

app.use(express.json());
app.use(cors({ origin: "*" })); //allow access from anywhere for now!

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hey docker!</h1>");
});

app.use("/home", home);

app.use("*", (req, res) => {
  //leave this below all the other routes cuz this is the LAST RESORT JUST INCASE THE requested url is neither of the existing routes
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Alert: "404 Error" });
  } else {
    res.send("404 Error 😔");
  }
});

async function connectDB(req, res) {
  try {
    await mongoose.connect(cluster, { useNewUrlParser: true });
    console.log("Connected to Database! ");
  } catch (err) {
    console.error(err);
  }
}

app.listen(port, connectDB(), console.log(`Servers up on port ${port}`));
