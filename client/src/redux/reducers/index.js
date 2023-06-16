import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profileReducer";
import status from "./statusReducer";
import post from "./postReducer";
import detailPost from "./detailPostReducer";
import discover from './discoverReducer'
export default combineReducers({
      auth,
      profile,
      status,
      post,
      detailPost,
      discover
});