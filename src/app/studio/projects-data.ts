// projects-data.ts

export type Project = {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  video?: string;
  description: string; // used by the new image+text layout
  ctaLabel?: string;
  ctaHref?: string;
};

// ---- Product ----
export const productProjects: Project[] = [
  {
    id: 101,
    title: "Stax",
    subTitle: "Ledger",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/LEDGER_PORTRAIT.mp4",
    image: "/fallbacks/go.jpg",
    description:
      "A compact device that balances daily utility with a simple, durable form. Designed to feel effortless in the hand and clear in use.",
    ctaLabel: "View Case Study",
  },
  {
    id: 102,
    title: "Halo Bike",
    subTitle: "SAGA",
    video: "https://cdn.layerdesign.com/wp-content/uploads/2023/01/SAGA.mp4",
    image: "/fallbacks/halo-bike.jpg",
    description:
      "Performance-first engineering with a softer, human touch. Materials chosen for longevity and a quiet, confident ride.",
  },
];

// ---- Brand ----
export const brandProjects: Project[] = [
  {
    id: 201,
    title: "Balance",
    subTitle: "Bang & Olufsen",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/BALANCE_Portrait.mp4",
    image: "/fallbacks/light-vision.jpg",
    description:
      "A calm identity system that scales across product, packaging, and retail. Clear rules, simple typography, generous space.",
  },
  {
    id: 202,
    title: "North Star",
    subTitle: "Concept Brand",
    image: "/fallbacks/calma.jpg",
    description:
      "A modern visual language focused on clarity and inclusivity. Premium without feeling distant, flexible across channels.",
  },
];

// ---- Digital ----
export const digitalProjects: Project[] = [
  {
    id: 301,
    title: "Lightvision",
    subTitle: "Resonate",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
    description:
      "An intuitive product site that puts content first. Fast, accessible, and designed to scale with new launches.",
  },
  {
    id: 302,
    title: "Viture One",
    subTitle: "Viture",
    video:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/08/VITURE_PORTRAIT.mp4",
    image: "/fallbacks/halo-bike.jpg",
    description:
      "A lightweight interface for a lightweight device. Motion, sound, and tactility support real tasks, not distract from them.",
  },
];

// ---- Furniture ----
export const furnitureProjects: Project[] = [
  {
    id: 401,
    title: "Calma Chair",
    subTitle: "Andreu World",
    image:
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/643-x-821px_0074_Calma-1.jpg.webp",
    description:
      "Warm materials, honest construction, and an inviting profile. Built for comfort today and repairability tomorrow.",
  },
  {
    id: 402,
    title: "Arc Bench",
    subTitle: "Studio Concept",
    image: "/fallbacks/calma.jpg",
    description:
      "Soft curves meet strong structure. Adapts from lobby to living room with finishes that wear in, not out.",
  },
];

// ---- Space ----
export const spaceProjects: Project[] = [
  {
    id: 501,
    title: "Our Values",
    subTitle: "Studio",
    image: "/fallbacks/light-vision.jpg",
    description:
      "It’s our mission to make the world a better place through design, and we approach our collaborations thoughtfully with a focus on strategic thinking, inclusivity, and sustainability. We nurture talent within the studio and choose to work with partners who share our values to pave the way for a positive tomorrow.",
  },
  {
    id: 502,
    title: "Our Studio",
    subTitle: "Workspace",
    image: "/fallbacks/go.jpg",
    description:
      "The LAYER studio in East London is where we bring your ideas to life. We have a workshop equipped with 3D printers, laser cutters, industrial sewing machines and material libraries; dedicated zones for research and development; powerful technology that we use to create cutting-edge visuals; and collaborative spaces where we craft evocative design stories.",
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
