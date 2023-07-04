import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
const ProtectedRouter = ({ children }) => {
  const { authUser, authLoading } = useAuth();
  const location = useLocation();
  if (!authUser & authLoading) {
    return <div>Loading</div>;
  }
  if (authUser) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        replace={true}
        state={{ from: location.pathname }}
      ></Navigate>
    );
  }
};

export default ProtectedRouter;
