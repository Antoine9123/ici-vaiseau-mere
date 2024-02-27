const express = require("express");
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

// TODO >>> Need to create authentification for that page.
router.get("/admin", (req, res) => {
  res.render('admin')
});

router.use((req, res) => {
  res.status(404).render('404')
})

module.exports = router;
