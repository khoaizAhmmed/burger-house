/* eslint-disable no-console */
/* eslint-disable consistent-return */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const Users = require('../models/Users')

const maxAge = 60 * 60 * 1000;
const UserController = {
  getSignup: async (req, res) => {
    res.render('signup', { error: {}, value: {} })
  },
  userSignup: async (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req).formatWith((error) => error.msg)
    if (!errors.isEmpty()) {
      return res.render('signup', { error: errors.mapped(), value: { name, email, password } })
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10)
      await Users.signup(email, name, hashPassword)
    } catch (err) {
      console.log(err)
    }
  },
  getLogin: async (req, res) => {
    res.render('login')
  },

  userLogin: async (req, res) => {
    try {
      console.log(req.body)
      const userMail = req.body.email
      const user = await Users.login(userMail)
      const userPassword = user[0].user_password
      const userName = user[0].user_name
      if (user) {
        const isValidPassword = await bcrypt.compare(req.body.password, userPassword)
        if (isValidPassword) {
          const token = jwt.sign({
            userName,
            userMail,
          }, process.env.JWT_SECRET, { expiresIn: '1h' })
          res.cookie('jwt', token, { maxAge });

          res.redirect('/')
        } else {
          res.redirect('/login')
        }
      } else {
        res.redirect('/login')
      }
    } catch (err) {
      res.render('login', {
        data: {
          email: req.body.email,
        },
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  userLogout: (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  },

}

module.exports = UserController
