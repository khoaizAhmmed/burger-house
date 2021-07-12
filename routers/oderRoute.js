const router = require('express').Router()
const OrderController = require('../controllers/OderController')
const { requireAuth } = require('../middleware/authmiddleware')
const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');

router.get('/order', decorateHtmlResponse('Order'), requireAuth, OrderController.oderNow)

module.exports = router
