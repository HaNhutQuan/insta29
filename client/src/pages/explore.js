import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction';
import Loader from '../components/Loader'
import PostPreview from "../components/PostPreview";
import fetchData from '../utils/fetchData';
const Explore = () => {
      const { auth, discover } = useSelector(state => state);
      const dispatch = useDispatch();
      
      
      useEffect(() => {
           
            dispatch(getDiscoverPosts(auth.token))
            
        },[dispatch, auth.token, discover.firstLoad])
        
      return (
            <div>
                  {
                        discover.loading 
                        ? <Loader/>
                        : <PostPreview posts={discover.posts} result={discover.result} />
                  }
                  
            </div>
      );
};

export default Explore;
