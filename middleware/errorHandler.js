const createErrors = require('http-errors')

// 404 not found
function notFoundHandler(req, res, next) {
  next(createErrors(404, 'Your Requested Content Was Not Found!'))
}
// default error handler
function errorHandler(err, req, res, next) {
  res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message }
  res.status(err.status || 500)
  if (!res.locals.html) {
    // html response
    res.render('error', { title: 'Error Page' })
  } else {
    res.json(res.locals.error)
  }
}

module.exports = { notFoundHandler, errorHandler }
