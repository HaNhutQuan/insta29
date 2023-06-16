const router = require("express").Router();
const commentController = require("../controllers/CommentController");
const middlewareController = require("../controllers/middlewareController");

// Create a comment
router.post("/comment", middlewareController.verifyToken, commentController.addComment);

// Update a comment
router.patch("/comment/:id", middlewareController.verifyToken, commentController.updateComment);

// Unlike
router.patch("/comment/:id/unlike", middlewareController.verifyToken, commentController.unLikeComment);

// Like
router.patch("/comment/:id/like", middlewareController.verifyToken, commentController.likeComment);

// Delete a comment
router.delete("/comment/:id", middlewareController.verifyToken, commentController.deleteComment);



module.exports = router;