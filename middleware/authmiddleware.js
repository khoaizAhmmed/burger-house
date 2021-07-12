const jwt = require('jsonwebtoken');
const User = require('../models/Users')
require('dotenv').config()

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.login(decodedToken.userMail);
        res.locals.user = user
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
const checkLogin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    res.redirect('/')
  }
  next()
}

module.exports = { requireAuth, checkUser, checkLogin }
