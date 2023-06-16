import fetchData from "../../utils/fetchData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export const TYPES = {
      AUTH: "AUTH"
};

export const login = (data) => async (dispatch) => {
      try {
            const res = await fetchData.postData('login', data);
            dispatch({
                  type: 'AUTH',
                  payload: {
                        user: res.data.user,
                        token: res.data.access_token
                  }
            })

            localStorage.setItem("Access Token", true);
            toast.success(res.data.message);
      } catch (error) {
            toast.error(error.response.data.message);
      }
};
export const refreshToken = () => async (dispatch) => {
      const accessToken = localStorage.getItem("Access Token");

      if (accessToken) {
            try {
                  const res = await fetchData.postData('refresh_token');
                  dispatch({
                        type: 'AUTH',
                        payload: {
                              user: res.data.user,
                              token: res.data.access_token
                        }
                  });
            } catch (error) {
                  console.log(error.data.message);
            }
      }
};
export const register = (data) => async (dispatch) => {
      /* VALID */
      if (!data.fullname)
            return toast.error("Please add your full name.");
      else if (data.fullname.length > 25)
            return toast.error("Full name is up to 25 characters long.");

      if (!data.username)
            return toast.error("Please add your user name.");
      else if (data.username.replace(/ /g, '').length > 25)
            return toast.error("User name is up to 25 characters long.");

      if (!data.email)
            return toast.error("Please add your email.");


      if (!data.password)
            return toast.error("Please add your password.");
      else if (data.password.length < 7)
            return toast.error("Password must be at least 7 characters.");
      if (data.password !== data.confirmPassword)
            return toast.error("The password and confirmation password do not match.");

      try {
            const res = await fetchData.postData('register', data);
            dispatch({
                  type: "AUTH",
                  payload: {
                        user: res.data.user
                  }
            })
            toast.success("Registration successful");
      } catch (error) {
            console.log(error);
      }
}

export const logout = () => async (dispatch) => {
      try {
            localStorage.removeItem("Access Token");
            await fetchData.postData("logout");
            window.location = "/login";
      } catch (error) {
            console.log(error);
      }
}
