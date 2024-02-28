const express = require("express");
const AdminController = require('../controllers/adminController')

const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));

// ----- MAIN ROUTE --------------------------------------------------------------->
router.get("/", AdminController.admin_index);

// ----- ARTIST ROUTES --------------------------------------------------------------->
router.get("/artists-list", AdminController.artist_list);
router.get("/artists-add", AdminController.artist_add_get);
router.post("/artists-add", AdminController.artist_add_post);

// ----- EVENT ROUTES --------------------------------------------------------------->
router.get("/events-list", AdminController.event_list);
router.get("/events-add", AdminController.event_add_get);
router.post("/events-add", AdminController.event_add_post);

// ----- PAGES ROUTES --------------------------------------------------------------->

router.get("/agenda-content", AdminController.agenda_get);
router.get("/member-content", AdminController.member_get);
router.get("/contact-content", AdminController.contact_get);
router.get("/explore-content", AdminController.explore_get);
router.get("/index-content", AdminController.index_get);
router.get("/koi-content", AdminController.koi_get);
router.get("/vaisseau-content", AdminController.vaisseau_get);


module.exports = router;
