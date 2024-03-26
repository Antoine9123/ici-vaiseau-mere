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
  res.render('become_member')
});
router.get("/contact", (req, res) => {
  res.render('contact')
});

router.get("/explore", (req, res) => {
  res.render('explore')
});

router.get("/koi-residency", (req, res) => {
  res.render('koi_residency')
});

router.get("/vaisseau-mere", (req, res) => {
  res.render('vaisseau_mere')
});

router.get("/wip", (req, res) => {
  res.render('wip')
});

router.get("/artist/:id", MainController.artist_index);


module.exports = router;
