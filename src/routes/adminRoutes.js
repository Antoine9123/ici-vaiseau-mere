const express = require("express");
const AdminController = require("../controllers/adminController");
const ProjectController = require("../controllers/projectController");
const EventController = require("../controllers/eventController");
const Multer = require("../controllers/multerController");

const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// ----- MAIN ROUTE --------------------------------------------------------------->
router.get("/", AdminController.admin_index);

// ----- PROJECT ROUTES --------------------------------------------------------------->
router.get("/projects-list", ProjectController.project_list);
router.get("/projects-add", ProjectController.project_add_get);
router.post("/projects-add", Multer.projectUpload.array("image", 6), ProjectController.project_add_post);

router.get("/projects-mod", ProjectController.project_mod_get);

// ----- EVENT ROUTES --------------------------------------------------------------->
router.get("/events-list", EventController.event_list);
router.get("/events-add", EventController.event_add_get);
router.post("/events-add", Multer.eventUpload.single("image", 1),EventController.event_add_post);

// ----- PAGES ROUTES --------------------------------------------------------------->

router.get("/agenda-content", AdminController.agenda_get);
router.get("/member-content", AdminController.member_get);
router.get("/contact-content", AdminController.contact_get);
router.get("/explore-content", AdminController.explore_get);
router.get("/index-content", AdminController.index_get);
router.get("/koi-content", AdminController.koi_get);
router.get("/vaisseau-content", AdminController.vaisseau_get);

router.get("/safe-content", AdminController.safe_get);
router.post("/safe-content", AdminController.safe_update);

module.exports = router;
