const router = require('express').Router()
const OrderController = require('../controllers/OderController')
const { requireAuth } = require('../middleware/authmiddleware')
const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');

router.get('/order', decorateHtmlResponse('Order'), requireAuth, OrderController.oderNow)
router.get('/order-purchase', decorateHtmlResponse('purchase'), requireAuth, OrderController.orderPurchase)

module.exports = router
