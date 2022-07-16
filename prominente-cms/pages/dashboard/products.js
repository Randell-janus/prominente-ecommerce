import { useState } from "react";
import { Tbody, Tr, Td, useToast } from "@chakra-ui/react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import withPrivate from "../../src/utils/routes/withPrivate";
import { useProducts } from "../../src/utils/contexts/productsContext";
import { db } from "../../src/utils/firebase/initClient";
import AppTable from "../../src/components/reusable/AppTable";
import {
  AddAccsModal,
  AddAlumModal,
  AddGlassProductModal,
  AddGlassVariantModal,
  EditAccsModal,
  EditAlumModal,
  EditGlassProductModal,
} from "../../src/components/modals";
import {
  GLASS_MAIN_TABLE,
  GLASS_VARIANTS_TABLE,
  capitalizeFirstLetter,
  ALUM,
} from "../../src/utils/common";
import { PageLayout, TableLayout } from "../../src/components/reusable/layouts";
import {
  AddBtn,
  TdActionsBtn,
  TdVisibility,
} from "../../src/components/reusable/tableComponents";

const Products = ({ authContext }) => {
  const { errorToast } = authContext;
  const toast = useToast();
  const {
    glassMaterial,
    glassType,
    glassThickness,
    glassInitialPrice,
    handleImageUpload,
    setImageUpload,
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

    glassProducts,
    alumProducts,
    alumAccs,
  } = useProducts();

  const [searchGlassInput, setSearchGlassInput] = useState("");
  const [searchAlumInput, setSearchAlumInput] = useState("");

  //modals
  const [isAddGlassModalOpen, setIsAddGlassModalOpen] = useState(false);
  const openAddGlassModal = () => setIsAddGlassModalOpen(true);
  const [isAddVariantModalOpen, setIsAddVariantModalOpen] = useState(false);
  const openAddVariantModal = (product) => {
    setIsAddVariantModalOpen(true);
    setSelectedRow(product);
  };
  const [isEditGlassModalOpen, setIsEditGlassModalOpen] = useState(false);
  const openEditGlassModal = (product) => {
    setIsEditGlassModalOpen(true);
    setIsProductVisible(product.visible);
    setSelectedRow(product);
  };

  const [isAddAlumModalOpen, setIsAddAlumModalOpen] = useState(false);
  const openAddAlumModal = (product) => {
    setIsAddAlumModalOpen(true);
    setSelectedRow(product);
  };
  const [isEditAlumModalOpen, setIsEditAlumModalOpen] = useState(false);
  const openEditAlumModal = (product) => {
    setIsEditAlumModalOpen(true);
    setAlumMaterial(product.material);
    setAlumSeries(product.type);
    setAlumPrice(product.price);
    setIsProductVisible(product.visible);
    setSelectedRow(product);
  };
  const [isAddAccsModalOpen, setIsAddAccsModalOpen] = useState(false);
  const openAddAccsModal = (product) => {
    setIsAddAccsModalOpen(true);
    setSelectedRow(product);
  };
  const [isEditAccsModalOpen, setIsEditAccsModalOpen] = useState(false);
  const openEditAccsModal = (product) => {
    setIsEditAccsModalOpen(true);
    setAlumMaterial(product.material);
    setAlumPrice(product.initial);
    setSelectedRow(product);
  };

  const closeModal = () => {
    setIsAddGlassModalOpen(false);
    setIsAddVariantModalOpen(false);
    setIsEditGlassModalOpen(false);
    setIsAddAlumModalOpen(false);
    setIsEditAlumModalOpen(false);
    setIsAddAccsModalOpen(false);
    setIsEditAccsModalOpen(false);

    setImageUpload(null);
    setIsProductVisible("false");
    setSelectedRow(null);
  };

  // Glass Products
  const handleAddGlassProduct = async (e) => {
    e.preventDefault();
    const url = await handleImageUpload();

    try {
      await addDoc(collection(db, "glass"), {
        material: glassMaterial,
        type: glassType,
        visible: isProductVisible,
        sales: Number(0),
        timestamp: serverTimestamp(),
        image: url,
        variants: [
          {
            thickness: glassThickness,
            // height: Number(glassHeight),
            // width: Number(glassWidth),
            initial: Number(glassInitialPrice),
          },
        ],
      });
      closeModal();
      toast({
        title: "Success!",
        description: `${capitalizeFirstLetter(
          glassType
        )} glass added into database.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Error!",
        description: `${capitalizeFirstLetter(err.code)}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleAddGlassVariant = async (e) => {
    e.preventDefault();

    const ref = doc(db, "glass", selectedRow?.id);
    await updateDoc(ref, {
      variants: arrayUnion({
        thickness: glassThickness,
        // height: Number(glassHeight),
        // width: Number(glassWidth),
        initial: Number(glassInitialPrice),
      }),
    });
    closeModal();
  };

  const handleEditGlassProduct = async (e) => {
    e.preventDefault();

    const url = await handleImageUpload();
    const ref = doc(db, "glass", selectedRow.id);

    if (!url) {
      await updateDoc(ref, {
        visible: isProductVisible,
      });
      closeModal();
      return;
    }

    await updateDoc(ref, {
      visible: isProductVisible,
      image: url ? url : selectedRow.image,
    });
    closeModal();
  };

  const handleDeleteGlassVariant = async (product, variant) => {
    const ref = doc(db, "glass", product.id);
    await updateDoc(ref, {
      variants: arrayRemove({
        thickness: variant.thickness,
        // height: variant.height,
        // width: variant.width,
        initial: variant.initial,
      }),
    });
  };

  const handleDeleteGlassProduct = async (product) => {
    await deleteDoc(doc(db, "glass", product.id));
  };

  // Aluminum Products
  const handleAddAlumProduct = async (e) => {
    e.preventDefault();
    const url = await handleImageUpload();

    try {
      await addDoc(collection(db, "aluminum"), {
        material: alumMaterial.toLowerCase(),
        type: alumSeries,
        visible: isProductVisible,
        sales: Number(0),
        timestamp: serverTimestamp(),
        image: url,
        price: Number(alumPrice),
      });
      closeModal();
      toast({
        title: "Success!",
        description: `${capitalizeFirstLetter(
          alumMaterial
        )} added into database.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      toast({
        title: "Error!",
        description: `${capitalizeFirstLetter(err.code)}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleEditAlum = async (e) => {
    e.preventDefault();

    const url = await handleImageUpload();
    const ref = doc(db, "aluminum", selectedRow.id);

    if (!url) {
      await updateDoc(ref, {
        material: alumMaterial.toLowerCase(),
        type: alumSeries,
        visible: isProductVisible,
        price: Number(alumPrice),
      });
      closeModal();
      return;
    }

    await updateDoc(ref, {
      material: alumMaterial.toLowerCase(),
      type: alumSeries,
      visible: isProductVisible,
      image: url,
      price: Number(alumPrice),
    });
    closeModal();
  };

  const handleAddAlumAccs = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "accessories"), {
      material: alumMaterial.toLowerCase(),
      // series: alumSeries,
      // unit: accsUnit,
      timestamp: serverTimestamp(),
      initial: Number(alumPrice),
    });
    closeModal();
  };

  const handleEditAccs = async (e) => {
    e.preventDefault();

    const ref = doc(db, "accessories", selectedRow.id);

    await updateDoc(ref, {
      material: alumMaterial.toLowerCase(),
      // series: alumSeries,
      // unit: accsUnit,
      initial: Number(alumPrice),
    });
    closeModal();
  };

  const handleDeleteAlumProduct = async (product) =>
    await deleteDoc(doc(db, "aluminum", product.id));

  const handleDeleteAccs = async (product) => {
    await deleteDoc(doc(db, "accessories", product.id));
  };

  return (
    <PageLayout
      pageTitle="Dashboard > Products"
      absolutes={
        <>
          <AddGlassProductModal
            isOpen={isAddGlassModalOpen}
            closeModal={closeModal}
            onClick={handleAddGlassProduct}
          />
          <AddGlassVariantModal
            isOpen={isAddVariantModalOpen}
            closeModal={closeModal}
            onClick={handleAddGlassVariant}
          />
          <EditGlassProductModal
            isOpen={isEditGlassModalOpen}
            closeModal={closeModal}
            onClick={handleEditGlassProduct}
          />
          <AddAlumModal
            isOpen={isAddAlumModalOpen}
            closeModal={closeModal}
            onClick={handleAddAlumProduct}
          />
          <EditAlumModal
            isOpen={isEditAlumModalOpen}
            closeModal={closeModal}
            onClick={handleEditAlum}
          />
          <AddAccsModal
            isOpen={isAddAccsModalOpen}
            closeModal={closeModal}
            onClick={handleAddAlumAccs}
          />
          <EditAccsModal
            isOpen={isEditAccsModalOpen}
            closeModal={closeModal}
            onClick={handleEditAccs}
          />
        </>
      }
    >
      <TableLayout
        title="Glass Products"
        isHeaderPrimary={true}
        misc={<AddBtn onClick={openAddGlassModal} />}
        hasSearch
        searchPlaceholder="Search glass products by material or type"
        onSearchChange={(e) => setSearchGlassInput(e.target.value)}
      >
        <AppTable colNames={GLASS_MAIN_TABLE}>
          <Tbody className="font-light">
            {glassProducts
              ?.filter((val) => {
                if (searchGlassInput === "") return val;
                else if (
                  val.material
                    .toLowerCase()
                    .includes(searchGlassInput.toLowerCase()) ||
                  val.type
                    .toLowerCase()
                    .includes(searchGlassInput.toLowerCase())
                )
                  return val;
              })
              .map((product, i) => (
                <Tr
                  key={i}
                  className="hover:bg-slate-200"
                  // onClick={() => setSelectedRow(product)}
                >
                  <Td>{product.material}</Td>
                  <Td>{product.type}</Td>
                  <Td>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                      href={product.image}
                      target="_blank"
                    >
                      {product.material} {product.type} glass URL
                    </a>
                  </Td>
                  <Td>
                    <TdVisibility product={product} />
                  </Td>
                  <Td className="td-actions-container">
                    <TdActionsBtn
                      label="Add"
                      onClick={() => openAddVariantModal(product)}
                    />
                    <TdActionsBtn
                      label="Edit"
                      onClick={() => openEditGlassModal(product)}
                    />
                    <TdActionsBtn
                      label="Remove"
                      onClick={() => handleDeleteGlassProduct(product)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </AppTable>
      </TableLayout>

      <TableLayout title="Glass Variants" isHeaderPrimary={false}>
        <AppTable colNames={GLASS_VARIANTS_TABLE}>
          {glassProducts
            ?.filter((val) => {
              if (searchGlassInput === "") return val;
              else if (
                val.material
                  .toLowerCase()
                  .includes(searchGlassInput.toLowerCase()) ||
                val.type.toLowerCase().includes(searchGlassInput.toLowerCase())
              )
                return val;
            })
            .map((product, i) => (
              <Tbody key={i} className="font-light">
                {product.variants.map((variant, i) => (
                  <Tr key={i} className="hover:bg-slate-200">
                    <Td>
                      {product.material} - {product.type}
                    </Td>
                    <Td>{variant.thickness}</Td>
                    {/* <Td>
                    {variant.height} x {variant.width}
                  </Td> */}
                    <Td>{variant.initial} per sq/ft</Td>
                    {/* <Td>
                    {variant.height * variant.width * variant.initial} per sq/ft
                  </Td> */}
                    <Td>
                      <TdActionsBtn
                        label="Remove"
                        onClick={() =>
                          handleDeleteGlassVariant(product, variant)
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            ))}
        </AppTable>
      </TableLayout>

      <TableLayout
        title="Aluminum Products"
        isHeaderPrimary={true}
        misc={<AddBtn onClick={openAddAlumModal} />}
        hasSearch
        searchPlaceholder="Search aluminum products by material or type"
        onSearchChange={(e) => setSearchAlumInput(e.target.value)}
      >
        <AppTable colNames={ALUM.MAIN_TABLE}>
          <Tbody className="font-light">
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
              .map((product) => (
                <Tr key={product.id} className="hover:bg-slate-200">
                  <Td>{product.material}</Td>
                  <Td>{product.type}</Td>
                  <Td>{product.price} per 21 ft</Td>
                  <Td>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                      href={product.image}
                      target="_blank"
                    >
                      {product.material} URL
                    </a>
                  </Td>
                  <Td>
                    <TdVisibility product={product} />
                  </Td>
                  <Td className="td-actions-container">
                    <TdActionsBtn
                      label="Edit"
                      onClick={() => openEditAlumModal(product)}
                    />
                    <TdActionsBtn
                      label="Remove"
                      onClick={() => handleDeleteAlumProduct(product)}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </AppTable>
      </TableLayout>

      <TableLayout
        title="Aluminum Variants"
        isHeaderPrimary={false}
        misc={<AddBtn onClick={openAddAccsModal} />}
      >
        <AppTable colNames={ALUM.ACCS_TABLE}>
          <Tbody className="font-light">
            {alumAccs?.map((product) => (
              <Tr key={product.id} className="hover:bg-slate-200">
                <Td>{product.material}</Td>
                <Td>{product.initial}</Td>
                <Td className="td-actions-container">
                  <TdActionsBtn
                    label="Edit"
                    onClick={() => openEditAccsModal(product)}
                  />
                  <TdActionsBtn
                    label="Remove"
                    onClick={() => handleDeleteAccs(product)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </AppTable>
      </TableLayout>
    </PageLayout>
  );
};

export default withPrivate(Products);
