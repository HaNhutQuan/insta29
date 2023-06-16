import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import  PostCard from "../../components/PostCard"
const Post = () => {
      const { id } = useParams();
      const [post, setPost] = useState([]);
      const dispatch = useDispatch();
      const { auth, detailPost } = useSelector((state) => state);
      useEffect(() => {
            dispatch(getPost({ detailPost, id, auth }))

            if (detailPost.length > 0) {
                  const newArr = detailPost.filter(post => post._id === id)
                  setPost(newArr)
            }
       
      }, [detailPost, dispatch, id, auth])
      return (
            <div className="posts d-flex justify-content-center mt-3">
                  {
                        post.map(item => (
                              <PostCard key={item._id} post={item} />
                        ))
                  }
            </div>
      )
      
}
export default Post;