import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  const nextSlide = () => {
    if (current < images.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <main
      className={cn(
        "flex flex-col items-center justify-between py-16",
        className
      )}
    >
      <div className="relative flex items-center w-screen left-1/2 right-1/2 -translate-x-1/2 max-w-none px-0">
        {/* Prev button */}
        <button
          onClick={prevSlide}
          className={cn(
            "absolute max-sm:bottom-0 max-sm:left-72 z-10 transition-opacity", // SM (and mobile): bottom-right, next to the other arrow
            "left-36", // MD and up: reverts to original bottom-left
            current === 0 ? "opacity-0 pointer-events-none" : "opacity-100",
            "group"
          )}
          aria-label="Previous"
          tabIndex={current === 0 ? -1 : 0}
        >
          <ChevronLeft
            size={96}
            strokeWidth={1.5}
            className="text-gray-400 md:block hidden group-hover:text-black transition-colors"
          />
          <ChevronLeft
            size={48}
            strokeWidth={1.5}
            className="text-gray-400 block md:hidden group-hover:text-black transition-colors"
          />
        </button>

        {/* Carousel with sliding animation */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              width: `${images.length * 100}vw`,
              transform: `translateX(-${current * 100}vw)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: "100vw" }}
              >
                <div
                  className="relative w-[67%] max-sm:hidden mx-auto "
                  style={{ aspectRatio: "800/340" }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === current}
                  />
                </div>
                <div
                  className="relative sm:hidden max-sm-w-full w-[85%] mx-auto "
                  style={{ aspectRatio: "800/600" }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={index === current}
                  />
                </div>
                <p className="text-left mt-4 text-sm sm:text-base max-sm:pb-24 md:text-lg  text-[#999999] w-[85%] sm:max-w-4xl mx-auto sm:px-6">
                  {image.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className={cn(
            "absolute max-sm:bottom-0 max-sm:right-4  z-10 transition-opacity", // SM (and mobile): bottom-right
            "right-36", // MD and up: reverts to original middle-right
            current === images.length - 1
              ? "opacity-0 pointer-events-none"
              : "opacity-100",
            "group"
          )}
          aria-label="Next"
          tabIndex={current === images.length - 1 ? -1 : 0}
        >
          <ChevronRight
            size={96}
            strokeWidth={1.5}
            className="text-gray-400 md:block hidden group-hover:text-black transition-colors"
          />
          <ChevronRight
            size={48}
            strokeWidth={1.5}
            className="text-gray-400 block md:hidden group-hover:text-black transition-colors"
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/03/gesha-expertise-1920x806.jpg.webp",
      alt: "Random Image 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
  ],
  [
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2022/12/Engineering-Hero-1920x803.jpg.webp",
      alt: "Random Image 1",
      description: `We develop digital experiences that make sense of complex information. Our approach to UX is defined by clear usability, empowering a diverse audience. By employing a cross-platform approach across various devices, we capture larger markets for higher visibility.
Our digital design work encompasses everything from UI, wearables and apps, to websites, animations, and e-commerce platforms. With in-house design, development, programming, artworking, and UX capabilities, we can deliver your entire project from concept to market.`,
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2022/12/viture_glasses_inside_3-1-1536x643.jpg.webp",
      alt: "Random Image 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
  ],
  [
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/02/ER-Branding-1536x643.jpg.webp",
      alt: "Random Image 1",
      description: `We develop digital experiences that make sense of complex information. Our approach to UX is defined by clear usability, empowering a diverse audience. By employing a cross-platform approach across various devices, we capture larger markets for higher visibility.
Our digital design work encompasses everything from UI, wearables and apps, to websites, animations, and e-commerce platforms. With in-house design, development, programming, artworking, and UX capabilities, we can deliver your entire project from concept to market.`,
    },
    {
      src: "https://cdn.layerdesign.com/wp-content/uploads/2023/03/Earth-Rated-Expertise-1536x643.jpg.webp",
      alt: "Random Image 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
  ],
];