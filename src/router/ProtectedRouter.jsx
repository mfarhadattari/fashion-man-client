import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import Loaders from "./../components/Loaders";
const ProtectedRouter = ({ children }) => {
  const { authUser, authLoading } = useAuth();
  const location = useLocation();
  if (!authUser & authLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Loaders></Loaders>
      </div>
    );
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
