import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/carousel";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Carousels() {
  return (
    <div className="flex flex-col">
      {carouselData.map((data, index) => (
        <SingleCarouselRow
          key={index}
          images={data}
          className={Boolean(index % 2) ? "bg-[#f6f3f1]" : ""}
        />
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
      <Carousel
        images={images}
        className={cn(
          "w-full mx-auto max-w-7xl px-6 relative flex items-center",
          className
        )}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} data-index={index}>
              <div className="relative w-full  aspect-[3/2] sm:aspect-[7/4] lg:aspect-[50/21]">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-left mt-4 text-lg text-[#999999] ">
                {image.description}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Prev button */}
        {current > 0 && false && (
          <button
            onClick={prevSlide}
            className="absolute -left-10 cursor-pointer"
          >
            <ChevronLeft
              size={75}
              strokeWidth={1.5}
              className="text-gray-600 hover:text-black transition"
            />
          </button>
        )}

        {/* Next button */}
        {current < images.length - 1 && false && (
          <button
            onClick={nextSlide}
            className="absolute -right-10 cursor-pointer"
          >
            <ChevronRight
              size={75}
              strokeWidth={1.5}
              className="text-gray-600 hover:text-black transition"
            />
          </button>
        )}
      </Carousel>
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
      src: "https://picsum.photos/800/450?random=1",
      alt: "Random Image 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    },
    {
      src: "https://picsum.photos/800/450?random=2",
      alt: "Random Image 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      src: "https://picsum.photos/800/450?random=3",
      alt: "Random Image 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    },
    {
      src: "https://picsum.photos/800/450?random=4",
      alt: "Random Image 4",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    },
    {
      src: "https://picsum.photos/800/450?random=5",
      alt: "Random Image 5",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
  ],
  [
    {
      src: "https://picsum.photos/800/450?random=1",
      alt: "Random Image 1",
      description: `We develop digital experiences that make sense of complex information. Our approach to UX is defined by clear usability, empowering a diverse audience. By employing a cross-platform approach across various devices, we capture larger markets for higher visibility.
Our digital design work encompasses everything from UI, wearables and apps, to websites, animations, and e-commerce platforms. With in-house design, development, programming, artworking, and UX capabilities, we can deliver your entire project from concept to market.`,
    },
    {
      src: "https://picsum.photos/800/450?random=2",
      alt: "Random Image 2",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    },
    {
      src: "https://picsum.photos/800/450?random=3",
      alt: "Random Image 3",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
    },
    {
      src: "https://picsum.photos/800/450?random=4",
      alt: "Random Image 4",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    },
    {
      src: "https://picsum.photos/800/450?random=5",
      alt: "Random Image 5",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    },
  ],
];
