"use client";

import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";
import { cn } from "@/lib/utils";
import ParallaxImage from "@/components/parallaxImageContainer";
import { scrambleData, ScrambleDataType, navOrder } from "./scramble-data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Pastel palette (same order as before) */
const TITLE_BG_COLORS = ["#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
/** ~20% alpha helper for subtle tints */
const tint = (hex: string, alphaHex = "33") => `${hex}${alphaHex}`;

/** Simple slugify so sections have stable ids */
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ScrambleSection() {
  // Build items with slugs derived from headings
  const items = useMemo(() => {
    return scrambleData.map((d, i) => ({
      ...d,
      slug: slugify(d.heading || `section-${i + 1}`),
    }));
  }, []);

  // Tabs now come from navOrder (NOT from headings)
  // We map tabs -> section indices (0..items.length-1). Extra tabs are ignored; extra sections are allowed.
  const tabDefs = useMemo(
    () =>
      navOrder
        .slice(0, items.length)
        .map((label, i) => ({ key: `tab-${i}`, label, targetIndex: i })),
    [items.length]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Refs to each section for scroll & intersection
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  sectionRefs.current = items.map((_, i) => sectionRefs.current[i] ?? null);

  const scrollToIndex = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll spy: pick the section whose midpoint is closest to viewport center
  const onScrollSpy = useCallback(() => {
    const centerY = window.scrollY + window.innerHeight / 2;
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mid = window.scrollY + rect.top + rect.height / 2;
      const dist = Math.abs(centerY - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    setActiveIndex(bestIdx);
  }, []);

  useEffect(() => {
    onScrollSpy(); // initialize
    const onScroll = () => onScrollSpy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScrollSpy);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScrollSpy);
    };
  }, [onScrollSpy]);

  return (
    <div className="px-6 w-full">
      <div className="max-w-[1200px] mx-auto py-5">
        {/* Tabs — from navOrder, pastel active tint */}
        <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-8 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-50">
          {tabDefs.map((tab, i) => {
            const isActive = activeIndex === tab.targetIndex;
            return (
              <button
                key={tab.key}
                onClick={() => scrollToIndex(tab.targetIndex)}
                className={cn(
                  "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                )}
                style={
                  isActive
                    ? { backgroundColor: tint(TITLE_BG_COLORS[i % TITLE_BG_COLORS.length]) }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sections */}
        <div className="grid md:gap-28 gap-12">
          {items.map((d, i) => (
            <Scramble
              key={d.slug}
              data={d}
              idx={i}
              refFn={(el) => (sectionRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Scramble({
  data,
  idx,
  refFn,
}: {
  data: ScrambleDataType & { slug?: string };
  idx: number;
  refFn: (el: HTMLElement | null) => void;
}) {
  const stripeColor = TITLE_BG_COLORS[idx % TITLE_BG_COLORS.length];
  const flag = Boolean(idx % 2);

  return (
    <section
      id={data.slug}
      ref={refFn}
      className="flex flex-col gap-8 scroll-mt-28"
    >
      {/* Row 1: Text + Image (alternate left/right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image */}
        <div
          className={cn(
            "w-full",
            flag ? "md:order-1 md:col-span-2" : "md:order-2 md:col-span-2",
            "order-1 col-span-1"
          )}
        >
          <ParallaxImage
            alt={data.heading || "image"}
            src={data.imageUrl}
            className="object-cover w-full h-full aspect-[4/3] md:aspect-[7/3]"
            text=""
            disableHoverEffect
            strength={90}
          />
        </div>

        {/* Heading + Subheading with colored stripe behind title */}
        <div
          className={cn(
            "flex flex-col justify-end",
            "order-2",
            flag
              ? "md:items-end md:text-right md:order-2"
              : "md:items-start md:text-left md:order-1"
          )}
        >
          <h2 className="text-6xl md:text-[106px] md:leading-[1] font-medium text-neutral-900">
            <span className="relative inline-block align-baseline">
              <span className="relative z-10 px-0.5">{data.heading}</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-2 h-4 rounded-md"
                style={{ backgroundColor: stripeColor }}
              />
            </span>
          </h2>

          <p className="text-2xl md:text-[45px] md:leading-10 mt-2 text-neutral-900">
            {data.subHeading}
          </p>
        </div>
      </div>

      {/* Row 2: Description + CTA with faint matching tint */}
      <div
        className={cn(
          "items-center",
          "flex flex-col py-2",
          flag ? "md:items-end md:text-right" : "md:items-start md:text-left"
        )}
      >
        <p className="text-[#999999] max-w-[920px] md:text-lg mb-6 leading-tight">
          {data.description}
        </p>

        <div className={cn(flag ? "pr-8" : "pl-8")}>
          <AnimateOnViewOnce delay={300} className="text-nowrap cursor-pointer">
            <span
              className="relative inline-block text-lg md:text-2xl text-black px-2 font-normal"
              style={{
                backgroundImage: `linear-gradient(to top, ${tint(
                  stripeColor
                )} 0%, ${tint(stripeColor)} 55%, transparent 55%)`,
                borderRadius: "6px",
              }}
            >
              {data.buttonText}
            </span>
          </AnimateOnViewOnce>
        </div>
      </div>
    </section>
  );
}
