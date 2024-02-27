const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("./admin/admin", { file: null });
});

// router.get("/artists-list", (req, res) => {
//   res.render("./admin/artists-list");
// });

router.get("/artists-add", (req, res) => {
  res.render("./admin/admin", { file: './partials/artists-add' });
});

module.exports = router;
