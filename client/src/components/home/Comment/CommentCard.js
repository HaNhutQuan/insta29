import React, { useEffect, useState }  from "react";

const CommentCard = ({ children, comment, post }) => {
      const [content, setContent] = useState(" ")
      useEffect(() => {
            setContent(comment.content)
      },[comment])
      return (
            <div className="comment_card">
                 <p>
                       <span className="font-weight-bold">
                              {comment.user.username}
                        </span>  {content}
                  </p>
                  {children}
            </div>
      )
}
export default CommentCard;