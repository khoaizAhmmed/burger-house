const { check } = require('express-validator')

const signupValidator = [
  check('name').isLength({ min: 1 }).withMessage('Name is required'),
  check('email')
    .isLength({
      min: 1,
    })
    .withMessage('email is required'),

  check('password').isLength({ min: 1 }).withMessage('Password is required'),
];
const loginValidator = [
  check('email')
    .isLength({
      min: 1,
    })
    .withMessage('email is required'),

  check('password').isLength({ min: 1 }).withMessage('Password is required'),
];

module.exports = { signupValidator, loginValidator }
