"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { sections, navOrder } from "./projects-data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Single section renderer with in-view slideshow + scroll-spy hook */
function SectionItem({
  slug,
  title,
  description,
  image,
  images,
  imageAlt,
  reverse,
  idx,
  onInViewChange,
}: {
  slug: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  imageAlt?: string;
  reverse: boolean;
  idx: number;
  onInViewChange: (slug: string, inView: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.6, once: false });

  useEffect(() => {
    onInViewChange(slug, inView);
  }, [slug, inView, onInViewChange]);

  const slides = useMemo(
    () => (images && images.length > 0 ? images : image ? [image] : []),
    [images, image]
  );
  const hasSlides = slides.length > 1;
  const [current, setCurrent] = useState(0);

  // Rotate only when this section is in view
  useEffect(() => {
    if (!hasSlides || !inView) return;
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % slides.length),
      1500 // 1.5s
    );
    return () => clearInterval(id);
  }, [hasSlides, inView, slides.length]);

  const currentSrc = slides[current] ?? "";

  return (
    <motion.article
      id={slug}
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start scroll-mt-28"
    >
      {/* Text (top-aligned, smaller) */}
      <div
        className={cn(
          "md:col-span-4 flex flex-col justify-start self-start gap-4 lg:gap-6",
          reverse ? "md:order-2" : "md:order-1"
        )}
      >
        <h2 className="text-2xl md:text-3xl lg:text-5xl text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-base md:text-lg leading-7 text-gray-500">
          {description}
        </p>
      </div>

      {/* Media (slideshow if multiple images) */}
      <div
        className={cn(
          "relative md:col-span-8 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px]",
          reverse ? "md:order-1" : "md:order-2"
        )}
      >
        <motion.div
          key={currentSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {currentSrc && (
            <Image
              src={currentSrc}
              alt={imageAlt || title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1220px) 66vw, 800px"
              priority={idx < 2}
            />
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function ProjectsShowcase() {
  // Build ordered list of sections (honor navOrder if provided)
  const items = useMemo(() => {
    if (navOrder && navOrder.length) {
      const map = new Map(sections.map((s) => [s.slug, s]));
      return navOrder
        .map((slug) => map.get(slug))
        .filter(Boolean) as typeof sections;
    }
    return sections;
  }, []);

  // Tabs: label from title (remove "Our ")
  const tabs = useMemo(
    () =>
      items.map((s) => ({
        key: s.slug,
        label: s.title.replace("Our ", ""),
      })),
    [items]
  );

  const [activeSlug, setActiveSlug] = useState(tabs[0]?.key ?? "");

  // Scroll to a section by slug
  const scrollTo = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Update active tab when a section enters view
  const handleInViewChange = useCallback((slug: string, inView: boolean) => {
    if (inView) setActiveSlug(slug);
  }, []);

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1330px] mx-auto px-6 lg:px-8">
        {/* Tabs — same visual style as your original */}
        <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => scrollTo(tab.key)}
              className={cn(
                "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
                activeSlug === tab.key
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* All sections on the page */}
        <div className="space-y-10 lg:space-y-24">
          {items.map((s, idx) => (
            <SectionItem
              key={s.id}
              slug={s.slug}
              title={s.title}
              description={s.description}
              image={s.image}
              images={s.images}
              imageAlt={s.imageAlt}
              reverse={idx % 2 === 1}
              idx={idx}
              onInViewChange={handleInViewChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
