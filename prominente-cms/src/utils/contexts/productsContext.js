import { useContext, useState, createContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { query, onSnapshot, orderBy, collection } from "firebase/firestore";
import { v4 } from "uuid";

import { storage, db } from "../firebase/initClient";
import {
  GLASS_MAIN_TABLE,
  GLASS_VARIANTS_TABLE,
  GLASS_TYPES,
  GLASS_MATERIALS,
  GLASS_THICKNESS,
  ALUM,
} from "../common";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const [isProductVisible, setIsProductVisible] = useState("false");
  const [imageUpload, setImageUpload] = useState(null);
  const [alumMaterial, setAlumMaterial] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);

  const [glassMaterial, setGlassMaterial] = useState(GLASS_MATERIALS[0]);
  const [glassType, setGlassType] = useState(GLASS_TYPES[0]);
  const [glassThickness, setGlassThickness] = useState(GLASS_THICKNESS[0]);

  const [glassInitialPrice, setGlassInitialPrice] = useState(25);

  const [glassProducts, setGlassProducts] = useState(null);

  const [alumSeries, setAlumSeries] = useState(ALUM.TYPE[0]);
  const [alumPrice, setAlumPrice] = useState(0);

  const [alumProducts, setAlumProducts] = useState(null);
  const [alumAccs, setAlumAccs] = useState(null);

  const handleImageUpload = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `products/${imageUpload.name + v4()}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const imageURL = await getDownloadURL(snapshot.ref);
      return imageURL;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const getGlassProducts = () => {
    const ref = collection(db, "glass");
    const q = query(ref, orderBy("timestamp", "asc"));

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
    const q = query(ref, orderBy("timestamp", "asc"));

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
      const accessories = [];

      querySnapshot.forEach((doc) => {
        accessories.push({ id: doc.id, ...doc.data() });
      });

      setAlumAccs(accessories);
    });
  };

  useEffect(() => {
    getGlassProducts();
    getAlumProducts();
    getAlumAccs();
  }, []);

  const value = {
    navIsOpen,
    setNavIsOpen,
    glassMaterial,
    setGlassMaterial,
    glassType,
    setGlassType,
    glassThickness,
    setGlassThickness,
    glassInitialPrice,
    setGlassInitialPrice,
    GLASS_MAIN_TABLE,
    GLASS_VARIANTS_TABLE,
    GLASS_MATERIALS,
    GLASS_TYPES,
    GLASS_THICKNESS,
    setImageUpload,
    handleImageUpload,
    glassProducts,
    isProductVisible,
    setIsProductVisible,
    selectedRow,
    setSelectedRow,

    alumMaterial,
    setAlumMaterial,
    alumSeries,
    setAlumSeries,
    alumPrice,
    setAlumPrice,
    alumProducts,
    setAlumProducts,

    alumAccs,
    setAlumAccs,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
