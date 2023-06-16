import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Send from "../../../assets/send.svg"
import LikeButton from "../../LikeButon";
import { likePost, savePost, unLikePost, unSavePost } from "../../../redux/actions/postAction";

const Footer = ({post}) => {
      const [isLike, setIsLike] = useState(false);
      const auth = useSelector((state) => state.auth);
      const dispatch = useDispatch();
      const [saved, setSaved] = useState(false);


      useEffect(() => {
            if(auth.user.savePost.find(id => id === post._id)){
                setSaved(true)
            }else{
                setSaved(false)
            }
        },[auth.user.savePost, post._id]);
        const handleSavePost = async () => {
              await dispatch(savePost({post,auth}))
        }
        const handleUnSavePost = async () => {
              await dispatch(unSavePost({post,auth}));
        }

      useEffect(() => {
            if(post.likes.find(like => like._id === auth.user._id)){
                  setIsLike(true)
              }else{
                  setIsLike(false)
              }
      },[post.likes,auth.user._id])
      return (
            <div className="post_footer">
                                    <div className="icon-menu">
                                          <div>
                                               <LikeButton 
                                               isLike={isLike}
                                                handleLike={async() =>  {
                                                      setIsLike(true)
                                                      await dispatch(likePost({post,auth}));}}
                                                handleUnLike={async() =>  {
                                                      setIsLike(false)
                                                      await dispatch(unLikePost({post,auth}));}}
                                               />
                                                <Link to={`/post/${post._id}`} className="text-dark">
                                                      <i className="far fa-comment" />
                                                </Link>
                                                <img src={Send} alt="Send" />
                                          </div>
                                          {
                                                 saved 
                                                 ?  <i className="fas fa-bookmark text-primary"
                                                 onClick={handleUnSavePost} />
                             
                                                 :  <i className="far fa-bookmark"
                                                 onClick={handleSavePost} />
                                          }
                                    </div>
                                    <div className="justify-content-between d-flex">
                                                <h6 style={{ padding: '0 25px', curspr: 'pointer' }}>
                                                      {post.likes.length} likes
                                                </h6>

                                                <h6 style={{ padding: '0 25px', curspr: 'pointer' }}>
                                                      {post.comments.length} comments
                                                </h6>
                                    </div>
                                    <div  className="caption">
                                          <p><span className="font-weight-bold">{post.user.username}</span> {post.content}</p>
                                    </div>
                              </div>
      )
}

export default Footer;