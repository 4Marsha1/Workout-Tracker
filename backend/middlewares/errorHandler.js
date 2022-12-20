const errorHandler = (err, req, res, next) => {
    const statusCode = req.statusCode ? req.statusCode : 500;
    res.status(statusCode);
    res.json({
        msg: err.message,
        stack: process.env.NODE !== 'production' ? err.stack : null
    })
    next();
}

module.exports = errorHandler