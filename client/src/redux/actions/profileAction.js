import fetchData from "../../utils/fetchData";
import { toast } from "react-toastify";
import { imageUpload } from "../../utils/imageUpload";
import { TYPES } from "./authAction"
import { DeleteData } from "./globalType";
export const PROFILE_TYPES = {
      GET_USER: 'GET_PROFILE_USER',
      FOLLOW: 'FOLLOW',
      UNFOLLOW: 'UNFOLLOW',
      GET_ID: 'GET_PROFILE_ID',
      GET_POSTS: 'GET_PROFILE_POSTS',
      UPDATE_POST: 'UPDATE_PROFILE_POST'
};

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
            dispatch({type: PROFILE_TYPES.GET_ID, payload: id})
            try {

                  const res = await fetchData.getData(`/user/${id}`, auth.token);
                  const res1 = await fetchData.getData(`/user_posts/${id}`, auth.token);

                  const users = await res;
                  const posts = await res1;

                  dispatch({
                        type: PROFILE_TYPES.GET_USER,
                        payload: users.data
                  })

                  dispatch({
                        type: PROFILE_TYPES.GET_POSTS,
                        payload: {...posts.data, _id: id, page: 2}
                  })

            } catch (error) {
                  console.log(error);
            }
}
export const updateProfileUser = ({ userData, avatar, auth }) => async (dispatch) => {
      if (!userData.fullname)
            return toast.error("Please add your full name.")

      if (userData.fullname.length > 25)
            return toast.error("Your full name too long.")

      if (!userData.username)
            return toast.error("Please add your user name.")

      if (userData.username.length > 25)
            return toast.error("Your user name too long.")

      try {
            let media;

            if (avatar) media = await imageUpload([avatar]);
            const res = await fetchData.patchData("user", {
                  ...userData,
                  avatar: avatar ? media[0].url : auth.user.avatar
            }, auth.token)

            dispatch({
                  type: TYPES.AUTH,
                  payload: {
                        ...auth,
                        user: {
                              ...auth.user, ...userData,
                              avatar: avatar ? media[0].url : auth.user.avatar,
                        }
                  }
            })


      } catch (err) {
            console.log(err)
      }
}
export const follow = ({ users, user, auth }) => async (dispatch) => {
      let newUser;

      if (users.every(item => item._id !== user._id)) {
            newUser = { ...user, followers: [...user.followers, auth.user] }
      } else {
            users.forEach(item => {
                  if (item._id === user._id) {
                        newUser = { ...item, followers: [...item.followers, auth.user] }
                  }
            })
      }

      dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser })

      dispatch({
            type: TYPES.AUTH,
            payload: {
                  ...auth,
                  user: { ...auth.user, following: [...auth.user.following, newUser] }
            }
      })


      try {
            const res = await fetchData.patchData(`user/${user._id}/follow`, null, auth.token)
      } catch (err) {
            console.log(err)
      }
}

export const unfollow = ({ users, user, auth }) => async (dispatch) => {
      let newUser;

      if (users.every(item => item._id !== user._id)) {
            newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) }
      } else {
            users.forEach(item => {
                  if (item._id === user._id) {
                        newUser = { ...item, followers: DeleteData(item.followers, auth.user._id) }
                  }
            })
      }

      dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser })

      dispatch({
            type: TYPES.AUTH,
            payload: {
                  ...auth,
                  user: {
                        ...auth.user,
                        following: DeleteData(auth.user.following, newUser._id)
                  }
            }
      })

      try {
            const res = await fetchData.patchData(`user/${user._id}/unfollow`, null, auth.token)
      } catch (err) {
            console.log(err)
      }
}