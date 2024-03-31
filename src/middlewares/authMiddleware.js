const bcrypt = require("bcrypt");

const User = require("../models/users");

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/auth/login");
};

const getAuthenticated = async (username, password) => {
  try {
    const user = await User.findOne({ username: username });
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
};



module.exports = {
  isAuthenticated,
  getAuthenticated
};
