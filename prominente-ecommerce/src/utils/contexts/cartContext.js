import { useContext, useState, useEffect, createContext } from "react";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { db, auth } from "../firebase/initClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser, userCredentials } = useAuth();

  const [cartItems, setCartItems] = useState(null);
  const [totalBill, setTotalBill] = useState(0);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalUnapproved, setTotalUnapproved] = useState(0);

  const [checkoutItems, setCheckoutItems] = useState(null);

  const getCartItems = () => {
    const ref = collection(db, `users/${currentUser?.uid}/cart`);
    const q = query(ref, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      const prices = [];
      const cartCount = [];

      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
        prices.push(doc.data().price * doc.data().qty);
        cartCount.push(doc.data().qty);
      });
      setCartItems(items);

      if (!querySnapshot.size) {
        setTotalBill(0);
        setTotalCartCount(0);
        return;
      }

      setTotalBill(prices.reduce((a, b) => a + b));
      setTotalCartCount(cartCount.reduce((a, b) => a + b));

      //   console.log(prices.reduce((a, b) => a + b));
      //   console.log(cartCount.reduce((a, b) => a + b));
    });
  };

  const getCheckoutItems = () => {
    const ref = collection(db, `users/${currentUser?.uid}/checkouts`);
    const q = query(ref, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // setTotalPending(querySnapshot.size);
      const items = [];

      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setCheckoutItems(items);

      setTotalPending(items.filter((el) => el.status === "pending").length);
      setTotalDelivered(items.filter((el) => el.status === "delivered").length);
      setTotalConfirmed(items.filter((el) => el.status === "confirmed").length);
      setTotalUnapproved(
        items.filter((el) => el.status === "unapproved").length
      );
    });
  };

  useEffect(() => {
    getCartItems();
    getCheckoutItems();
  }, [currentUser]);

  const value = {
    cartItems,
    totalBill,
    totalCartCount,
    checkoutItems,
    totalPending,
    totalDelivered,
    totalConfirmed,
    totalUnapproved,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
