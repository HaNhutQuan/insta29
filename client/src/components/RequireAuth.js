import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return !auth.token ? (
    <Navigate to="/login"/>
  ) : (
    children
  );
};

export default RequireAuth;