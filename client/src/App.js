import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import PageRender from "./PageRender";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

import Header from "./components/Header";
import RequireAuth from "./components/RequireAuth"
import Status from "./components/home/Status";

import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { updateProfileUser } from "./redux/actions/profileAction";

function App() {

  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch]);

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
    }
  }, [dispatch, auth.token]);
  
  return (
    <Router>
      <div className="App">
        <div className="main">
          
          <Routes>
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Header />
                  {status && <Status/>}
                  <Home />
                  </RequireAuth>
              }
            />
            <Route
              exact path="/:page"
              element={
               
                  <RequireAuth>
                  <Header />
                  {status && <Status/>}
                  <PageRender />
                  </RequireAuth>
                

              }
            />
            <Route
              exact path="/:page/:id"
              element={
                
                  <RequireAuth>
                  <Header />
                  {status && <Status/>}
                  <PageRender />
                  </RequireAuth>
              } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
