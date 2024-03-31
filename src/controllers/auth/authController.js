const bcrypt = require("bcrypt");

const User = require("../../models/users");
const authMiddleware = require("../../middlewares/authMiddleware");

// ------ CONTROLLERS ------------------------------------------------->

const login_index = (req, res) => {
  res.render("auth/login");
};

const get_login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authMiddleware.getAuthenticated(username, password);

    if (!user) {
      return res.redirect("/login?error=user-not-found");
    }

    req.session.userId = user.id;
    res.redirect("/admin");

  } catch (error) {
    console.error("Error during login:", error);
    res.redirect("/login?error=server-error");
  }
};

const get_logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Server error');
    } else {
      res.render("auth/logout");
    }
  });
};

const new_user = async (req, res) => {
  const { username, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const auth = new User({
      username,
      password: hashedPassword,
    });

    const createdUser = await auth.save();
    req.session.userId = createdUser.id;
    res.redirect("/admin");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
};

module.exports = {
  login_index,
  get_login,
  get_logout,
  new_user,
};
