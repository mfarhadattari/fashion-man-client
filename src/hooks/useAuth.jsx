import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const {
    authUser,
    socialLogin,
    authLoading,
    createAccount,
    updateInfo,
    userLogin,
    logout,
  } = useContext(AuthContext);

  return {
    authUser,
    socialLogin,
    authLoading,
    createAccount,
    updateInfo,
    userLogin,
    logout,
  };
};

export default useAuth;
