// projects-data.ts

export type Section = {
  id: number;
  slug: string;       // used for tabs/anchors
  title: string;
  description: string;
  images?: string[];  // multiple images (preferred)
  image?: string;     // single image fallback
  imageAlt?: string;
};

export const sections: Section[] = [
  {
    id: 2,
    slug: "values",
    title: "Our Values",
    description:
      "It’s our mission to make the world a better place through design, and we approach our collaborations thoughtfully with a focus on strategic thinking, inclusivity, and sustainability. We nurture talent within the studio and choose to work with partners who share our values to pave the way for a positive tomorrow.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-02-2.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-01-2-1536x909.jpg.webp",
            "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-03-2-1536x909.jpg.webp",
    ],
    imageAlt: "Flat lay of materials and samples",
  },
  {
    id: 1,
    slug: "studio",
    title: "Our Studio",
    description:
      "The LAYER studio in East London is where we bring your ideas to life. We have a workshop equipped with 3D printers, laser cutters, industrial sewing machines and material libraries; dedicated zones for research and development; powerful technology that we use to create cutting-edge visuals; and collaborative spaces where we craft evocative design stories.",
     images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Studio-02.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2023/01/Studio-4.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Studio-03.jpg.webp",
    ],
    imageAlt: "Studio interior with display niches and chair",
  },
  {
    id: 3,
    slug: "process",
    title: "Our Team",
    description:
      "We are a team of industrial and digital designers, engineers, strategists, and branding specialists from around the world. We collaborate across disciplines to create holistic experiences. Fueled by our unique perspectives, we uncover new ways of looking at the world and discover behavioural insights that drive our human-centred approach.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Team-02.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Values-04-1.jpg.webp",
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Team-04.jpg.webp",
    ],
    imageAlt: "Hands prototyping with tools and materials",
  },
  {
    id: 4,
    slug: "materials",
    title: "Awards",
    description:
      "Our work in collaboration with our partners has been recognised by the world’s most prestigious awards bodies, across diverse categories ranging from sustainability to technology and workplace. These accolades have been instrumental in our partners’ growth and notoriety on a global stage.",
    images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Team-04.jpg.webp",
    ],
    imageAlt: "Shelves with materials and samples",
  },
  {
    id: 5,
    slug: "impact",
    title: "Founder",
    description:
      "Fathy Ahmed is the visionary founder and driving force behind Apex Innovation & Creations. With over 25 years of hands-on leadership in design, production, and business development, he established Apex as a platform to merge creativity, technology, and bold ideas into iconic products and projects. Under his leadership, Apex is shaping the future of innovation and building a global ecosystem of creators, partners, and investors.",
      images: [
      "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Our-Team-02.jpg.webp",
    ],
    imageAlt: "Calm space with natural light",
  },
];

// Optional: a nav order different from array order
export const navOrder = ["values", "studio", "process", "materials", "impact"];
