"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:38:40.984Z-step11%20-%20Edited.png",
    mobile:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:50:31.977Z-mv1%20-%20Edited.png",
    title: "Product Innovation That Blends Design,",
    subtitle: "Technology, And Performance",
    className: "object-[77%]",
  },
  {
    id: 2,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:40:25.124Z-step222%20-%20Edited.png",
    mobile:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:51:07.981Z-mv22%20-%20Edited.png",
    title: "Smart Engineering. Unmatched",
    subtitle: "Functionality. Unforgettable Impact",
    className: "",
  },
  {
    id: 3,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:41:27.779Z-step33%20-%20Edited.png",
    mobile:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:51:44.667Z-mv3%20-%20Edited.png",
    title: "We Craft Brand Identities That",
    subtitle: "Stand Out, Resonate, And Last",
    className: "object-[90%]",
  },
  {
    id: 4,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-18T10:42:03.398Z-step55%20-%20Edited.png",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A15%3A31.611Z-Group%2041.png",
    title: "We Craft Immersive Environments Where",
    subtitle: "Design, Technology, And Emotion Collide",
    className: "",
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
  className: string;
};

type Props = {
  className?: string;
  banners: Banner[];
};

export function ScrollStickyCards({ className = "", banners }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
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
    <section ref={sectionRef} className={`relative w-full ${className}`}>
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
                  className={cn("object-cover", banner.className)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Position the link inside the sticky container so it remains visible only during this section */}
        <div className="absolute top-[85%] max-sm:hidden right-24 md:right-[15%] text-center z-20">
          <Link href="/projects">
            <p className="link-highlight  link-highlight-purple relative inline-block text-[26px] font-medium text-white px-2">
              Explore Our Expertise
            </p>
          </Link>
        </div>
      </div>

      {/* TEXT BLOCKS */}
      <div className="relative z-99 -mt-[85vh] z-10 max-w-[1500px] px-4 md:px-10 mx-auto overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-6xl font-medium text-white text-center"
        >
          Our Expertise
        </motion.h1>

      
          <div className="max-w-3xl md:ml-24">
            {banners.map((banner, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={banner.id}
                  data-index={idx}
                  ref={setTriggerRef(idx)}
                  className={cn(
                    "relative flex items-center",
                    idx != 0 ? "py-28 md:py-48" : "pb-28 md:pb-48"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-8xl mt-[18rem]"
                  >
                    <h2
                      className={`text-xl md:text-5xl font-light leading-tight mb-4 transition-all duration-500 ${
                        isActive ? "text-white" : "text-white/20"
                      }`}
                    >
                      {banner.title}
                    </h2>
                    {banner.subtitle && (
                      <p
                        className={`text-2xl font-light transition-all duration-500 ${
                          isActive ? "text-white" : "text-white/20"
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
       
      </div>
    </section>
  );
}
