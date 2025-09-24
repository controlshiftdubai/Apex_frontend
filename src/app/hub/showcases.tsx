"use client";
import React, { useEffect, useMemo, useRef, useState, RefObject } from "react";
import { motion } from "framer-motion";
import { showCases } from "./showcase-data";

function OverlapImages({ images }: { images: string[] }) {
  return (
    <div className="relative flex items-center justify-center h-52 sm:h-64 md:h-72">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="relative h-52 sm:h-64 md:h-72">
          {images.slice(0, 3).map((src, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt="Showcase"
              className={[
                "absolute top-0 h-full w-2/3 object-cover rounded-2xl shadow-xl",
                idx === 0 && "left-0 z-10",
                idx === 1 && "left-[20%] z-20",
                idx === 2 && "left-[40%] z-30",
              ]
                .filter(Boolean)
                .join(" ")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
  }, 60);

  useEffect(() => {
    const onScroll = () => updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateProgress]);

  return (
    <div ref={wrapperRef} className="relative bg-white text-neutral-900">
      {/* PROGRESS LINE (vertical) */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[5px]"
        style={{ top: lineTopOffset }}
      >
        <motion.div
          ref={lineRef}
          className="w-[5px] rounded-full bg-neutral-900/80"
          style={{ height: Math.max(0, lineHeight) }}
          initial={{ height: 0 }}
          animate={{ height: Math.max(0, lineHeight) }}
          transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
        />
      </div>

      {/* SHOWCASE */}
      <section
        ref={showcaseRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32"
      >
        <div className="space-y-20 md:space-y-24">
          {showCases.map((item, idx) => (
            <div
              key={item.id}
              ref={itemRefs[idx]}
              className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8 md:gap-12"
            >
              {/* Left: overlapping images */}
              <div>
                <OverlapImages images={item.images} />
              </div>

              {/* Right: index, title, description */}
              <div className="relative">
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 h-[2px] w-full"
                  aria-hidden
                >
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 h-[2px] bg-neutral-300"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: itemActive[idx] ? "120%" : 0,
                      opacity: itemActive[idx] ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ borderRadius: 999 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="pl-0 md:pl-8"
                >
                  <div className="text-sm tracking-[0.25em] text-neutral-500">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-32" />
    </div>
  );
}
