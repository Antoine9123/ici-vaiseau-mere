const express = require("express");

const authController = require("../controllers/auth/authController");
const sessionMiddleware = require('../middlewares/sessionMiddleware');


const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(sessionMiddleware)

router.get("/logout", authController.get_logout)
router.get("/login", authController.login_index);

// -----> Uncomment the one you want
router.post("/login", authController.get_login);
// router.post("/login", authController.new_user);


module.exports = router;
