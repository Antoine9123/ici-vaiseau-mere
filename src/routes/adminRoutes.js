const express = require("express");
const Artist = require("../models/artist");
const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));

router.get("", (req, res) => {
  res.render("./admin/admin", { content: null });
});

// router.get("/artists-list", (req, res) => {
//   res.render("./admin/artists-list");
// });

router.get("/artists-add", (req, res) => {
  res.render("./admin/admin", { content: './partials/artists-add' });
});

router.post("/artists-add", (req, res) => {
  const artist = new Artist(req.body)

  artist.save()
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;
