const express = require("express");
const AdminController = require("../controllers/adminController");
const Multer = require("../controllers/multerController");

const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// ----- MAIN ROUTE --------------------------------------------------------------->
router.get("/", AdminController.admin_index);

// ----- PROJECT ROUTES --------------------------------------------------------------->
router.get("/projects-list", AdminController.project_list);
router.get("/projects-add", AdminController.project_add_get);
router.post("/projects-add", Multer.projectUpload.array("image", 6), AdminController.project_add_post);

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
