const router = require('express').Router()
const UserController = require('../controllers/UserController')
const { checkLogin } = require('../middleware/authmiddleware')
const { signupValidator } = require('../middleware/validator/validator')

const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');

router.get('/signup', decorateHtmlResponse('Signup'), checkLogin, UserController.getSignup)
router.post('/signup', decorateHtmlResponse('Signup'), signupValidator, UserController.userSignup)
router.get('/login', decorateHtmlResponse('Login'), checkLogin, UserController.getLogin)
router.post('/login', UserController.userLogin)
router.get('/logout', UserController.userLogout)

module.exports = router
