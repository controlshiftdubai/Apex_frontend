"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const banners = [
  {
    id: 1,
    desktop:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-17T10%3A13%3A05.877Z-1.png",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A10%3A28.213Z-Frame%201000003798.png",
    title: "Product Innovation That Blends Design,",
    subtitle: "Technology, And Performance",
  },
  {
    id: 2,
    desktop:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-17T10%3A16%3A39.678Z-1.png",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A14%3A25.549Z-Group%2039.png",
    title: "Smart Engineering. Unmatched",
    subtitle: "Functionality. Unforgettable Impact",
  },
  {
    id: 3,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-17T10:14:43.871Z-2.png",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A14%3A58.632Z-Group%2040.png",
    title: "We Craft Brand Identities That",
    subtitle: "Stand Out, Resonate, And Last",
  },
  {
    id: 4,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-17T10:15:29.725Z-3.png",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A15%3A31.611Z-Group%2041.png",
    title: "We Craft Immersive Environments Where",
    subtitle: "Design, Technology, And Emotion Collide",
  },
];

export default function ExpertiseSection() {
  return <ScrollStickyCards banners={banners} />;
}

export type Banner = {
  id: string | number;
  title: string;
  subtitle?: string;
  desktop: string;
  mobile?: string;
  alt?: string;
};

type Props = {
  className?: string;
  banners: Banner[];
};

export function ScrollStickyCards({ className = "", banners }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setTriggerRef = (index: number) => (el: HTMLDivElement | null) => {
    triggerRefs.current[index] = el;
  };

  useEffect(() => {
    if (!banners || banners.length === 0) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // Adjusted margins for better detection
      threshold: [0.3, 0.5, 0.7], // Multiple thresholds for better detection
    };

    let mounted = true;
    const observer = new IntersectionObserver((entries) => {
      if (!mounted) return;

      let bestEntry: IntersectionObserverEntry | null = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });

      if (bestEntry) {
        const idx = Number(
          // @ts-ignore
          (bestEntry.target as HTMLElement).dataset?.index ?? 0
        );
        if (!Number.isNaN(idx) && idx !== activeIndex) {
          setActiveIndex(idx);
        }
      }

      if (entries.length > 0) {
        const firstEntry = entries.find((entry) => {
          const idx = Number(
            (entry.target as HTMLElement).dataset?.index ?? -1
          );
          return idx === 0;
        });

        if (firstEntry && firstEntry.isIntersecting && window.scrollY < 100) {
          setActiveIndex(0);
        }
      }
    }, options);

    triggerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, [banners, activeIndex]); // Added activeIndex to dependencies

  return (
    <section className={`relative w-full ${className}`}>
      {/* FULL SCREEN STICKY IMAGE */}
      <div className="sticky top-0 h-screen w-full z-0">
        <AnimatePresence>
          {banners.map((banner, idx) => {
            if (idx !== activeIndex) return null;
            return (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={banner.desktop}
                  alt={banner.alt ?? banner.title}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* TEXT BLOCKS */}
      <div className="relative -mt-[65vh] z-10 max-w-[1400px] px-4 md:px-10 mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            {banners.map((banner, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={banner.id}
                  data-index={idx}
                  ref={setTriggerRef(idx)}
                  className={cn(
                    "flex items-center",
                    idx != 0 ? "py-28 md:py-48" :"pb-28 md:pb-48"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-7xl"
                  >
                    <h2
                      className={`text-5xl md:text-6xl font-extrabold leading-tight mb-4 uppercase transition-all duration-500 ${
                        isActive
                          ? "text-white"
                          : "text-white/20"
                      }`}
                    >
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p
                        className={`text-lg font-bold uppercase transition-all duration-500 ${
                          isActive
                            ? "text-white"
                            : "text-white/20"
                        }`}
                      >
                        {banner.subtitle}
                      </p>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* empty right column to maintain grid layout */}
          <div className="col-span-1" />
        </div>
      </div>
    </section>
  );
}
