const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
    res.sendFile("admin.html", { root: "public" });
  });

router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

router.get("/agenda", (req, res) => {
  res.sendFile("agenda.html", { root: "public" });
});

router.get("/become-member", (req, res) => {
  res.sendFile("become_member.html", { root: "public" });
});
router.get("/contact", (req, res) => {
  res.sendFile("contact.html", { root: "public" });
});

router.get("/explore", (req, res) => {
  res.sendFile("explore.html", { root: "public" });
});

router.get("/koi-residency", (req, res) => {
  res.sendFile("koi_residency.html", { root: "public" });
});

router.get("/vaisseau-mere", (req, res) => {
  res.sendFile("vaisseau_mere.html", { root: "public" });
});

module.exports = router;
