import React from "react";
import Header from "./home/postCard/Header";
import Body from "./home/postCard/Body";
import Footer from "./home/postCard/Footer";

import Comments from "./home/Comments";
import InputComment from "./home/InputComment";




const PostCard = ({post}) => {
      return (
          
          <div className="card"> 
              <Header post={post} />
              <Body post={post}  />
              <Footer post={post} />
              <Comments post={post} />
              <InputComment post={post} />
          </div>
      )
  }
  
  export default PostCard