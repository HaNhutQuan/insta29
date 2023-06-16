const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
class APIfeatures {
      constructor(query, queryString){
          this.query = query;
          this.queryString = queryString;
      }
  
      paginating(){
          const page = this.queryString.page * 1 || 1
          const limit = this.queryString.limit * 1 || 9
          const skip = (page - 1) * limit
          this.query = this.query.skip(skip).limit(limit)
          return this;
      }
  }
const postController = {
      createPost: async (req, res) => {
            try {
                const { content, images } = req.body
    
                if(images.length === 0)
                return res.status(400).json({message: "Please add your photo."})
    
                const newPost = await new Post({
                    content, images, user: req.user._id
                })

                // Save post to database
                await newPost.save();
    
                res.status(200).json({
                    message: 'Created Post!',
                    newPost: {
                        ...newPost._doc,
                        user: req.user
                    }
                });
            } catch (err) {
                return res.status(500).json(err);
            }
        },
        getPosts: async (req, res) => {
            try {
                const features =  new APIfeatures(Post.find({
                    user: [...req.user.following, req.user._id]
                }), req.query).paginating();
    
                const posts = await features.query.sort('-createdAt')
                .populate("user likes", "avatar username fullname followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });
    
                res.status(200).json({
                    message: 'Success!',
                    result: posts.length,
                    posts
                });
    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },
      updatePost: async (req, res) => {
            try {
                const { content, images } = req.body
    
                const post = await Post.findOneAndUpdate({_id: req.params.id}, {
                    content, images
                }).populate("user likes", "avatar username fullname")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                });
    
                res.status(200).json({
                    message: "Updated Post!",
                    newPost: {
                        ...post._doc,
                        content, images
                    }
                });
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },
      likePost: async (req, res) => {
            try {
                const post = await Post.find({_id: req.params.id, likes: req.user._id});
                
                // Does it check if the user has liked the post or not?
                if(post.length > 0) return res.status(400).json({message: "You liked this post."});
    
                const like = await Post.findOneAndUpdate({_id: req.params.id}, {
                    $push: {likes: req.user._id}
                }, {new: true});
    
                if(!like) return res.status(400).json({message: 'This post does not exist.'});
    
                res.status(200).json({message: 'Liked Post!'});
    
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
        },
      unLikePost: async (req, res) => {
            try {
    
                const like = await Post.findOneAndUpdate({_id: req.params.id}, {
                    $pull: {likes: req.user._id}
                }, {new: true});
    
                if(!like) return res.status(400).json({message: 'This post does not exist.'});
    
                res.status(200).json({msg: 'UnLiked Post!'});
    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },
      getUserPosts: async (req, res) => {
            try {
                const features = new APIfeatures(Post.find({user: req.params.id}), req.query)
                .paginating()
                const posts = await features.query.sort("-createdAt")
    
                res.status(200).json({
                    posts,
                    result: posts.length
                })
    
            } catch (err) {
                return res.status(500).json({message: err.message})
            }
        },
      getPost: async (req, res) => {
            try {
                const post = await Post.findById(req.params.id)
                .populate("user likes", "avatar username fullname followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })
    
                if(!post) return res.status(400).json({message: 'This post does not exist.'});
    
                res.status(200).json({post});
    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
        },
      getPostsDicover: async (req, res) => {
            try {
    
                const newArr = [...req.user.following, req.user._id]
    
                const num  = req.query.num || 9
    
                const posts = await Post.aggregate([
                    { $match: { user : { $nin: newArr } } },
                    { $sample: { size: Number(num) } },
                ]);
    
                return res.status(200).json({
                    msg: 'Success!',
                    result: posts.length,
                    posts
                });
    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
      },
      deletePost: async (req, res) => {
            try {
                const post = await Post.findOneAndDelete({_id: req.params.id, user: req.user._id})
                await Comment.deleteMany({_id: {$in: post.comments }})
    
                res.status(200).json({
                    msg: 'Deleted Post!',
                    newPost: {
                        ...post,
                        user: req.user
                    }
                });
    
            } catch (err) {
                return res.status(500).json({message: err.message});
            }
      },
      savePost: async (req, res) => {
          try {
              const user = await User.find({_id: req.user._id, savePost: req.params.id});

              if(user.length > 0) return res.status(400).json({message: "You saved this post!!"});

              const save = await User.findOneAndUpdate({_id: req.user._id}, {
                  $push: {savePost: req.params.id}
              }, {new: true});


              res.status(200).json({message: "Save post!"});
          } catch (error) {
              return res.status(500).json(error);
          }
      },
      unSavePost: async (req, res) => {
          try {
              const save = await User.findOneAndUpdate({_id: req.user._id},{
                  $pull: {savePost: req.params.id}
              },{new:true});

              if(!save) return res.status(400).json({message: "this user doesn't exist"});
              res.status(200).json("Unsave post");
          } catch (error) {
              return res.status(500).json({message: error.message});
          }
      },
      getSavePosts: async (req, res) => {
          try {
              
              const features = new APIfeatures(Post.find({
                  _id: {$in: req.user.savePost}
              }), req.query).paginating();
              
              const savePosts = await features.query.sort("-createdAt");
              
              res.status(200).json({
                  savePosts,
                  result: savePosts.length
              })
          } catch (error) {
              return res.status(500).json({message: error.message});
          }
      }


};

module.exports = postController;