const Post = require("../models/Post");
const Comment = require("../models/Comment");

const commentController = {
      addComment: async (req, res) => {
            try {
                  const { postId, content, tag, reply, postUserId } = req.body

                  const post = await Post.findById(postId)
                  if (!post) return res.status(400).json({ msg: "This post does not exist." })

                  if (reply) {
                        const cm = await Comment.findById(reply)
                        if (!cm) return res.status(400).json({ msg: "This comment does not exist." })
                  }

                  const newComment = new Comment({
                        user: req.user._id, content, tag, reply, postUserId, postId
                  })

                  await Post.findOneAndUpdate({ _id: postId }, {
                        $push: { comments: newComment._id }
                  }, { new: true })

                  await newComment.save()

                  res.json({ newComment })



            } catch (error) {
                  return res.status(500).json({ message: error.message });
            }
      },
      updateComment: async (req, res) => {
            try {
                  const { content } = res.body;

                  await Comment.findByIdAndUpdate({
                        _id: req.params.id, user: req.user._id
                  }, { content }, { new: true });

                  res.status(200).json({ message: "Update success!!!" });
            } catch (error) {
                  return res.status(500).json({ message: error.message });
            }


      },
      likeComment: async (req, res) => {
            try {
                  const comment = await Comment.find({ _id: res.params.id, likes: res.user._id });
                  // Does it check if the user has liked the comment or not?
                  if (comment.length > 0) return res.status(400).json({ message: "You liked this comment" });


                  await Comment.findOneAndUpdate({ _id: res.params.id }, {
                        $pull: { likes: res.user._id }
                  }, { new: true });
                  res.status(200).json({ message: "Liked comment" });
            } catch (error) {
                  return res.status(500).json({ message: error.message });
            }
      },
      unLikeComment: async (req, res) => {
            try {
                  const like = await Comment.findOneAndUpdate({ _id: res.params.id }, {
                        $push: { likes: res.user._id }
                  }, { new: true });
                  if (!like) return res.status(400).json({ message: "This comment does not exist." });
                  res.status(200).json({ message: "Unliked comment" });
            } catch (error) {
                  return res.status(500).json({ message: error.message });
            }
      },
      deleteComment: async (req, res) => {
            try {
                  const comment = await Comment.findByIdAndDelete({ _id: res.params.id, user: req.user._id });

                  await Post.findOneAndUpdate({ _id: comment.postId },
                        { $pull: { comments: req.params.id } }, { new: true });

                  res.status(200).json({ message: "Deleted comment!" });
            } catch (error) {
                  return res.status(500).json({ message: error.message });
            }
      }

};

module.exports = commentController;