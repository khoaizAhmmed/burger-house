const express = require('express')

const app = express()
const env = require('dotenv')
const cookieParser = require('cookie-parser');

// External imports
const { checkUser } = require('./middleware/authmiddleware')

const routers = require('./routers/routers')
// .env
env.config()

// Public Directory
app.use(express.static(`${__dirname}/public`))

// Cookie
app.use(cookieParser());
// Ejs
app.set('view engine', 'ejs')
// ejs layouts

// URL encoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(checkUser)
// Router
app.use(routers)
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server Running')
})
