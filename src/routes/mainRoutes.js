const express = require("express");
const MainController = require('../controllers/mainController')
const router = express.Router();

router.get("/", (req, res) => {
  res.render('index');
});

router.get("/agenda", (req, res) => {
  res.render('agenda')
});

router.get("/become-member", (req, res) => {
  // res.render('become_member')
  res.render('underconstruction')
});
router.get("/contact", (req, res) => {
  // res.render('contact')
  res.render('underconstruction')
});

router.get("/explore", (req, res) => {
  // res.render('explore')
  res.render('underconstruction')
});

router.get("/koi-residency", (req, res) => {
  // res.render('koi_residency')
  res.render('underconstruction')
});

router.get("/vaisseau-mere", (req, res) => {
  // res.render('vaisseau_mere')
  res.render('underconstruction')
});

router.get("/wip", (req, res) => {
  res.render('wip')
});

router.get("/artist/:id", MainController.artist_index);


module.exports = router;
