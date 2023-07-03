import { useEffect, useState } from "react";
import { createContext } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  //! -------------- Social Login -----------//
  const socialLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // ! ---------------- Get Logged User -------- //
  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setAuthLoading(false);
      } else {
        setAuthUser(null);
        setAuthLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = { authUser, socialLogin, authLoading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
