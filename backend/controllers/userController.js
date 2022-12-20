const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Incomplete Credentials');
    }
    else if (password.length < 6) {
        res.status(400);
        throw new Error('Password should be 6 or more characters');
    }
    const user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error('User Already Exists')
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name, email, password: hashedPassword,
        })
        await newUser.save();
        res.status(200).json({
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id)
        });
    } catch (err) {
        res.status(400);
        throw new Error('User creation failed!')
    }
})

const loadUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        res.status(400);
        throw new Error('User load failed!')
    }
})

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Incomplete Credentials');
    }
    else if (password.length < 6) {
        res.status(400);
        throw new Error('Password should be 6 or more characters');
    }

    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                name: user.name,
                email: user.email,
                token: generateToken(user.id)
            });
        }
    } catch (err) {
        res.status(400);
        throw new Error("User doesn't exist!");
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, 'abracadabra', { expiresIn: '60d' })
}

module.exports = {
    registerUser,
    loadUser,
    loginUser
}