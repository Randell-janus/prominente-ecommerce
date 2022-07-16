import { useContext, useState, useEffect, createContext, useRef } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

import { db } from "../firebase/initClient";
import { useAuth } from "./AuthContext";

const NotifContext = createContext();

export const useNotif = () => {
  return useContext(NotifContext);
};

export const NotifProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const [notifs, setNotifs] = useState(null);
  const [notifCount, setNotifCount] = useState(null);

  const getNotifs = () => {
    const ref = collection(db, `users/${currentUser?.uid}/notifications`);
    const q = query(ref, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifs = [];

      querySnapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() });
      });
      setNotifs(notifs);
      setNotifCount(notifs.filter((el) => el.read === "false").length);
    });
  };

  useEffect(() => {
    getNotifs();
  }, [currentUser]);

  const value = { notifs, notifCount };

  return (
    <NotifContext.Provider value={value}>{children}</NotifContext.Provider>
  );
};
