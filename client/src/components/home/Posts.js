import React from "react";
import {  useSelector} from "react-redux";
import PostCard from "../PostCard";

const Posts = () => {
      const post = useSelector((state) => state.post);
      return (
            <div className="posts">
                  {post.posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                  ))}
            </div>
      );
};

export default Posts;
