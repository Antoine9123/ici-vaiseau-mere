const express = require("express");
const MainController = require('../controllers/mainController')
const router = express.Router();

const Event = require("../models/event");
const Residency = require("../models/residency");

router.get("/", (req, res) => {
  res.render('index');
});

router.get("/agenda", (req, res) => {
  Event.find()
    .then((result) => {
      res.render("agenda", { events: result });
    })
    .catch((err) => console.log(err));
});

router.get("/become-a-member", (req, res) => {
  // res.render('become_member')
  res.render('underconstruction')
});

router.get("/residencies", (req, res) => {
  Residency.find()
    .then((result) =>{
      res.render("residencies_list", {residencies: result})
    })
    .catch((err) => console.log(err))
  
});

router.get("/what-we-do", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});

router.get("/team", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});

router.get("/contact", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});

router.get("/koi-residency", (req, res) => {
  // res.render('koi_residency')chibidi
  res.render('underconstruction')
});

router.get("/history", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});

router.get("/what-we-offer", (req, res) => {
  // res.render('vaisseau_mere')
  res.render('underconstruction')
});

router.get("/space-rental", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});


router.get("/residencies/:id", MainController.residency_index);
router.get("/agenda/:id", MainController.event_index);


module.exports = router;
