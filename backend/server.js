const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const session = require("express-session");
const helmet = require("helmet");
const { join } = require("path");
const learningMaterial = require("./routes/learn");
const morgan = require("morgan");


app.use(cors({ origin: "*" }));  //allow access from anywhere for now!
app.use(morgan("combined"));
app.use(express.urlencoded());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hey docker! 🐳</h1>");
});

app.set("trust proxy", 1); // trust first proxy
app.use(
  //adding sessions to test!
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);


app.use("/resources",learningMaterial);


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
