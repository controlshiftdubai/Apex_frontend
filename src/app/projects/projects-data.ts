// projects-data.ts

export type Project = {
  id: number;
  title: string;
  subTitle: string;
  video?: string;
  image: string;
};

// ---- Nike ----
export const productProjects: Project[] = [
  {
    id: 7,
    title: "Stax",
    subTitle: "Ledger",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/LEDGER_PORTRAIT.mp4",
    image: "/fallbacks/go.jpg",
  },
];

// ---- Lara (example: Resonate / Light Vision) ----
export const brandProjects: Project[] = [
  {
    id: 1,
    title: "Balance",
    subTitle: "Bang & Olufsen",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/BALANCE_Portrait.mp4",
    image: "/fallbacks/light-vision.jpg",
  },
];

// ---- Viture ----
export const digitalProjects: Project[] = [
  {
    id: 2,
    title: "Lightvision",
    subTitle: "Resonate",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  },
  {
    id: 3,
    title: "Viture One",
    subTitle: "Viture",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/VITURE_PORTRAIT.mp4",
    image: "/fallbacks/halo-bike.jpg",
  },
];

// ---- Andreau World ----
export const furnitureProjects: Project[] = [
  {
    id: 4,
    title: "HoloBike",
    subTitle: "SAGA",
    video: "https://cdn.layerdesign.com/wp-content/uploads/2023/01/SAGA.mp4",
    image: "/fallbacks/calma.jpg",
  },
];

// ---- Bang & Olufsen ----
export const spaceProjects: Project[] = [
  {
    id: 5,
    title: "Calma",
    subTitle: "Andreu World",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/643-x-821px_0074_Calma-1.jpg.webp",
  },
];



// ---- Collect all ----
export const allProjects: Project[] = [
  ...productProjects,
  ...brandProjects,
  ...digitalProjects,
  ...furnitureProjects,
  ...spaceProjects,

];

// ---- Tabs ----
export const tabs = [
  { key: "all", label: "All", data: allProjects },
  { key: "product", label: "Product", data: productProjects },
  { key: "brand", label: "Brand", data: brandProjects },
  { key: "digital", label: "Digital", data: digitalProjects },
  { key: "furniture", label: "Furniture", data: furnitureProjects },
  { key: "space", label: "Space", data: spaceProjects },
];
