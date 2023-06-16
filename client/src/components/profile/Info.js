import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
const Info = ({auth, profile, dispatch, id}) => {

      const [userData, setUserData] = useState([])
      const [onEdit, setOnEdit] = useState(false);


      useEffect(() => {
            if (id === auth.user._id) {
                  setUserData([auth.user])
            }
            else {
                  const newdData = profile.users.filter(user => user._id === id)
                  console.log(newdData)
                  setUserData(newdData);
            }
      }, [id, auth, dispatch, profile.users]);
      const [showFollowersModal, setFollowersModal] = useState(false);
      const [showFollowingModal, setFollowingModal] = useState(false);
      const closeModal = () => {
            setFollowersModal(false);
            setFollowingModal(false);
      };
      const handleShowFollower = (e) => {
            setFollowersModal(true)
      }
      const handleShowFollowing = (e) => {
            setFollowingModal(true)
      }
      
      return (
            <div className="info">
                  {
                        userData.map(user => (
                              
                              <div className="info_container" key={user._id}>
                                    <img src={user.avatar} alt="avatar" style={{
                                          width: '150px',
                                          height: '150px',
                                          borderRadius: '50%'
                                    }} />
                                    <div className="info_content">
                                          <div className="info_content_title">
                                                <h2>{user.username}</h2>
                                                {
                                                      user._id === auth.user._id
                                                            ? (<button className="btn btn-outline-dark"
                                                                  onClick={() => setOnEdit(true)}>
                                                                  Edit Profile
                                                            </button>)
                                                            : (<FollowBtn user={user} />)
                                                }
                                          </div>
                                          <div className="follow_btn">
                                                <span className="pointer mr-4" onClick={handleShowFollower}>
                                                      {user.followers.length} Followers
                                                </span>

                                                <span className="pointer ml-4" onClick={handleShowFollowing}>
                                                      {user.following.length} Following
                                                </span>
                                          </div>
                                          <h6>{user.fullname}</h6>
                                    </div>
                                    {
                                          onEdit &&
                                          <EditProfile
                                                user={user}
                                                setOnEdit={setOnEdit}
                                          />    
                                    }
                                    {showFollowersModal  && (<Followers users={user.followers} closeModal={closeModal} />)}
                                    {showFollowingModal  && (<Following users={user.following} closeModal={closeModal} />)}
                              </div>
                        ))
                  }
            </div>
      )
}
export default Info;