import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const { authUser, socialLogin, authLoading } = useContext(AuthContext);
  return { authUser, socialLogin, authLoading };
};

export default useAuth;
