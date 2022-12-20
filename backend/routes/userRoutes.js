const express = require("express");
const { loadUser, registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.route('/').get(authMiddleware, loadUser).post(registerUser)
router.route('/login').post(loginUser)

module.exports = router