"use client";

import ParallaxImage from "@/components/parallaxImageContainer";

export default function Hero() {
  return (
    <section>
      {/* Mobile (below md) */}
      <div className="md:hidden w-full">
        <ParallaxImage
          alt="Project hero (mobile)"
          src="https://cdn.layerdesign.com/wp-content/uploads/2023/01/Hero-2.jpg.webp"
          text="We create products, brands and services that evoke wonder and delight."
          textClassName="font-normal"
          className="aspect-[3/4]"
        />
      </div>

      {/* Tablet + Desktop (md and up) */}
      <div className="max-md:hidden w-full">
        <ParallaxImage
          alt="Project hero (desktop/tablet)"
          src="https://cdn.layerdesign.com/wp-content/uploads/2023/01/Hero-2.jpg.webp"
          text="We create products, brands and services that evoke wonder and delight."
          textClassName="font-normal"
          className="md:aspect-[5/2]"
        />
      </div>
    </section>
  );
}
