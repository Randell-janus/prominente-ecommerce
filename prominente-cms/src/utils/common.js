export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const GLASS_MAIN_TABLE = [
  "Material",
  "Type",
  "Image",
  "Visible",
  "Actions",
];
export const GLASS_VARIANTS_TABLE = [
  "Variant",
  "Thickness",
  // "Dimensions",
  "Unit Price",
  // "Price",
  "Actions",
];
export const GLASS_TYPES = [
  "clear",
  "smoke",
  "bronze",
  "mirror",
  "reflective",
  "blue",
];
export const GLASS_MATERIALS = ["ordinary", "tempered"];
export const GLASS_THICKNESS = ["1/8", "3/16", "1/4", "3/8", "1/2"];

export const ALUM = {
  MAIN_TABLE: ["Material", "Type", "Unit Price", "Image", "Visible", "Actions"],
  ACCS_TABLE: ["Variant", "Unit Price", "Actions"],
  TYPE: ["series798", "series38", "ED101", "ED102", "ED103"],
};

export const convToDate = (timestamp) => {
  return timestamp?.toDate().toDateString();
};

export const convToTime = (timestamp) => {
  return timestamp?.toDate().toLocaleTimeString([], {
    // year: "numeric",
    // month: "numeric",
    // day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

