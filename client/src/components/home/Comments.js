import React, { useEffect, useState } from "react";
import CommentDisplay from "./Comment/CommentDisplay";

const Comments = ({ post }) => {
      const [comments, setComments] = useState([])
      const [showComments, setShowComments] = useState([])
      const [next, setNext] = useState(2)

      const [replyComments, setReplyComments] = useState([])

      useEffect(() => {
            const newCm = post.comments.filter(cm => !cm.reply)
            setComments(newCm)
            setShowComments(newCm.slice(newCm.length - next))
      }, [post.comments, next])

      useEffect(() => {
            const newRep = post.comments.filter(cm => cm.reply)
            setReplyComments(newRep)
      }, [post.comments])
      return (
            <div className="comments">
                  {
                        showComments.map((comment, index) => (
                              <CommentDisplay key={index} comment={comment} post={post} />
                        ))
                  }
                  {
                        comments.length - next > 0
                              ? <div className="p-1"
                                    style={{ cursor: 'pointer', color: '#B2B2B2', padding: '0 25px' }}
                                    onClick={() => setNext(next + 10)}>
                                    See more comments...
                              </div>

                              : comments.length > 2 &&
                              <div className="p-1" 
                                    style={{ cursor: 'pointer', color: '#B2B2B2',padding: '0 25px' }}
                                    onClick={() => setNext(2)}>
                                    Hide comments...
                              </div>
                  }
            </div>
      )
}
export default Comments;