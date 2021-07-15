const fs = require('fs')

const OrderController = {

  oderNow: async (req, res) => {
    fs.readFile('item.json', (error, data) => {
      if (error) {
        res.status(500).end()
      } else {
        res.render('order', {
          items: JSON.parse(data),
        })
      }
    })
  },
}
module.exports = OrderController
