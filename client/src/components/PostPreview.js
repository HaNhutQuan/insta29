import React from "react";
import { Link } from "react-router-dom";

import { HeartIcon, CommentIcon } from "./Icons";

const PostPreview = ({ posts }) => {
  return (
    <div className="post_preview">
      {posts.map((post) => (
        <Link key={post._id} className="container-overlay" to={`/post/${post._id}`}>
          <img src={post.images[0].url} alt={post.images[0].url} />
          <div className="overlay">
            <div className="overlay-content">
              <span>
                <HeartIcon /> {post.likes.length}
              </span>
              <span>
                <CommentIcon /> {post.comments.length}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostPreview;