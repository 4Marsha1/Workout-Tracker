const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(404);
            throw new Error('User Unauthorized')
        }
        const decoded = jwt.verify(token, 'abracadabra');
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            res.status(404);
            throw new Error('Invalid token')
        }
        next();
    } catch (err) {
        res.status(404);
        throw new Error('User Unauthorized, no token')
    }
})

module.exports = authMiddleware;