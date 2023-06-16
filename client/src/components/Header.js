import React from "react";
import { Link } from "react-router-dom";
import navlogo from "../assets/navlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { HomeIcon, ExploreIcon, NewPostIcon } from "./Icons";
import { logout } from "../redux/actions/authAction";
import Search from "./Search";
import { GLOBALTYPES } from "../redux/actions/globalType";
import { getPosts } from "../redux/actions/postAction";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout());
  };
  const handleNewPost = (e) => {
      dispatch({type: GLOBALTYPES.STATUS, payload:true})
  }
  const handleClick = (e) => {
    dispatch(getPosts(auth.token))
  }
  
  
  return (

    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
        <Link to="/">
          <img className="nav-logo" src={navlogo} alt="logo" onClick={handleClick}/>
        </Link>
        <Search />

        <ul className="navbar-nav flex-row">
        <Link to="/">
          <li className="nav-item active nav-link" onClick={handleClick}>
            <HomeIcon/>
          </li>
          </Link>
          <li className="nav-item active nav-link" onClick={handleNewPost}>
            <NewPostIcon/>
          </li>
          <Link to="/explore">
          <li className="nav-item active nav-link" >
            <ExploreIcon/>
          </li>
          </Link>
          <li className="nav-item dropdown" style={{ opacity: 1 }}>
            <span
              className="nav-link position-relative"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                src={auth.user.avatar}
                alt="avatar"
              />
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link
                className="dropdown-item"
                to={`/profile/${auth.user._id}`}

              >
                Profile
              </Link>
              <Link
                className="dropdown-item"
                to="/login"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>

      </nav>
    </div>

  );
};

export default Header;
