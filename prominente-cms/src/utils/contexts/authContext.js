import { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../firebase/initClient";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatAuthState = (response) => ({
    uid: response.user.uid,
    email: response.user.email,
    name: response.user.displayName,
    photoUrl: response.user.photoURL,
    token: null,
  });

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setIsValidated(false);
      // router.push("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (error) {
      alert(error.code);
      // console.log(error.code);
      // console.log(error.message);
    }
  };
  // LOCAL
  const handleLocalStorageValidation = () => {
    window.localStorage.setItem("isValidated", JSON.stringify(isValidated));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const successToast = {
    title: "Success!",
    description: "Product added into database.",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  };
  const errorToast = {
    title: "Error!",
    description: "Something went wrong.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  };

  // LOCAL
  // useEffect(() => {
  //   setIsValidated(JSON.parse(window.localStorage.getItem("isValidated")));
  // }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
    setLoading,
    formatAuthState,
    isValidated,
    setIsValidated,
    successToast,
    errorToast,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
