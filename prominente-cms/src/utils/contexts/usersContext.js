import { useContext, useState, createContext, useEffect } from "react";
import {
  query,
  onSnapshot,
  orderBy,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/initClient";

const UsersContext = createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  const getUsers = () => {
    const ref = collection(db, "users");
    // const q = query(ref, orderBy("firstname"));

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      setUsersCount(querySnapshot.size);
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsers(users);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const value = { users, usersCount };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
