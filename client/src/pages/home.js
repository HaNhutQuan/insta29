import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Posts from "../components/home/Posts";

let scroll = 0;
const Home = () => {
  document.body.style.background = "white";
  const post = useSelector((state) => state.post)
  window.addEventListener('scroll', () => {
    if(window.location.pathname === '/'){
        scroll = window.pageYOffset
        return scroll;
    }
})
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' })
    }, 100)
    
  }, [])
  
  return (
    <div className="home row">
      <div className="col-md-8">
        {
         ( post.result === 0 && post.posts.length === 0)
            ? <h2 className="text-center">No post</h2>
            : <Posts/>
        }
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Home;
