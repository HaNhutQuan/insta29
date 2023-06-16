import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserCard = ({children,user,border,handleClose,setShowFollowers,setShowFollowing,msg,}) => {
      
      const showMsg = (user) => {
            return <></>;
      };
      return (
            <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
                  <div>
                        <Link to={`/profile/${user._id}`} onclick={handleClose} className="d-flex align-items-center">
                              <img src={user.avatar} alt="avatar" style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%'
                              }} />
                              <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                                    <span className="d-block text-dark mx-2 font-weight-bold">{user.username}</span>
                                    <small className="d-block text-muted mx-2 font-weight-bold" style={{ opacity: 0.7 }}>
                                          {
                                                msg
                                                      ? showMsg(user)
                                                      : user.fullname
                                          }
                                    </small>
                              </div>
                        </Link>
                  </div>
                  {children}
            </div>
      );
};

export default UserCard;
