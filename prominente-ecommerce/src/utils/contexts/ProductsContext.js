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
import { useToast } from "@chakra-ui/react";

import { db, auth } from "../firebase/initClient";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [glassProducts, setGlassProducts] = useState(null);
  const [alumProducts, setAlumProducts] = useState(null);
  const [alumAccs, setAlumAccs] = useState(null);

  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Success!",
      description: "Item added to cart.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const updateCartItemToast = () => {
    toast({
      title: "Success!",
      description: "Updated cart.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const errorToast = () => {
    toast({
      title: "Error!",
      description: "Please pick a variant.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const getGlassProducts = () => {
    const ref = collection(db, "glass");
    const q = query(
      ref,
      where("visible", "==", "true"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setGlassProducts(products);
    });
  };

  const getAlumProducts = () => {
    const ref = collection(db, "aluminum");
    const q = query(
      ref,
      where("visible", "==", "true"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setAlumProducts(products);
    });
  };

  const getAlumAccs = () => {
    const ref = collection(db, "accessories");
    const q = query(ref, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setAlumAccs(products);
    });
  };

  useEffect(() => {
    getGlassProducts();
    getAlumProducts();
    getAlumAccs();
  }, []);

  const value = {
    glassProducts,
    alumProducts,
    alumAccs,
    successToast,
    updateCartItemToast,
    errorToast,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
