import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  serverTimestamp,
  getDoc,
  setDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";

import Chatbot from "../src/components/Chatbot";

import { PageLayout } from "../src/components/general/layouts";
import {
  ProductCard,
  ProductsGrid,
  ProductsVariants,
} from "../src/components/general/productsComponents";
import { db } from "../src/utils/firebase/initClient";
import { useAuth } from "../src/utils/contexts/AuthContext";
import { useProducts } from "../src/utils/contexts/ProductsContext";
import Modal from "../src/components/general/Modal";
import Show from "../src/components/wrapper/Show";
import { NumberInput } from "../src/components/general/inputs";

export default function Home() {
  const { currentUser, userCredentials, getFirstName } = useAuth();
  const {
    glassProducts,
    alumProducts,
    alumAccs,
    successToast,
    updateCartItemToast,
    errorToast,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const selectedProductIsGlass = selectedProduct?.variants;

  const [searchGlassInput, setSearchGlassInput] = useState("");
  const [searchAlumInput, setSearchAlumInput] = useState("");

  const router = useRouter();

  const [unitPrice, setUnitPrice] = useState(0);
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  const [thick, setThick] = useState();
  const [qty, setQty] = useState(1);

  const [alumVariant, setAlumVariant] = useState();

  const openModal = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUnitPrice(0);
    setQty(1);
    setHeight(1);
    setWidth(1);
    setThick();
    setAlumVariant();
  };

  const handleGlassDetails = (variant) => {
    setUnitPrice(variant.initial);
    setThick(variant.thickness);
  };

  const handleAlumDetails = (variant) => {
    setUnitPrice(variant.initial);
    setAlumVariant(variant.material);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!unitPrice) {
      errorToast();
      return;
    }

    const glassId = `${thick?.replace("/", "")}${height}x${width}${
      selectedProduct?.material
    }${selectedProduct?.type}`;
    const alumId = `${selectedProduct?.material.replace(
      " ",
      ""
    )}${alumVariant}`;

    const docRef = doc(
      db,
      `users/${currentUser?.uid}/cart`,
      selectedProductIsGlass ? glassId : alumId
    );

    if (selectedProductIsGlass) {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          qty: increment(qty),
        });
        updateCartItemToast();
        closeModal();
        return;
      }

      await setDoc(docRef, {
        name: `${selectedProduct?.material} ${selectedProduct?.type} glass`,
        details: `${thick}, ${height}x${width} sqft`,
        price: Number(unitPrice * height * width),
        qty: Number(qty),
        image: selectedProduct?.image,
        timestamp: serverTimestamp(),
        category: "glass",
        pid: selectedProduct?.id,
      });
      successToast();
    } else {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          qty: increment(qty),
        });
        updateCartItemToast();
        closeModal();
        return;
      }

      await setDoc(docRef, {
        name: `${selectedProduct?.material}`,
        details: `type ${selectedProduct?.type}, ${alumVariant}`,
        price: Number(selectedProduct?.price + unitPrice),
        qty: Number(qty),
        image: selectedProduct?.image,
        timestamp: serverTimestamp(),
        category: "aluminum",
        pid: selectedProduct?.id,
      });
      successToast();
    }
    closeModal();
  };

  return (
    <PageLayout
      pageTitle={`Welcome ${
        userCredentials ? getFirstName(userCredentials.firstname) : ""
      }`}
      absolutes={
        <Modal
          title={`${selectedProduct?.material} ${selectedProduct?.type}`}
          isOpen={isModalOpen}
          closeModal={closeModal}
          className="max-w-xl md:max-w-3xl"
          formHandler={handleAddToCart}
          btnLabel={`Add to cart ₱${
            selectedProductIsGlass
              ? (unitPrice * height * width).toFixed(2)
              : !alumVariant
              ? selectedProduct?.price
              : selectedProduct?.price + unitPrice
          }`}
        >
          <main className="flex flex-col md:flex-row border-b pb-4">
            <section className="flex items-center justify-center md:w-1/2">
              <img
                src={selectedProduct?.image}
                alt={selectedProduct?.type}
                className="w-1/2 md:w-full py-4"
              />
            </section>
            <section className="flex-1 md:flex items-center justify-center">
              <div className="space-y-4">
                <h3 className="font-semibold">Variants</h3>
                <div className="space-y-2 max-h-64 md:max-h-72 overflow-y-auto modal-scrollbar">
                  <Show when={selectedProductIsGlass}>
                    {selectedProduct?.variants?.map((variant, i) => {
                      return (
                        <ProductsVariants
                          key={i}
                          variant={variant}
                          variantHandler={() => handleGlassDetails(variant)}
                          priceLabel={`₱ ${variant.initial} / sqft`}
                          variantDetails={`Thickness: ${variant.thickness}`}
                          unitPrice={unitPrice}
                        />
                      );
                    })}
                  </Show>
                  <Show when={!selectedProductIsGlass}>
                    {alumAccs?.map((variant, i) => {
                      return (
                        <ProductsVariants
                          key={i}
                          variant={variant}
                          variantHandler={() => handleAlumDetails(variant)}
                          priceLabel={`₱ ${variant.initial}.00`}
                          variantDetails={`Finish: ${variant.material}`}
                          unitPrice={unitPrice}
                        />
                      );
                    })}
                  </Show>
                </div>
              </div>
            </section>
          </main>
          <section className="mt-6 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <Show when={selectedProductIsGlass}>
              <div className="flex items-center w-full md:w-max space-x-4">
                <NumberInput
                  label="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min={1}
                  max={20}
                  step=".01"
                />
                <NumberInput
                  label="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min={1}
                  max={20}
                  step=".01"
                />
              </div>
            </Show>
            <NumberInput
              label="Qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min={1}
              max={20}
            />
          </section>
        </Modal>
      }
    >
      <Head>
        <title>Home | Prominente</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/vercel.svg" />
      </Head>

      {/* <Chatbot /> */}

      <ProductsGrid
        label="Glass Products"
        hasSearch
        searchPlaceholder="Search glass products"
        onSearchChange={(e) => setSearchGlassInput(e.target.value)}
      >
        {glassProducts
          ?.filter((el) => el.material === "ordinary")
          .filter((val) => {
            if (searchGlassInput === "") return val;
            else if (
              val.type.toLowerCase().includes(searchGlassInput.toLowerCase())
            )
              return val;
          })
          .map((product, i) => (
            <ProductCard
              key={i}
              image={product.image}
              alt={product.type}
              primaryLabel={product.material}
              secondaryLabel={product.type}
              onClick={() => openModal(product)}
            />
          ))}
      </ProductsGrid>

      <ProductsGrid label="Tempered">
        {glassProducts
          ?.filter((el) => el.material === "tempered")
          .filter((val) => {
            if (searchGlassInput === "") return val;
            else if (
              val.type.toLowerCase().includes(searchGlassInput.toLowerCase())
            )
              return val;
          })
          .map((product, i) => (
            <ProductCard
              key={i}
              image={product.image}
              alt={product.type}
              primaryLabel={product.material}
              secondaryLabel={product.type}
              onClick={() => openModal(product)}
            />
          ))}
      </ProductsGrid>

      <ProductsGrid
        label="Aluminum Products"
        hasSearch
        searchPlaceholder="Search aluminum products"
        onSearchChange={(e) => setSearchAlumInput(e.target.value)}
      >
        {alumProducts
          ?.filter((val) => {
            if (searchAlumInput === "") return val;
            else if (
              val.material
                .toLowerCase()
                .includes(searchAlumInput.toLowerCase()) ||
              val.type.toLowerCase().includes(searchAlumInput.toLowerCase())
            )
              return val;
          })
          .map((product, i) => (
            <ProductCard
              key={i}
              image={product.image}
              alt={product.type}
              primaryLabel={product.material}
              secondaryLabel={product.type}
              onClick={() => openModal(product)}
            />
          ))}
      </ProductsGrid>
    </PageLayout>
  );
}
