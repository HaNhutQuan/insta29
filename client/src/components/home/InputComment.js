import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
const InputComment = ({children,post}) => {
      const [content,setContent] = useState('');
      const auth = useSelector((state) => state.auth);
      const dispatch = useDispatch();

      const handleSubmit = (e) => {
            e.preventDefault();
            if(!content.trim()) return;
            const newComment = {
                  content,
                  likes:[],
                  user: auth.user,
            
            }
            dispatch(createComment({post,newComment,auth}));
      }
      return (
            <form className="card-footer comment_input" onSubmit={handleSubmit}>
                  {children}
                  <input type="text" placeholder="Add your comment..." value={content} onChange={(e) => setContent(e.target.value)}/>
                  <button type="submit" className="postBtn">
                        Post
                  </button>
            </form>
      )
}
export default InputComment;