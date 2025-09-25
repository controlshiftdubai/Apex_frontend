"use client";

import ParallaxImage from "@/components/parallaxImageContainer";

export default function Hero() {
  return (
    <section>
      {/* Mobile (below md) */}
      <ParallaxImage
        alt="Project hero (mobile)"
        src="https://cdn.layerdesign.com/wp-content/uploads/2023/03/Impact-Mobile-1485x2048.jpg.webp"
        text="We collaborate internationally from our inspiring London based studio.
"
        textClassName="font-normal"
        className="block md:hidden aspect-[3/4]" // mobile-only
      />

      {/* Tablet + Desktop (md and up) */}
      <ParallaxImage
        alt="Project hero (desktop/tablet)"
        src="https://cdn.layerdesign.com/wp-content/uploads/2023/02/Projects-Banner-Desktop.jpg.webp"
        text="We collaborate internationally from our inspiring London based studio.
"
        textClassName="font-normal"
        className="hidden md:block md:aspect-[5/2]" // tablet/desktop
      />
    </section>
  );
}
