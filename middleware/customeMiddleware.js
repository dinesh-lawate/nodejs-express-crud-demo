function log(req, res, next) {
    console.log("Custom Middleware..");
    next();
}

module.exports = log;