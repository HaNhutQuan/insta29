import React from "react";
import { Link, Navigate } from "react-router-dom";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../redux/actions/postAction";


const Header = ({ post }) => {
      const auth = useSelector((state) => state.auth);
      const dispatch = useDispatch();
      
      return (
            <div className="post_header">
                  <div className="d-flex">
                        <img
                              src={post.user.avatar}
                              alt="avatar"
                              style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                              }}
                        />
                        <div className="name">
                              <h6 className="mx-2">
                                    <Link to={`/profile/${post.user._id}`} className="text-dark">
                                          {post.user.username}
                                    </Link>
                              </h6>
                              <small className="text-muted mx-2">
                                    {moment(post.createdAt).fromNow()}
                              </small>
                        </div>

                  </div>
                  <div className="nav-item dropdown">
                        <span className="material-icons" id="moreLink" data-toggle="dropdown">
                              more_horiz
                        </span>
                        {auth.user._id === post.user._id &&
                              <>
                                    <div className="dropdown-menu bg-danger">
                                          {
                                                <div className="dropdown-item bg-danger text-white" onClick={() => {
                                                      dispatch(deletePost({ post, auth }))
                                                      return <Navigate to="/" />

                                                }}>
                                                      <span className="material-icons">delete_outline</span>Delete Post
                                                </div>
                                          }
                                    </div>
                              </>
                        }
                  </div>
            </div>
      )
}
export default Header