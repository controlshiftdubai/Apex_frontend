export type ShowcaseItem = {
  id: number;
  title: string;
  description: string;
  images: string[];
};


export const showCases: ShowcaseItem[] = Array.from({ length: 12 }).map(
  (_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? "Urban Loft" : "Beach Villa",
    description:
      "Crisp layouts, fast-loading media, and a clean grid that scales from mobile to desktop without code tweaks.",
    images: [
      `https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop`,
      `https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop`,
      `https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop`,
    ],
  })
);
