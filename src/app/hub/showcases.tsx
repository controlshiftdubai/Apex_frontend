"use client";

import React, { useEffect, useMemo, useRef, useState, RefObject } from "react";
import { motion } from "framer-motion";
import { ShowcaseItem, showCases } from "./showcase-data";
import ParallaxImage from "@/components/parallaxImageContainer";

/* -----------------------------------------------------------
   Small helper: throttle work on scroll with requestAnimationFrame
----------------------------------------------------------- */
function useRafThrottle<T extends (...args: any[]) => void>(fn: T, fps = 60): T {
  const lastRef = useRef<number & { rafId?: number }>(0);
  return ((...args: any[]) => {
    const now = performance.now();
    const minInterval = 1000 / fps;
    if (now - lastRef.current > minInterval) {
      lastRef.current = now;
      fn(...args);
    } else {
      if ((lastRef.current as any).rafId) {
        cancelAnimationFrame((lastRef.current as any).rafId);
      }
      const rafId = requestAnimationFrame(() => fn(...args));
      lastRef.current = Object.assign(now, { rafId });
    }
  }) as T;
}

/* -----------------------------------------------------------
   Main page section
----------------------------------------------------------- */
export default function Showcases() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  const itemRefs: RefObject<HTMLDivElement | null>[] = useMemo(
    () => showCases.map(() => React.createRef<HTMLDivElement>()),
    [showCases]
  );

  const [lineHeight, setLineHeight] = useState(0);
  const [lineTopOffset, setLineTopOffset] = useState(0);
  const [itemActive, setItemActive] = useState<boolean[]>(
    () => showCases.map(() => false)
  );

  // progress for each row’s horizontal “tick” line
  const [horizontalProgress, setHorizontalProgress] = useState<number[]>(
    () => showCases.map(() => 0)
  );

  useEffect(() => {
    function computeOffsets() {
      if (!wrapperRef.current || !heroRef.current || !showcaseRef.current) return;
      const heroH = heroRef.current.offsetHeight;
      const startOffset = heroH + 24;
      setLineTopOffset(startOffset);
      updateProgress();
    }

    const ro = new ResizeObserver(computeOffsets);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    if (heroRef.current) ro.observe(heroRef.current);
    if (showcaseRef.current) ro.observe(showcaseRef.current);

    window.addEventListener("load", computeOffsets);
    window.addEventListener("resize", computeOffsets);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", computeOffsets);
      window.removeEventListener("resize", computeOffsets);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProgress = useRafThrottle(() => {
    if (!wrapperRef.current || !showcaseRef.current) return;

    const wrapperTop =
      wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const start = wrapperTop + lineTopOffset;
    const end = wrapperTop + lineTopOffset + showcaseRef.current.offsetHeight;

    const scrollCenter = window.scrollY + window.innerHeight / 2;

    const rawHeight = Math.min(Math.max(scrollCenter - start, 0), end - start);
    setLineHeight(rawHeight);

    const currentCenterY = start + rawHeight;

    // mark rows as “active” when the line crosses their mid-point
    setItemActive((prev) => {
      const next = [...prev];
      itemRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemMidAbs = window.scrollY + rect.top + rect.height / 2;
        if (currentCenterY >= itemMidAbs) next[idx] = true;
      });
      return next;
    });

    // compute horizontal tick width for each row
    setHorizontalProgress((prev) => {
      const next = [...prev];
      itemRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const itemTop = window.scrollY + rect.top;
        const itemBottom = window.scrollY + rect.bottom;
        const itemMidAbs = itemTop + rect.height / 2;

        if (currentCenterY >= itemMidAbs) {
          const nextItemRef = itemRefs[idx + 1];
          let nextItemMidAbs = itemBottom + 200;
          if (nextItemRef && nextItemRef.current) {
            const nextRect = nextItemRef.current.getBoundingClientRect();
            nextItemMidAbs =
              window.scrollY + nextRect.top + nextRect.height / 2;
          }
          const progressRange = nextItemMidAbs - itemMidAbs;
          const currentProgress = Math.min(
            (currentCenterY - itemMidAbs) / progressRange,
            1
          );
          next[idx] = Math.max(0, Math.min(100, currentProgress * 100));
        } else {
          next[idx] = 0;
        }
      });
      return next;
    });
  }, 60);

  useEffect(() => {
    const onScroll = () => updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateProgress]);

  return (
    <div ref={wrapperRef} className="relative bg-white text-neutral-900 py-24">
      {/* Vertical progress line down the center */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[5px] max-md:hidden"
        style={{ top: lineTopOffset }}
      >
        <motion.div
          ref={lineRef}
          className="w-1.5 bg-[#D8FFD7]"
          style={{ height: Math.max(0, lineHeight) }}
          initial={{ height: 0 }}
          animate={{ height: Math.max(0, lineHeight) }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
        />
      </div>

      {/* Horizontal ticks per row */}
      {showCases.map((_, idx) => (
        <HorizontalProgressLines
          key={idx}
          idx={idx}
          progress={horizontalProgress[idx]}
          itemRef={itemRefs[idx]}
          wrapperRef={wrapperRef}
          lineTopOffset={lineTopOffset}
        />
      ))}

      {/* The grid of rows */}
      <section
        ref={showcaseRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32"
      >
        <div className="space-y-20 md:space-y-34">
          {showCases.map((item, idx) => (
            <ShowCaseRow
              key={idx}
              idx={idx}
              item={item}
              itemRef={itemRefs[idx]}
              itemActive={itemActive[idx]}
            />
          ))}
        </div>
      </section>

      <div className="h-32" />
    </div>
  );
}

/* -----------------------------------------------------------
   Horizontal lines that extend from the vertical progress line
----------------------------------------------------------- */
function HorizontalProgressLines({
  idx,
  progress,
  itemRef,
  wrapperRef,
  lineTopOffset,
}: {
  idx: number;
  progress: number;
  itemRef: RefObject<HTMLDivElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
  lineTopOffset: number;
}) {
  const [linePosition, setLinePosition] = useState({ top: 0, visible: false });

  useEffect(() => {
    const updatePosition = () => {
      if (!itemRef.current || !wrapperRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const wrapperTop = window.scrollY + wrapperRect.top;
      const itemRect = itemRef.current.getBoundingClientRect();
      const itemMidAbs = window.scrollY + itemRect.top + itemRect.height / 2;

      const relativeTop = itemMidAbs - wrapperTop - lineTopOffset;

      setLinePosition({
        top: relativeTop,
        visible: progress > 0,
      });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [itemRef, wrapperRef, lineTopOffset, progress]);

  if (!linePosition.visible) return null;

  const isAlternate = idx % 2 === 1;
  const rightLineOffset = isAlternate ? -5 : 0;
  const leftLineOffset = isAlternate ? 5 : 5;

  const maxWidth = 92;
  const calculated = (progress / 30) * 200;
  const width =
    calculated > maxWidth ? maxWidth : calculated < 0 ? 0 : calculated;

  return (
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2  max-md:hidden"
      style={{ top: lineTopOffset + linePosition.top }}
    >
      {/* to the number */}
      <motion.div
        className="absolute w-1.5 bg-[#FFEADB] origin-left"
        style={{
          top: `${rightLineOffset}px`,
          left: "0px",
          height: "4px",
          maxWidth: "200px",
          width: `${width}px`,
        }}
      />
      {/* to the image block */}
      <motion.div
        className="absolute w-1.5 bg-[#FFEADB] origin-right"
        style={{
          top: `${leftLineOffset}px`,
          right: "0px",
          height: "4px",
          maxWidth: "200px",
          width: `${width}px`,
        }}
      />
    </div>
  );
}

/* -----------------------------------------------------------
   Image block: BIG on top + TWO small below (the new layout)
   images[0] -> big hero
   images[1], images[2] -> small tiles underneath
----------------------------------------------------------- */
type OverlapImagesProps = {
  images: string[];              // [big, small1, small2]
  alternate?: boolean;           // if true, swap the smalls for a subtle variation
  heroHeight?: string;           // tailwind heights for hero
  smallHeight?: string;          // tailwind heights for smalls
};

export function OverlapImages({
  images,
  alternate = false,
  heroHeight = "h-[360px] sm:h-[420px] md:h-[520px] lg:h-[260px]",
  smallHeight = "h-[240px] sm:h-[260px] md:h-[180px]",
}: OverlapImagesProps) {
  let [big, s1, s2] = [
    images?.[0] ?? "",
    images?.[1] ?? "",
    images?.[2] ?? "",
  ];

  // for alternating rows you can swap the small images
  if (alternate) [s1, s2] = [s2, s1];

  return (
    <div className="w-full">
      {/* Big hero image (full width) */}
      {big && (
        <div className={`relative w-full overflow-hidden  shadow-lg ${heroHeight}`}>
          <ParallaxImage
            src={big}
            alt="Showcase-hero"
            text=""
            className="w-full h-full "
            imageClassName="object-cover"
          />
        </div>
      )}

      {/* Two small images below */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {s1 && (
          <div className={`relative w-full overflow-hidden  shadow-lg ${smallHeight}`}>
            <ParallaxImage
              src={s1}
              alt="Showcase-small-1"
              text=""
              className="w-full h-full "
              imageClassName="object-cover"
            />
          </div>
        )}
        {s2 && (
          <div className={`relative w-full overflow-hidden  shadow-lg ${smallHeight}`}>
            <ParallaxImage
              src={s2}
              alt="Showcase-small-2"
              text=""
              className="w-full h-full "
              imageClassName="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   One row: images on the left, text on the right (stacks on mobile)
----------------------------------------------------------- */
function ShowCaseRow({
  item,
  idx,
  itemRef,
  itemActive,
}: {
  item: ShowcaseItem;
  idx: number;
  itemRef: RefObject<HTMLDivElement | null>;
  itemActive: boolean;
}) {
  return (
    <div
      key={item.id}
      ref={itemRef}
      className="grid md:grid-cols-2 items-start gap-32"
    >
      {/* Left: BIG + two small images */}
      <div className="max-md:order-2">
        <OverlapImages images={item.images} alternate={Boolean(idx % 2)} />
      </div>

      {/* Right: index, title, description */}
      <div className="relative h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="pl-0 md:pl-8"
        >
          <div className="text-3xl font-medium tracking-tighter">
            {String(idx + 1).padStart(2, "0")}
          </div>
          <h3 className="mt-2 text-2xl md:text-3xl lg:text-5xl font-medium">
            {item.title}
          </h3>
          <p className="mt-4 leading-tight text-[#999999]">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
