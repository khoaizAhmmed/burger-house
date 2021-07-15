const fs = require('fs')

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(stripeSecretKey)
const OrderController = {

  oderNow: async (req, res) => {
    fs.readFile('item.json', (error, data) => {
      if (error) {
        res.status(500).end()
      } else {
        res.render('order', {
          stripePublicKey,
          items: JSON.parse(data),
        })
      }
    })
  },
  orderPurchase: (req, res) => {

  },
}
module.exports = OrderController
