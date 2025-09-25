// showcase-data.ts

export type ShowcaseItem = {
  id: number;
  title: string;
  description: string;
  images: string[]; // [big, small1, small2]
};

export const showCases: ShowcaseItem[] = [
  {
    id: 1,
    title: "Partner",
    description:
      "We believe lasting relationships are built on a solid foundation of trust, transparency, and open exchange. The LAYER team is an invaluable extension of your team from the outset. Together, through structured workshops and informal conversations, we will develop the potential of your vision and discover powerful possibilities in the market to drive innovation and success.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Partner-02-scaled.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/test-process-p2-scaled.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Partner-03.jpg.webp",
    ],
  },
  {
    id: 2,
    title: "Immerse",
    description:
      "We immerse ourselves in the world of your users and ask the right questions to uncover valuable observations that enhance user engagement. We achieve this through in-depth, multilayered research, ranging from ethnographic workshops and user interviews to analysing global micro and macro trends. By discovering and defining relevant human behaviours, we create captivating concepts for products and experiences.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Test-Immerse-01-scaled.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Immerse-02.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Layer-1-scaled.jpg.webp",
    ],
  },
  {
    id: 3,
    title: "Create",
    description:
      "Our team defines a compelling vision for your project that celebrates your brand’s values whilst inspiring and surprising your users. Our concept exploration covers a range of opportunities and we craft a detailed narrative around each concept that responds to market desires. We bring the concepts to life through cutting-edge visualisations, including evocative sketches, photorealistic CAD, and maquette models.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Create-01-scaled.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Create-02.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Refine-03-scaled.jpg.webp",
    ],
  },
  {
    id: 4,
    title: "Refine",
    description:
      "Our industrial design and engineering teams collaborate to hone concepts into robust design solutions. We achieve this through rigorous iteration, physical and functional prototyping, 3D CAD development, and extensive testing. By refining form, function, and colour, material, finish, we create products that stand out in saturated markets. We also construct sophisticated test rigs and prototypes to perfect mechanisms that exceed user expectations.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/layer_process_05_01.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2023/03/gesha-x-ray-1.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/layer_process_05_02.jpg.webp",
    ],
  },
   {
    id: 5,
    title: "Deliver",
    description:
      "We have a proven record of bringing commercially successful products to market. We collaborate with leading manufacturers to ensure the highest standards, and we make complicated processes straightforward. We support Design for Manufacture workstreams that cover everything from data pack creation to managing the entire production process. We also create sophisticated models to showcase your vision for investors, exhibitions, and market research.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/layer_process_06_01.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/layer_process_06_02.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/11/layer_process_06_03.jpg.webp",
    ],
  },
    {
    id: 6,
    title: "Launch",
    description:
      "We create desirable products people want to talk about, and our unrivalled launch strategies ensure maximum exposure for your vision. Our thoughtful communication strategies – including press releases, art direction, visual assets, and videos – are created in collaboration with world-leading photographers, videographers, and fabricators. We also craft immersive launch installations",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-02-2.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-01-2-1536x909.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-03-2-1536x909.jpg.webp",
    ],
  },
];
