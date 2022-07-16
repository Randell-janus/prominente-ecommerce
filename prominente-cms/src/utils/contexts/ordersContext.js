import { useContext, useState, createContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  query,
  onSnapshot,
  orderBy,
  collection,
  collectionGroup,
  where,
  getDocs,
} from "firebase/firestore";

import { storage, db } from "../firebase/initClient";

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  
  const getCheckoutItems = () => {
    const ref = collectionGroup(db, "checkouts");
    const q = query(ref, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setOrdersCount(querySnapshot.size);
      const orders = [];

      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(orders);
    });
  };

  useEffect(() => {
    getCheckoutItems();
  }, []);

  const value = { orders, ordersCount };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};
