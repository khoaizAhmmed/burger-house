function decorateHtmlResponse(pageTitle) {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    res.locals.stripePublicKey = {};
    next();
  };
}

module.exports = decorateHtmlResponse;
