const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");
const postController = require("../controllers/postController");

// Create post
router.route("/post").post(middlewareController.verifyToken, postController.createPost);
      
// Get all post
router.route("/post").get(middlewareController.verifyToken, postController.getPosts);

// Get post 
router.get("/post/:id", middlewareController.verifyToken, postController.getPost);

// Update post
router.patch("/post/:id", middlewareController.verifyToken, postController.updatePost);

// Delete post
router.delete("/post/:id", middlewareController.verifyToken, postController.deletePost);

// Update like post
router.patch("/post/:id/like", middlewareController.verifyToken, postController.likePost);

// Update unlike post
router.patch("/post/:id/unlike", middlewareController.verifyToken, postController.unLikePost);

// Get post discover
router.get("/post_discover", middlewareController.verifyToken, postController.getPostsDicover);

// Get all post from a user
router.get("/user_posts/:id", middlewareController.verifyToken, postController.getUserPosts);

router.get("/getSavePosts", middlewareController.verifyToken, postController.getSavePosts);

router.patch("/savePost/:id", middlewareController.verifyToken, postController.savePost);

router.patch("/unSavePost/:id", middlewareController.verifyToken, postController.unSavePost);

module.exports = router;