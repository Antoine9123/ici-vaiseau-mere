const express = require("express");
const AdminController = require("../controllers/admin/adminController");
const ResidencyController = require("../controllers/admin/residencyController");
const EventController = require("../controllers/admin/eventController");
const Multer = require("../controllers/admin/multerController");

const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    res.redirect("/login");
  };

// ----- MAIN ROUTE --------------------------------------------------------------->
router.get("/", AdminController.admin_index);

// ----- PROJECT ROUTES --------------------------------------------------------------->
router.get("/residencies-list", ResidencyController.residency_list);

router.get("/residencies-add", ResidencyController.residency_add_get);
router.post("/residencies-add", Multer.residencyUpload.array("image", 6), ResidencyController.residency_add_post);

router.post('/residency-delete/:id', ResidencyController.residency_delete_post);

router.get("/residencies-update/:id", ResidencyController.residency_update_get);

// ----- EVENT ROUTES --------------------------------------------------------------->
router.get("/events-list", EventController.event_list);
router.get("/events-add", EventController.event_add_get);
router.post("/events-add", Multer.eventUpload.single("image", 1),EventController.event_add_post);
router.post('/event-delete/:id', EventController.event_delete_post);


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
