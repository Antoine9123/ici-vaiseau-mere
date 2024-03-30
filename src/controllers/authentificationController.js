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

// async function createNewUser(username, password) {
//   try {
//     const saltRounds = 10; 
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const auth = new Auth({
//       username,
//       password: hashedPassword 
//     });

//     const createdUser = await auth.save();
//     return createdUser;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error; // Re-throw to be handled appropriately
//   }
// }



const login_index = (req, res) => {
    res.render("login");
  };

  // const login_token = async (req, res) => {
  //   try {
  //     const createdUser = await createNewUser(req.body.username, req.body.password);
  //     // Handle successful registration (e.g., redirect, set session)
  //    } catch (error) {
  //       // Handle registration errors (display messages, etc.)
  //    }
  // }

// const login_token = (req, res) => {
//     res.render("login");
//   };

// const expressSession = require('express-session');

// // ... your user database logic (findUserByEmail, etc.)


// app.use(expressSession({ secret: 'your-secure-secret', resave: false, saveUninitialized: true }));
// app.use(express.urlencoded({ extended: true })); // For form data

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await findUserByEmail(email);
//     if (!user) {
//       return res.redirect('/login?error=user-not-found');
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.redirect('/login?error=invalid-password');
//     }

//     // Successful login
//     req.session.userId = user.id; 
//     res.redirect('/admin');

//   } catch(error) {
//     console.error("Error during login:", error);
//     res.redirect('/login?error=server-error'); 
//   }
// });

// // Authentication middleware
// function isAuthenticated(req, res, next) {
//   if (req.session.userId) {
//     return next();
//   }
//   res.redirect('/login');
// }

// // Protected admin route
// app.get('/admin', isAuthenticated, (req, res) => {
//   res.send('Admin content'); 
// });


module.exports = {
    login_index,

  };