const express = require("express");
const mongoose = require("mongoose");
const homeRoute = require("./src/routes/mainRoutes");
const adminRoute = require("./src/routes/adminRoutes");

const app = express();
const PORT = 3001;

// register view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//connect to database Mongo
dbURI = "mongodb+srv://admin:123@cluster0.uni1dnd.mongodb.net/koi_website?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT, () => console.log(`Running Express Server on ${PORT}`)))
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use(express.static("public"));



app.use("/", homeRoute);

// Add some security authentification here
app.use("/admin", adminRoute);

app.use((req, res) => {
  res.status(404).render('404')
})


