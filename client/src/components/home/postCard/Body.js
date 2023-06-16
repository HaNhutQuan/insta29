import React from "react";
import Carousel from "../../Carousel ";

const Body = ({ post }) => {
      return (
            <div className="post_body">
                  {
                        post.images.length > 0 && <Carousel images={post.images} id={post._id} />
                  }
            </div>
      )
}
export default Body;