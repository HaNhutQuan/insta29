import { imageUpload } from '../../utils/imageUpload'
import fetchData from '../../utils/fetchData'
import { TYPES } from "./authAction"
export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}
export const createPost = ({ content, images, auth }) => async (dispatch) => {
    let media = []
    try {
        if (images.length > 0) media = await imageUpload(images)

        const res = await fetchData.postData('post', { content, images: media }, auth.token)
        dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: { ...res.data.newPost, user: auth.user }
        })

    } catch (err) {
        console.log(err);
    }
}
export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await fetchData.getData('post', token)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: { ...res.data, page: 2 }
        })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        console.log(err)
    }
}
export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await fetchData.patchData(`post/${status._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })

       
    } catch (err) {
        console.log(err);
    }
}
export const likePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        await fetchData.patchData(`post/${post._id}/like`, null, auth.token)


    } catch (err) {
        console.log(err)
    }
}

export const unLikePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })


    try {
        await fetchData.patchData(`post/${post._id}/unlike`, null, auth.token)


    } catch (err) {
        console.log(err)
    }
}
export const savePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, savePost: [...auth.user.savePost, post._id] }
    dispatch({ type: TYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await fetchData.patchData(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        console.log(err)
    }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, savePost: auth.user.savePost.filter(id => id !== post._id) }
    dispatch({ type: TYPES.AUTH, payload: { ...auth, user: newUser } })

    try {
        await fetchData.patchData(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        console.log(err)
    }
}


export const deletePost = ({post, auth}) => async (dispatch) => {

    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })
    try {
        const res = await fetchData.deleteData(`post/${post._id}`, auth.token)
    } catch (err) {
        console.log(err)
    }
}
export const getPost = ({detailPost, id, auth}) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await fetchData.getData(`post/${id}`, auth.token)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            console.log(err)
        }
    }
}
