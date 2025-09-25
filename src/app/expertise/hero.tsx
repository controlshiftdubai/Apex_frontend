"use client";

import ParallaxImage from "@/components/parallaxImageContainer";

export default function Hero() {
  return (
    <section>
      {/* Mobile (below md) */}
      <div className="md:hidden w-full">
        <ParallaxImage
          alt="Project hero (mobile)"
          src="https://cdn.layerdesign.com/wp-content/uploads/2023/03/Project-Mobile-1485x2048.jpg.webp"
          text="Our expertise combines strategy, design and engineering to deliver award-winning solutions."
          textClassName="font-normal"
          className="aspect-[3/4]"
          disableHoverEffect
        />
      </div>

      {/* Tablet + Desktop (md and up) */}
      <div className="max-md:hidden w-full">
        <ParallaxImage
          alt="Project hero (desktop/tablet)"
          src="https://cdn.layerdesign.com/wp-content/uploads/2023/03/Project_.jpg.webp"
          text="Our expertise combines strategy, design and engineering to deliver award-winning solutions."
          textClassName="font-normal"
          className="md:aspect-[5/2]"
          disableHoverEffect
        />
      </div>
    </section>
  );
}
