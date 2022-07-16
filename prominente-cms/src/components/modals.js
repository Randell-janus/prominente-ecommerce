import AppModal from "./reusable/AppModal";
import { useProducts } from "../utils/contexts/productsContext";
import {
  SelectBox,
  NumberInput,
  FileInput,
  RadioButton,
  TextInput,
} from "./reusable/inputs";
import {
  GLASS_TYPES,
  GLASS_MATERIALS,
  GLASS_THICKNESS,
  ALUM,
} from "../utils/common";

export const AddGlassProductModal = ({ isOpen, closeModal, onClick }) => {
  const {
    glassMaterial,
    setGlassMaterial,
    glassType,
    setGlassType,
    glassThickness,
    setGlassThickness,
    glassInitialPrice,
    setGlassInitialPrice,
    isProductVisible,
    setIsProductVisible,
  } = useProducts();

  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-sm sm:max-w-md"
      title="Add Product"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-6 sm:space-y-0">
        <div className="w-full space-y-3">
          <SelectBox
            label="Material"
            value={glassMaterial}
            onChange={(e) => setGlassMaterial(e.target.value)}
            options={GLASS_MATERIALS}
          />
          <SelectBox
            label="Type"
            value={glassType}
            onChange={(e) => setGlassType(e.target.value)}
            options={GLASS_TYPES}
          />
          <SelectBox
            label="Thickness"
            value={glassThickness}
            onChange={(e) => setGlassThickness(e.target.value)}
            options={GLASS_THICKNESS}
          />
          <NumberInput
            label="Initial (per sq/ft)"
            value={glassInitialPrice}
            onChange={(e) => setGlassInitialPrice(e.target.value)}
            min={25}
            max={2000}
          />
        </div>
      </div>
      <p className="font-semibold">Product Visibility</p>
      <div
        onChange={(e) => setIsProductVisible(e.target.value)}
        className="flex justify-evenly"
      >
        <RadioButton
          label="False"
          value={"false"}
          defaultChecked={isProductVisible}
          name="visibility"
        />
        <RadioButton
          label="True"
          value={"true"}
          defaultChecked={isProductVisible}
          name="visibility"
        />
      </div>
      <FileInput />
    </AppModal>
  );
};

export const AddGlassVariantModal = ({ isOpen, closeModal, onClick }) => {
  const {
    glassThickness,
    setGlassThickness,
    glassHeight,
    setGlassHeight,
    glassWidth,
    setGlassWidth,
    glassInitialPrice,
    setGlassInitialPrice,
  } = useProducts();

  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-md"
      title="Add Variant"
      onClick={onClick}
    >
      <SelectBox
        label="Thickness"
        value={glassThickness}
        onChange={(e) => setGlassThickness(e.target.value)}
        options={GLASS_THICKNESS}
      />
      <NumberInput
        label="Initial (per sq/ft)"
        value={glassInitialPrice}
        onChange={(e) => setGlassInitialPrice(e.target.value)}
        min={25}
        max={2000}
      />
    </AppModal>
  );
};

export const EditGlassProductModal = ({ isOpen, closeModal, onClick }) => {
  const { selectedRow, setIsProductVisible, setImageUpload } = useProducts();
  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-xl"
      title="Edit product"
      onClick={onClick}
    >
      <p className="font-semibold">Product Visibility</p>
      <div
        onChange={(e) => setIsProductVisible(e.target.value)}
        className="flex justify-evenly"
      >
        <RadioButton
          label="False"
          value={"false"}
          defaultChecked={selectedRow?.visible}
          name="visibility"
        />
        <RadioButton
          label="True"
          value={"true"}
          defaultChecked={selectedRow?.visible}
          name="visibility"
        />
      </div>

      <FileInput />
    </AppModal>
  );
};

export const AddAlumModal = ({ isOpen, closeModal, onClick }) => {
  const {
    alumMaterial,
    setAlumMaterial,
    alumSeries,
    setAlumSeries,
    alumPrice,
    setAlumPrice,
    isProductVisible,
    setIsProductVisible,
  } = useProducts();
  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-lg"
      title="Add product"
      onClick={onClick}
    >
      <TextInput
        label="Material"
        value={alumMaterial}
        onChange={(e) => setAlumMaterial(e.target.value)}
      />
      <SelectBox
        label="Type"
        value={alumSeries}
        onChange={(e) => setAlumSeries(e.target.value)}
        options={ALUM.TYPE}
      />
      <NumberInput
        label="Price"
        value={alumPrice}
        onChange={(e) => setAlumPrice(e.target.value)}
        min={0}
        max={1000}
      />
      <p className="font-semibold">Product Visibility</p>
      <div
        onChange={(e) => setIsProductVisible(e.target.value)}
        className="flex justify-evenly"
      >
        <RadioButton
          label="False"
          value={"false"}
          defaultChecked={isProductVisible}
          name="visibility"
        />
        <RadioButton
          label="True"
          value={"true"}
          defaultChecked={isProductVisible}
          name="visibility"
        />
      </div>
      <FileInput />
    </AppModal>
  );
};

export const EditAlumModal = ({ isOpen, closeModal, onClick }) => {
  const {
    alumMaterial,
    setAlumMaterial,
    setAlumSeries,
    alumPrice,
    alumSeries,
    setAlumPrice,
    setIsProductVisible,
    selectedRow,
  } = useProducts();
  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-lg"
      title="Edit product"
      onClick={onClick}
    >
      <TextInput
        label="Material"
        value={alumMaterial}
        onChange={(e) => setAlumMaterial(e.target.value)}
      />
      <SelectBox
        label="Type"
        value={alumSeries}
        onChange={(e) => setAlumSeries(e.target.value)}
        options={ALUM.TYPE}
      />
      <NumberInput
        label="Price"
        value={alumPrice}
        onChange={(e) => setAlumPrice(e.target.value)}
        min={0}
        max={1000}
      />
      <p className="font-semibold">Product Visibility</p>
      <div
        onChange={(e) => setIsProductVisible(e.target.value)}
        className="flex justify-evenly"
      >
        <RadioButton
          label="False"
          value={"false"}
          defaultChecked={selectedRow?.visible}
          name="visibility"
        />
        <RadioButton
          label="True"
          value={"true"}
          defaultChecked={selectedRow?.visible}
          name="visibility"
        />
      </div>
      <FileInput />
    </AppModal>
  );
};

export const AddAccsModal = ({ isOpen, closeModal, onClick }) => {
  const { setAlumMaterial, alumMaterial, alumPrice, setAlumPrice } =
    useProducts();
  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-lg"
      title="Add variant"
      onClick={onClick}
    >
      <TextInput
        label="Material"
        value={alumMaterial}
        onChange={(e) => setAlumMaterial(e.target.value)}
      />
      <NumberInput
        label="Price"
        value={alumPrice}
        onChange={(e) => setAlumPrice(e.target.value)}
        min={0}
        max={1000}
      />
    </AppModal>
  );
};

export const EditAccsModal = ({ isOpen, closeModal, onClick }) => {
  const { alumMaterial, setAlumMaterial, alumPrice, setAlumPrice } =
    useProducts();
  return (
    <AppModal
      isOpen={isOpen}
      closeModal={closeModal}
      className="max-w-xs sm:max-w-lg"
      title="Edit variant"
      onClick={onClick}
    >
      <TextInput
        label="Material"
        value={alumMaterial}
        onChange={(e) => setAlumMaterial(e.target.value)}
      />
      <NumberInput
        label="Price"
        value={alumPrice}
        onChange={(e) => setAlumPrice(e.target.value)}
        min={0}
        max={1000}
      />
    </AppModal>
  );
};
