import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import { PostIcon, SavedIcon } from "../../components/Icons";
import Saved from "../../components/profile/Saved";
const Profile = () => {
      const { profile, auth } = useSelector(state => state);
      const { id } = useParams();
      const dispatch = useDispatch();

      const [tab, setTab] = useState("POSTS");

      useEffect(() => {
            if (profile.ids.every(item => item !== id)) {
                  dispatch(getProfileUsers({ id, auth }))
            }
      }, [id, auth, dispatch, profile.ids])
      return (
            <>
                  <div className="profile">
                        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
                        <hr />
                        <div className="profile-tab">
                              <div
                                    style={{ fontWeight: tab === "POSTS" ? "500" : "" }}
                                    onClick={() => setTab("POSTS")}
                              >
                                    <PostIcon />
                                    <span>Posts</span>
                              </div>
                              <div
                                    style={{ fontWeight: tab === "SAVED" ? "500" : "" }}
                                    onClick={() => setTab("SAVED")}
                              >
                                    <SavedIcon />
                                    <span>Saved</span>
                              </div>
                        </div>
                        {tab === "POSTS" && (<Posts auth={auth} profile={profile} dispatch={dispatch} id={id}  />)}
                        { auth.user._id === id &&
                        <>
                        {
                        tab === "SAVED" && (<Saved auth={auth} dispatch={dispatch} />)         
                        }
                        </>
                        }
                  </div>
            </>
      );
};

export default Profile;
