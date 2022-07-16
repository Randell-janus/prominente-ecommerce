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

const SalesContext = createContext();

export const useSales = () => {
  return useContext(SalesContext);
};

export const SalesProvider = ({ children }) => {
  const [bills, setBills] = useState([]);

  const getBills = () => {
    const ref = collection(db, "sales");
    // const q = query(ref, orderBy("firstname"));
    const q = query(ref, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bills = [];

      querySnapshot.forEach((doc) => {
        bills.push({ id: doc.id, ...doc.data() });
      });
      setBills(bills);
    });
  };

  useEffect(() => {
    getBills();
  }, []);

  const value = { bills };

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  );
};
