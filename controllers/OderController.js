/* eslint-disable eqeqeq */
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
    fs.readFile('item.json', (error, data) => {
      if (error) {
        res.status(500).end()
      } else {
        const itemsJson = JSON.parse(data)
        const itemsArray = itemsJson.burger
        let total = 0
        req.body.items.forEach((item) => {
          const itemJson = itemsArray.find((i) => i.id == item.id)
          total += itemJson.price * item.quantity * 100
        })
        stripe.charges.create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: 'usd',
        }).then(() => {
          res.json({ message: 'Successfully purchased items' })
        }).catch(() => {
          res.json({ message: 'Charges Fail' })
          res.status(500).end()
        })
      }
    })
  },
}
module.exports = OrderController
