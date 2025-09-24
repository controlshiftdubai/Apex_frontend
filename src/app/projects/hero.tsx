"use client";

import ParallaxImage from "@/components/parallaxImageContainer";

export default function ProjectHero() {
  return (
    <section>
      <ParallaxImage
        alt=""
        src="https://cdn.layerdesign.com/wp-content/uploads/2022/08/DT-FEATURED.jpg.webp"
        text="We create products, brands and services that evoke wonder and delight."
        textClassName="font-normal"
        className="md:aspect-[5/2]"
      />
    </section>
  );
}
