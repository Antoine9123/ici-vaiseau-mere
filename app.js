const express = require("express");
const mongoose = require("mongoose");
const homeRoute = require("./src/routes/mainRoutes");
const adminRoute = require("./src/routes/adminRoutes");
const loginRoute = require("./src/routes/loginRoutes");

const expressSession = require("express-session");

require("dotenv").config();

const app = express();
const PORT = 3001;

// register view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(
  expressSession({
    secret: "0e830c4450818fb5cf98ee26692d591c",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 1000,
    },
  })
);
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`)))
  .then(console.log("Connected to MongoDB"))

  .catch((err) => console.log(err));

app.use(express.static("public"));

app.use("/", homeRoute);

app.use("/login", loginRoute);

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/login");
};

app.use("/admin", isAuthenticated, adminRoute);

app.use((req, res) => {
  res.status(404).render("main/404");
});
