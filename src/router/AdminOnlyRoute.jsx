import { Navigate } from "react-router-dom";
import Loaders from "../components/Loaders";
import useIsAdmin from "./../hooks/useIsAdmin";
const AdminOnlyRoute = ({ children }) => {
  const { isAdmin, isAdminLoading } = useIsAdmin();
  if (!isAdmin & isAdminLoading) {
    return (
      <div className="loader-container">
        <Loaders></Loaders>
      </div>
    );
  }
  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" replace={true}></Navigate>;
  }
};

export default AdminOnlyRoute;
