const express = require("express");
const mongoose = require("mongoose");
const homeRoute = require("./src/routes/mainRoutes");

const app = express();
const PORT = 3001;

// register view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//connect to database Mongo
dbURI = "mongodb+srv://admin:123@cluster0.uni1dnd.mongodb.net/koi_website?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`));

app.use("/", homeRoute);
