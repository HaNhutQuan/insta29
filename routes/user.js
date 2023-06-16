const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");



// Search user
router.get("/search", middlewareController.verifyToken, userController.searchUser);

// Get user
router.get("/user/:id", middlewareController.verifyToken, userController.getUser);

// Update user
router.patch('/user/:id/follow', middlewareController.verifyToken, userController.follow);
router.patch('/user/:id/unfollow', middlewareController.verifyToken, userController.unfollow);
router.patch('/user', middlewareController.verifyToken, userController.updateUser);
// Suggestion user
router.get('/suggestionsUser', middlewareController.verifyToken, userController.suggestionsUser);


module.exports = router;