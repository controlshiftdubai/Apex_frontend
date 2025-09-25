"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CollabAndTestimonials() {
  return (
    <section className="bg-[#f6f3f1] w-full">
      <div className="mx-auto max-w-7xl">
        <Collaboration />
        <Testimonials />
      </div>
    </section>
  );
}

const images = [
  "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
  "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
];

function Collaboration() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);

      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <Image
          key={currentImage}
          src={images[currentImage]}
          alt="Collaboration Image"
          width={1331}
          height={821}
          sizes="100vw"
          className={cn(
            "w-full h-auto aspect-[63/37] object-cover rounded-lg transition-opacity duration-500",
            transitioning ? "opacity-50" : "opacity-100"
          )}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 bg-blue-500 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
        <p className="text-gray-100 leading-relaxed">
          We collaborate with the world's leading visionaries, from rapidly
          scaling start-ups and passionate entrepreneurs, to Fortune 500
          companies seeking market transformation and new audiences. Together,
          we can redefine the way we live, travel, work, and communicate now and
          in the future.
        </p>
      </div>
    </div>
  );
}

function Testimonials() {
  return <div>Testimonials</div>;
}
