const express = require("express");
const mongoose = require("mongoose");
const homeRoute = require("./src/routes/mainRoutes");
const adminRoute = require("./src/routes/adminRoutes");
const loginRoute = require("./src/routes/loginRoutes");


require('dotenv').config();

const app = express();
const PORT = 3001;

// register view engine
app.set("view engine", "ejs");
app.set("views", "src/views");


mongoose
  .connect(process.env.DB_CONNECT)
  .then((result) => app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`)))
  .then(console.log('Connected to MongoDB'))

  .catch((err) => console.log(err));




app.use(express.static("public"));


app.use("/", homeRoute);

app.use("/login",loginRoute);

// Add some security authentification here
app.use("/admin", adminRoute);

app.use((req, res) => {
  res.status(404).render('main/404')
})   