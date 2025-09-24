export type ShowcaseItem = {
  id: number;
  title: string;
  description: string;
  images: string[];
};


export const showCases: ShowcaseItem[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? "Refine" : "Refine",
    description:
      "Our industrial design and engineering teams collaborate to hone concepts into robust design solutions. We achieve this through rigorous iteration, physical and functional prototyping, 3D CAD development, and extensive testing. By refining form, function, and colour, material, finish, we create products that stand out in saturated markets. We also construct sophisticated test rigs and prototypes to perfect mechanisms that exceed user expectations.",
    images: [
      `https://cdn.layerdesign.com/wp-content/uploads/2022/12/Partner-02-scaled-1920x2454.jpg.webp`,
      `https://cdn.layerdesign.com/wp-content/uploads/2022/12/test-process-p2-scaled-1920x1280.jpg.webp`,
      `https://cdn.layerdesign.com/wp-content/uploads/2022/12/Partner-03.jpg.webp`,
    ],
  })
);
