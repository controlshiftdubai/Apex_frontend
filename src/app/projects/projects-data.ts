// projects-data.ts

export type Project = {
  id: number;
  title: string;
  video?: string;
  image: string;
};

// ---- Nike ----
export const nikeProjects: Project[] = [
  {
    id: 7,
    title: "Go",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/LEDGER_PORTRAIT.mp4",
    image: "/fallbacks/go.jpg",
  },
];

// ---- Lara (example: Resonate / Light Vision) ----
export const laraProjects: Project[] = [
  {
    id: 1,
    title: "Light Vision",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/BALANCE_Portrait.mp4",
    image: "/fallbacks/light-vision.jpg",
  },
];

// ---- Viture ----
export const vitureProjects: Project[] = [
  {
    id: 2,
    title: "Speaker System",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  },
  {
    id: 3,
    title: "Halo Bike",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/VITURE_PORTRAIT.mp4",
    image: "/fallbacks/halo-bike.jpg",
  },
];

// ---- Andreau World ----
export const andreauWorldProjects: Project[] = [
  {
    id: 4,
    title: "Calma",
    video: "https://cdn.layerdesign.com/wp-content/uploads/2023/01/SAGA.mp4",
    image: "/fallbacks/calma.jpg",
  },
];

// ---- Bang & Olufsen ----
export const bangOlufsenProjects: Project[] = [
  {
    id: 5,
    title: "Emerge",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/643-x-821px_0074_Calma-1.jpg.webp",
  },
];

// ---- Ledger ----
export const ledgerProjects: Project[] = [
  {
    id: 6,
    title: "Ledger",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/EMERGE_PORTRAIT-1.mp4",
    image: "/fallbacks/ledger.jpg",
  },
];

// ---- Deutsche Telekom ----
export const deutscheTelekomProjects: Project[] = [
  {
    id: 8,
    title: "Connectivity",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/GO_PORTRAIT.mp4",
    image: "/fallbacks/connectivity.jpg",
  },
  {
    id: 9,
    title: "Connectivity 2",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/DT-FEATURED.jpg.webp",
  },
];

// ---- Collect all ----
export const allProjects: Project[] = [
  ...nikeProjects,
  ...laraProjects,
  ...vitureProjects,
  ...andreauWorldProjects,
  ...bangOlufsenProjects,
  ...ledgerProjects,
  ...deutscheTelekomProjects,
];

// ---- Tabs ----
export const tabs = [
  { key: "all", label: "All", data: allProjects },
  { key: "nike", label: "Nike", data: nikeProjects },
  { key: "lara", label: "Lara", data: laraProjects },
  { key: "viture", label: "Viture", data: vitureProjects },
  { key: "andreauWorld", label: "Andreau World", data: andreauWorldProjects },
  { key: "bangOlufsen", label: "Bang & Olufsen", data: bangOlufsenProjects },
  { key: "ledger", label: "Ledger", data: ledgerProjects },
  { key: "deutscheTelekom", label: "Deutsche Telekom", data: deutscheTelekomProjects },
];
