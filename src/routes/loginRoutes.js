const express = require("express");
const authentificationController = require("../controllers/authentificationController");


const router = express.Router();

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get("/", authentificationController.login_index);
router.post("/", authentificationController.login_index )


module.exports = router;
