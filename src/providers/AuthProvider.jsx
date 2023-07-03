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

const auth = getAuth(app);

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  //! ---------------- Create Account ---------------------//
  const createAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //! ------------------ Update info ----------------- //
  const updateInfo = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  //! -------------- Social Login -----------//
  const socialLogin = (provider) => {
    return signInWithPopup(auth, provider);
  };

  // ! --------------- User Login --------------//
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ! -------------- Logout User --------------- //
  const logout = () => {
    return signOut(auth);
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
