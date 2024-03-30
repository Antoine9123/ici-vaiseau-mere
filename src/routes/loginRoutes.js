const express = require("express");
const authentificationController = require("../controllers/authentificationController");
const Auth = require("../models/auth");
const bcrypt = require("bcrypt");

const router = express.Router();
const expressSession = require("express-session");

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(
  expressSession({
    secret: "0e830c4450818fb5cf98ee26692d591c",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 1000, // Example: 1 hour in milliseconds
    },
  })
);

async function authUser(username, password) {
  try {
    const user = await Auth.findOne({ username: username });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

router.get("/", authentificationController.login_index);
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authUser(username, password);
    console.log("--------------------------------------------------------------");
    console.log(user);
    if (!user) {
      console.log("erreor to find a username");
      return res.redirect("/login?error=user-not-found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("erreor to find a password");
      return res.redirect("/login?error=invalid-password");
    }
    console.log("------------------------------------------------------------------");
    // Successful login
    req.session.userId = user.id;
    res.redirect("/admin");
  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/login?error=server-error");
  }
});

module.exports = router;
