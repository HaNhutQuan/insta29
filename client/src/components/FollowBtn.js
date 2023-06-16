import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction"

const FollowBtn = ({ user }) => {
      const [followed, setFollowed] = useState(false);
      const { auth, profile } = useSelector((state) => state);
      const dispatch = useDispatch();

      const handleFollow = async (e) => {
            setFollowed(true);
            await dispatch(follow({users: profile.users, user, auth}));
      }
      const handleFollowing = async (e) => {
            setFollowed(false);
            await dispatch(unfollow({users: profile.users, user, auth}));
      }


      useEffect(() => {
            if (auth.user.following.find(item => item._id === user._id)) {
                  setFollowed(true);
            }
            return () => setFollowed(false)
      }, [auth.user.following, user._id])


      return (
            <>
                  {
                        followed
                              ? <button className="btn btn-primary" onClick={handleFollowing}>Following</button>
                              : <button className="btn btn-primary" onClick={handleFollow}>Follow</button>
                  }
            </>
      )
}

export default FollowBtn;