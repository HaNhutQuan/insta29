import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import pic from "../assets/image.jpg";
import logo from "../assets/logo.png";
import { login } from "../redux/actions/authAction";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
const Login = () => {


  const auth = useSelector((sate) => sate.auth);
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (auth.token) {
      setTimeout(() => {
        navigate("/");
      }, 2 * 1000);
      setLoading(false);
    };

  }, [auth.token, navigate]);
  useEffect(() => {
    if (loading === true)
      document.body.style.background = "rgb(219,226, 226)";
    else
      document.body.style.background = 'white'
  }, [loading])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };
  return (
    <>
      {!loading ? (<Loader />) : (
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
                          type="email"
                          placeholder="Email Address"
                          className="form-control my-3 p-4"
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
                          className="form-control my-3 p-4"
                          onChange={handleChangeInput}
                          name="password"
                          value={password}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-lg-7">
                        <button
                          type="submit"
                          className="btn1 mt-3 mb-2"
                          disabled={email && password ? false : true}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <p>
                      You don't have an account?{" "}
                      <Link to="/register">Register here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default Login;
