import { useEffect, useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const auth = getAuth(app);

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { axiosPublic } = useAxiosPublic();

  //! ---------------- Create Account ---------------------//
  const createAccount = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //! ------------------ Update info ----------------- //
  const updateInfo = (displayName, photoURL) => {
    setAuthLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  //! -------------- Social Login -----------//
  const socialLogin = (provider) => {
    setAuthLoading(true);
    return signInWithPopup(auth, provider);
  };

  // ! --------------- User Login --------------//
  const userLogin = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ! -------------- Logout User --------------- //
  const logout = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  // ! ---------------- Get Logged User -------- //
  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setAuthLoading(false);
        axiosPublic
          .post("/generate-jwt", { email: user.email })
          .then(({ data }) => {
            localStorage.setItem("pf-user-token", data.token);
          });
      } else {
        setAuthUser(null);
        setAuthLoading(false);
        localStorage.removeItem("pf-user-token");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    authUser,
    socialLogin,
    authLoading,
    createAccount,
    updateInfo,
    userLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
