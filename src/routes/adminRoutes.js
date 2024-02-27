const express = require("express");
const Artist = require("../models/artist");

const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("./admin/admin", { content: './partials/home-admin' });
});

// ----- ARTIST ROUTES --------------------------------------------------------------->
router.get("/artists-list", (req, res) => {
  res.render("./admin/admin", { content: './partials/artists-list' });
});

router.get("/artists-add", (req, res) => {
  res.render("./admin/admin", { content: './partials/artists-add' });
});

router.post("/artists-add", (req, res) => {
  const artist = new Artist(req.body)

  artist.save()
    .then((result) => {
      res.redirect('/admin/artists-list')
    })
    .catch((err) => {
      console.log(err)
    })
})

// ----- EVENT ROUTES --------------------------------------------------------------->
router.get("/events-list", (req, res) => {
  res.render("./admin/admin", { content: './partials/events-list' });
});

router.get("/events-add", (req, res) => {
  res.render("./admin/admin", { content: './partials/events-add' });
});

// ------------------------------------------------------------------>

router.get("/agenda-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/agenda-content' });
});

router.get("/member-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/member-content' });
});

router.get("/contact-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/contact-content' });
});

router.get("/explore-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/explore-content' });
});

router.get("/index-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/index-content' });
});

router.get("/koi-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/koi-content' });
});

router.get("/vaisseau-content", (req, res) => {
  res.render("./admin/admin", { content: './partials/vaisseau-content' });
});



module.exports = router;
