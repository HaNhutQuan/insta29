const router = require("express").Router();
const authController = require("../controllers/authController");


// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.login);

// Refresh token
router.post("/refresh_token", authController.generateAccessToken);

// logout
router.post("/logout",authController.logout);

module.exports = router;