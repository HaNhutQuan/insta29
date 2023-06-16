import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/image.jpg";
import logo from "../assets/logo.png";
import { register } from "../redux/actions/authAction";
import { ToastContainer } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((sate) => sate.auth);
  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, confirmPassword } = userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);
  return (
    <div>
      <div className="auth_page">
        <section className="Form my-4 mx-5">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-5">
                <img className="img-fluid" src={pic} alt="" />
              </div>

              <div className="col-lg-7 px-5 pt-5">
                <img className="py-3" src={logo} alt="" />

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control my-2 p-4"
                        onChange={handleChangeInput}
                        name="fullname"
                        value={fullname}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <input
                        type="text"
                        placeholder="User Name"
                        className="form-control my-2 p-4"
                        onChange={handleChangeInput}
                        name="username"
                        value={username}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="form-control my-2 p-4"
                        onChange={handleChangeInput}
                        name="email"
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <input
                        type="password"
                        placeholder="Passsword"
                        className="form-control my-2 p-4"
                        onChange={handleChangeInput}
                        name="password"
                        value={password}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control my-2 p-4"
                        onChange={handleChangeInput}
                        name="confirmPassword"
                        value={confirmPassword}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-7">
                      <button type="submit" className="btn1 mt-2 mb-2">
                        Register
                      </button>
                    </div>
                  </div>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
