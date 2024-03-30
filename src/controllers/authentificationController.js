const bcrypt = require("bcrypt")

const Auth = require("../models/auth");

async function authUser(user) {
  try {
    const user = await Auth.findOne({ username: user });
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

const login_index = (req, res) => {
    res.render("login");
  };

  const login_token = (req, res) => {
    res.render("login");
  };

module.exports = {
    login_index,
    login_token
  };