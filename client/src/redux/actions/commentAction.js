import { GLOBALTYPES, EditData, DeleteData } from './globalType'
import { POST_TYPES } from './postAction'
import { TYPES } from './authAction'
import fetchData from '../../utils/fetchData'

export const createComment = ({post, newComment, auth}) => async (dispatch) => {
      const newPost = {...post, comments: [...post.comments, newComment]}

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
  
      try {
          const data = {...newComment, postId: post._id, postUserId: post.user._id}
          const res = await fetchData.postData('comment', data, auth.token)
  
          const newData = {...res.data.newComment, user: auth.user}
          const newPost = {...post, comments: [...post.comments, newData]}
          dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
          
      } catch (err) {
         console.log(err);
      }
  }