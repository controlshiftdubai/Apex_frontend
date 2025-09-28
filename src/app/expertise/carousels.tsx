import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

const sectionIds = ["Impact", "Collaboration", "Press"];

export default function Carousels() {
  return (
    <div className="flex flex-col">
      {carouselData.map((data, index) => (
        <div key={index} id={sectionIds[index]}>
          <SingleCarouselRow
            images={data}
            className={Boolean(index % 2) ? "bg-[#f6f3f1]" : ""}
          />
        </div>
      ))}
    </div>
  );
}

function SingleCarouselRow({
  images,
  className,
}: {
  images: ImageData[];
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    if (current < images.length - 1) setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.touches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // swipe left
        nextSlide();
      } else {
        // swipe right
        prevSlide();
      }
      touchStartX.current = null; // reset after swipe
    }
  };

  return (
    <main
      className={cn(
        "flex flex-col items-center justify-between py-16",
        className
      )}
    >
      <div
        className="relative flex items-center w-full md:w-screen md:left-1/2 md:right-1/2 md:-translate-x-1/2 max-w-none px-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Prev button — hidden on mobile */}
        <button
          onClick={prevSlide}
          className={cn(
            "absolute z-10 transition-opacity group hidden md:block",
            "left-4 md:left-36",
            current === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          aria-label="Previous"
          tabIndex={current === 0 ? -1 : 0}
        >
          <ChevronLeft
            size={96}
            strokeWidth={1.5}
            className="text-gray-400 group-hover:text-black transition-colors"
          />
        </button>

        {/* Track */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${images.length * 100}%`,
              transform: `translateX(-${(current * 100) / images.length}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: `${100 / images.length}%` }}
              >
                <div
                  className="relative w-[92%] sm:w-[85%] md:w-full max-w-5xl mx-auto"
                  style={{ aspectRatio: "800/340" }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 85vw, 1024px"
                    priority={index === current}
                  />
                </div>

                <div className="w-[92%] sm:w-[85%] md:w-full max-w-5xl mx-auto">
                  <p className="text-left mt-4 text-base sm:text-lg text-[#999999] leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next button — hidden on mobile */}
        <button
          onClick={nextSlide}
          className={cn(
            "absolute z-10 transition-opacity group hidden md:block",
            "right-4 md:right-40",
            current === images.length - 1
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          )}
          aria-label="Next"
          tabIndex={current === images.length - 1 ? -1 : 0}
        >
          <ChevronRight
            size={96}
            strokeWidth={1.5}
            className="text-gray-400 group-hover:text-black transition-colors"
          />
        </button>
      </div>
    </main>
  );
}

export type ImageData = {
  src: string;
  alt: string;
  description: string;
};

const carouselData: ImageData[][] = [
  [
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Industrial-Design-Hero-2-1536x643.jpg.webp",
      alt: "Random Image 1",
      description:
        "Our product and engineering teams collaborate to design, test, and develop clever, cost-effective components that combine functional excellence with aesthetic appeal. This technical robustness ensures aspirational concepts can be executed with ease.",
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/03/gesha-expertise-1920x806.jpg.webp",
      alt: "Random Image 2",
      description:
        "We are world-class storytellers dedicated to crafting compelling narratives. We create unrivalled launch strategies and produce captivating content that communicates your vision, inspires your consumers, and maximises your exposure.",
    },
  ],
  [
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Engineering-Hero-1920x803.jpg.webp",
      alt: "Random Image 1",
      description:
        "Our product and engineering teams collaborate to design, test, and develop clever, cost-effective components that combine functional excellence with aesthetic appeal. This technical robustness ensures aspirational concepts can be executed with ease.",
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2022/12/viture_glasses_inside_3-1-1536x643.jpg.webp",
      alt: "Random Image 2",
      description:
        "We have a deep understanding of complex engineering systems, both mechanical and electrical. With this knowledge, we have the capability to manage the design for manufacture process and source production facilities for projects of all sizes.",
    },
  ],
  [
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/02/ER-Branding-1536x643.jpg.webp",
      alt: "Random Image 1",
      description:
        "Our strategic approach is inspired by the pursuit of the ‘why’ and uncovers the values that drive your brand. Based on these insights, we craft thoughtful new identities and reimagine well-loved brands. By developing the identity, product, and packaging simultaneously, we create consistency and differentiation in saturated markets.",
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/03/Earth-Rated-Expertise-1536x643.jpg.webp",
      alt: "Random Image 2",
      description:
        "At LAYER, we go beyond visual and physical brand articulation, giving you the tools you need to communicate effectively to your audience. Our branding team works with you to develop sophisticated tone-of-voice guides that equip you to write powerful copy.",
    },
  ],
];
