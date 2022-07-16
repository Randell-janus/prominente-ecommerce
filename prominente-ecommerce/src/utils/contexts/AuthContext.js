import { useContext, useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { db, auth } from "../firebase/initClient";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userCredentials, setUserCredentials] = useState();

  const [loading, setLoading] = useState(true);
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [resetPasswordSuccess, setResetPasswordSuccess] = useState("");
  const [resetPasswordError, setResetPasswordError] = useState("");

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSettingUserCredentials = () => {
    if (userCredentials) {
      setFirstname(userCredentials.firstname);
      setSurname(userCredentials.surname);
      setAddress(userCredentials.address);
      setContact(userCredentials.contact);
    }
  };

  const getFirstName = (name) => name.split(" ")[0];
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const router = useRouter();

  const storeUserCredentials = async (userPayload, response) => {
    try {
      await setDoc(doc(db, "users", response.user.uid), userPayload);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const signup = async (firstname, surname, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await storeUserCredentials(
        {
          // uid: response.user.uid,
          firstname,
          surname,
          address: "",
          contact: "",
          email,
        },
        response
      );
      router.push("/");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const logout = () => {
    try {
      signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (email) => {
    try {
      setResetPasswordError("");
      setResetPasswordSuccess("");
      await sendPasswordResetEmail(auth, email);
      setResetPasswordSuccess("Check your inbox for further instructions");
    } catch (error) {
      setResetPasswordError("Failed to reset password");
      console.log(error.code);
      console.log(error.message);
    }
  };

  const updateUserEmail = async (email) => {
    const userRef = doc(db, "users", currentUser.uid);

    await updateEmail(currentUser, email);
    updateDoc(userRef, { email });
  };

  const updateUserPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  const getUserCredentials = (user) => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserCredentials(doc.data());
      });
    }
    setUserCredentials();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      getUserCredentials(user);

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    handleSettingUserCredentials();
  }, [userCredentials]);

  const value = {
    currentUser,
    userCredentials,
    loading,
    setLoading,

    navIsOpen,
    setNavIsOpen,

    signup,
    login,
    logout,
    resetPassword,
    resetPasswordError,
    resetPasswordSuccess,
    updateUserEmail,
    updateUserPassword,

    getFirstName,
    capitalizeFirstLetter,

    firstname,
    setFirstname,
    surname,
    setSurname,
    address,
    setAddress,
    contact,
    setContact,

    handleSettingUserCredentials,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
