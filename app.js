const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const sessionMiddleware = require('./src/middlewares/sessionMiddleware');
const authMiddleware = require('./src/middlewares/authMiddleware');

const homeRoute = require("./src/routes/mainRoutes");
const adminRoute = require("./src/routes/adminRoutes");
const authRoute = require("./src/routes/authRoutes");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// register view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(sessionMiddleware);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`)))
  .then(console.log("Connected to MongoDB"))

  .catch((err) => console.log(err));

app.use(express.static("public"));

app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/admin", authMiddleware.isAuthenticated, adminRoute);

app.use((req, res) => {
  res.status(404).render("main/404");
});
