import React, { useState, useEffect } from 'react';
import PostPreview from '../PostPreview';

const Posts = ({auth, profile, dispatch, id}) => {
      const [posts, setPosts] = useState([]);
      const [result, setResult] = useState(9);
      const [page, setPage] = useState(0);
      
    useEffect(() => {
      profile.posts.forEach(data => {
          if(data._id === id){
              setPosts(data.posts)
              setResult(data.result)
              setPage(data.page)
          }
      })
  },[profile.posts, id,dispatch])
      return (
          
            <div>
                  <PostPreview posts={posts} />
            </div>
      )
}
export default Posts;