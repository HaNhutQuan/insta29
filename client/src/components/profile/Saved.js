import React, { useState, useEffect } from 'react'
import fetchData from '../../utils/fetchData'
import PostPreview from '../PostPreview'
const Saved = ({auth, dispatch}) => {
      const [savePosts, setSavePosts] = useState([])
      useEffect(() =>  {
            fetchData.getData('getSavePosts', auth.token)
            .then(res => {setSavePosts(res.data.savePosts)})
            .catch(err => {
                console.log(err);
            })
            return () => setSavePosts([])
        },[auth.token, dispatch])
        
      return (
            <div>
                    <PostPreview posts={savePosts}/> 
            </div>
      )

}
export default Saved