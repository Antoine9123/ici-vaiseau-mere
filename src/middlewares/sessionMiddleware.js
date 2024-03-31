const session = require('express-session');

const sessionMiddleware = session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
  })

module.exports = sessionMiddleware;
