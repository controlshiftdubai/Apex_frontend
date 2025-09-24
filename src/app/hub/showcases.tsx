"use client";
import React, { useEffect, useMemo, useRef, useState, RefObject } from "react";
import { motion } from "framer-motion";
import { ShowcaseItem, showCases } from "./showcase-data";
import ParallaxImage from "@/components/parallaxImageContainer";

function useRafThrottle<T extends (...args: any[]) => void>(
  fn: T,
  fps = 60
): T {
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
  const [itemActive, setItemActive] = useState<boolean[]>(() =>
    showCases.map(() => false)
  );

  // New state for horizontal line progress
  const [horizontalProgress, setHorizontalProgress] = useState<number[]>(() =>
    showCases.map(() => 0)
  );

  useEffect(() => {
    function computeOffsets() {
      if (!wrapperRef.current || !heroRef.current || !showcaseRef.current)
        return;
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

    // Update existing logic for itemActive
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

    // New logic for horizontal line progress
    setHorizontalProgress((prev) => {
      const next = [...prev];
      itemRefs.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const itemTop = window.scrollY + rect.top;
        const itemBottom = window.scrollY + rect.bottom;
        const itemMidAbs = itemTop + rect.height / 2;

        // Calculate progress based on how far the vertical line has passed the item's midpoint
        if (currentCenterY >= itemMidAbs) {
          // Find the next item to calculate the range
          const nextItemRef = itemRefs[idx + 1];
          let nextItemMidAbs = itemBottom + 200; // Default range if no next item

          if (nextItemRef && nextItemRef.current) {
            const nextRect = nextItemRef.current.getBoundingClientRect();
            nextItemMidAbs =
              window.scrollY + nextRect.top + nextRect.height / 2;
          }

          // Calculate progress between current item midpoint and next item midpoint
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
      {/* PROGRESS LINE (vertical) */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[5px] max-md:hidden"
        style={{ top: lineTopOffset }}
      >
        <motion.div
          ref={lineRef}
          className="w-1.5 bg-[#e5e2e1]"
          style={{ height: Math.max(0, lineHeight) }}
          initial={{ height: 0 }}
          animate={{ height: Math.max(0, lineHeight) }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
        />
      </div>

      {/* HORIZONTAL PROGRESS LINES */}
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

      {/* SHOWCASE */}
      <section
        ref={showcaseRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32"
      >
        <div className="space-y-20 md:space-y-24">
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
      {/* Right horizontal line (to number) */}
      <motion.div
        className="absolute w-1.5 bg-[#e5e2e1] origin-left"
        style={{
          top: `${rightLineOffset}px`,
          left: "0px",
          height: "2px",
          maxWidth: "200px",
          width: `${width}px`,
        }}
      />

      {/* Left horizontal line (to image) */}
      <motion.div
        className="absolute w-1.5 bg-[#e5e2e1] origin-right"
        style={{
          top: `${leftLineOffset}px`,
          right: "0px",
          height: "2px",
          maxWidth: "200px",
          width: `${width}px`,
        }}
      />
    </div>
  );
}

type OverlapImagesProps = {
  images: string[];
  overlapPercent?: number; // default 10
  alternate?: boolean; // zig-zag positioning
  maxWidth?: number; // max width for images in px
  maxHeight?: number; // max height for images in px
  containerHeight?: number; // container min height in px
};

export function OverlapImages({
  images,
  overlapPercent = 10,
  alternate = false,
  maxWidth = 380,
  maxHeight = 290,
  containerHeight = 840,
}: OverlapImagesProps) {
  const getPositionAndOverlapStyle = (idx: number) => {
    const baseStyle = {
      position: "absolute" as const,
      width: `${maxWidth}px`,
      height: `${maxHeight}px`,
    };

    if (alternate) {
      // Alternate layout: left-right-left pattern
      switch (idx) {
        case 0: // First image - top left
          return {
            ...baseStyle,
            top: "0%",
            left: "0%",
            zIndex: 30,
          };
        case 1: // Second image - middle right with overlap
          return {
            ...baseStyle,
            top: "30%",
            right: "0%",
            transform: "translateY(-30%)",
            marginLeft: `-${overlapPercent}%`,
            zIndex: 20,
          };
        case 2: // Third image - bottom left
          return {
            ...baseStyle,
            bottom: "0%",
            left: "0%",
            zIndex: 10,
          };
        default:
          return baseStyle;
      }
    } else {
      // Default layout: triangular arrangement
      switch (idx) {
        case 0: // First image - top right
          return {
            ...baseStyle,
            top: "0%",
            right: "0%",
            zIndex: 12,
          };
        case 1: // Second image - middle left with overlap
          return {
            ...baseStyle,
            top: "35%",
            left: "0%",
            transform: "translateY(-35%)",
            marginLeft: `-${overlapPercent}%`,
            zIndex: 11,
          };
        case 2: // Third image - bottom right with top overlap
          return {
            ...baseStyle,
            bottom: "0%",
            right: "0%",
            marginTop: `-${overlapPercent}%`,
            zIndex: 10,
          };
        default:
          return baseStyle;
      }
    }
  };

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ minHeight: `${containerHeight * 1.07}px` }}
    >
      {images.slice(0, 3).map((src, idx) => {
        const imageStyle = getPositionAndOverlapStyle(idx);

        return (
          <motion.div
            key={idx}
            style={imageStyle}
            className=""
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ParallaxImage
              src={src}
              alt={`Showcase-${idx}`}
              text=""
              className="w-full h-full  brightness-100 group-hover:scale-100 group-hover:brightness-100"
              imageClassName="rounded-lg shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

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
      {/* Left: overlapping images */}
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
