const express = require("express");
const MainController = require('../controllers/mainController')
const router = express.Router();

const Event = require("../models/event");
const Project = require("../models/project");

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

router.get("/projects", (req, res) => {
  // res.render('become_member')
  res.render('underconstruction')
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


router.get("/projects/:id", MainController.project_index);
router.get("/events/:id", MainController.event_index);


module.exports = router;
