const express = require("express");
const app = express();
const cors = require("cors");
const home = require("./routes/home");
const login = require("./routes/login");
const register = require("./routes/register");
const addQuestion = require("./routes/addQuestion");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const session = require("express-session");
const { join } = require("path");
const morgan = require("morgan");
const gemini = require("./routes/gemini")

function testingLog(req,res,next){ //remove in a while
  if(req.session.user){ //user is logged in
    console.log(`Session Exists! ${req?.session?.user}`)
  
  }else{ 
    console.log("User Not Logged in!") //session is not being created properly!
  
  }
  next();
}

app.use(express.json());
app.use(cors({ origin: "*" })); //allow access from anywhere for now!

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hey docker!</h1>");
});

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "somerandomasskey123",
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true,httpOnly:true },
  })
);
app.use(morgan("dev"));
app.use(testingLog);
app.use("/home", home);
app.use("/login", login);
app.use("/register", register);
app.use("/gemini",gemini)


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
