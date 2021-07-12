const router = require('express').Router()
const userRoute = require('./userRoute')
const orderRoute = require('./oderRoute')
const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');

router.get('/', decorateHtmlResponse('Home'), (req, res) => {
  res.render('home')
})
router.use(userRoute, orderRoute)
module.exports = router
