function decorateHtmlResponse(pageTitle) {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${pageTitle} - ${process.env.APP_NAME}`;
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    res.locals.stripePublicKey = {};
    res.locals.error = {};
    res.locals.value = {};
    res.locals.auth = false;
    res.locals.signupFail = false;
    next();
  };
}

module.exports = decorateHtmlResponse;
