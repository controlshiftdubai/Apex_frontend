// src/components/ScrollStickyCards.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Banner = {
  id: string | number;
  title: string;
  subtitle?: string;
  desktop: string; // image url
  alt?: string;
};

type Props = {
  className?: string;
  banners: Banner[];
};

export default function ScrollStickyCards({ className = "", banners }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);

  if (!banners || banners.length === 0) return null;

  const setTriggerRef = (index: number) => (el: HTMLDivElement | null) => {
    triggerRefs.current[index] = el;
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: [0.6],
    };

    let mounted = true;
    const observer = new IntersectionObserver((entries) => {
      if (!mounted) return;

      let bestEntry: IntersectionObserverEntry | null = null;
      entries.forEach((entry) => {
        if (!bestEntry) bestEntry = entry;
        else if (entry.intersectionRatio > (bestEntry?.intersectionRatio ?? 0))
          bestEntry = entry;
      });
      //@ts-ignore
      if (bestEntry && bestEntry.isIntersecting) {
        const idx = Number(
          //@ts-ignore
          (bestEntry.target as HTMLElement).dataset?.index ?? activeIndex
        );
        if (!Number.isNaN(idx) && idx !== activeIndex) {
          setActiveIndex(idx);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banners]);

  return (
    <section className={`relative w-full ${className}`}>
      {/* FULL SCREEN STICKY IMAGE */}
      <div className="sticky top-0 h-screen w-full z-0">
        {banners.map((banner, idx) => {
          const distance = Math.abs(idx - activeIndex);
          if (distance > 1) return null; // lazy render active + neighbors
          const isActive = idx === activeIndex;

          return (
            <AnimatePresence key={banner.id}>
              <motion.img
                key={banner.id}
                src={banner.desktop}
                alt={banner.alt ?? banner.title}
                aria-hidden={!isActive}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </AnimatePresence>
          );
        })}
      </div>

      {/* TEXT BLOCKS */}
      <div className="relative z-10 max-w-[1400px] px-4 md:px-10 mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            {banners.map((banner, idx) => (
              <div
                key={banner.id}
                data-index={idx}
                ref={setTriggerRef(idx)}
                className="py-28 md:py-48 flex items-center"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="max-w-7xl"
                >
                  <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white uppercase">
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-lg text-white font-bold uppercase">
                      {banner.subtitle}
                    </p>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* empty right column to maintain grid layout */}
          <div className="col-span-1" />
        </div>
      </div>
    </section>
  );
}
