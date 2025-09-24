import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * ShowcasePage
 * 
 * A single-file React component using TailwindCSS + Framer Motion.
 * It renders:
 *  - Hero section (heading, subheading, button)
 *  - Three-column stats
 *  - Long showcase list with two-column rows
 *  - A 5px vertical progress line that starts below the hero and extends
 *    down through the showcase as you scroll. When the center of the line
 *    reaches the middle of an item, a horizontal connector animates out.
 *
 * Drop this into any React project with Tailwind + Framer Motion available.
 * Tailwind is used for styling; no external CSS required.
 */

const SAMPLE_SHOWCASE = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? "Urban Loft" : "Beach Villa",
  description:
    "Crisp layouts, fast-loading media, and a clean grid that scales from mobile to desktop without code tweaks.",
  images: [
    `https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop`,
    `https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop`,
  ],
}));

function OverlapImages({ images }) {
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

function Stat({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-semibold tracking-tight">{number}</div>
      <div className="mt-2 text-sm md:text-base text-muted-foreground">{label}</div>
    </div>
  );
}

function useRafThrottle(fn, fps = 60) {
  const lastRef = useRef(0);
  return (...args) => {
    const now = performance.now();
    const minInterval = 1000 / fps;
    if (now - lastRef.current > minInterval) {
      lastRef.current = now;
      fn(...args);
    } else {
      cancelAnimationFrame((lastRef.current)?.rafId);
      const rafId = requestAnimationFrame(() => fn(...args));
      lastRef.current = Object.assign(now, { rafId });
    }
  };
}

export default function ShowcasePage({
  items = SAMPLE_SHOWCASE,
  heading = "Design that sells",
  subheading = "Clean, fast, and conversion-focused layouts for property showcases.",
  cta = "Get a demo",
  stats = [
    { number: "2.5x", label: "Avg. time on page" },
    { number: "38%", label: "Lead conversion lift" },
    { number: "< 1s", label: "LCP on 4G" },
  ],
}) {
  const wrapperRef = useRef(null); // whole page wrapper
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const lineRef = useRef(null);

  const itemRefs = useMemo(() => items.map(() => React.createRef()), [items]);
  const [lineHeight, setLineHeight] = useState(0);
  const [lineTopOffset, setLineTopOffset] = useState(0); // from top of wrapper
  const [itemActive, setItemActive] = useState(() => items.map(() => false));

  // Compute static geometry on mount & resize
  useEffect(() => {
    function computeOffsets() {
      if (!wrapperRef.current || !heroRef.current || !showcaseRef.current) return;
      const heroH = heroRef.current.offsetHeight;
      // Start the line a bit below the hero for breathing room
      const startOffset = heroH + 24; // px below hero
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

    const wrapperTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    const start = wrapperTop + lineTopOffset; // absolute Y where line begins
    const end = wrapperTop + lineTopOffset + showcaseRef.current.offsetHeight; // absolute Y end

    // Current scroll center (center of viewport), for a more natural feel
    const scrollCenter = window.scrollY + window.innerHeight / 2;

    const rawHeight = Math.min(Math.max(scrollCenter - start, 0), end - start);
    setLineHeight(rawHeight);

    // Determine which items are crossed by line center
    const currentCenterY = start + rawHeight; // absolute Y of line center

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
      {/* HERO */}
      <section ref={heroRef} className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {heading}
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-neutral-600">
            {subheading}
          </p>
          <div className="mt-8">
            <button className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium shadow-sm bg-black text-white hover:opacity-90 transition">
              {cta}
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-12 md:pb-16">
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <Stat key={i} number={s.number} label={s.label} />
          ))}
        </div>
      </section>

      {/* PROGRESS LINE (vertical) */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[5px]" style={{ top: lineTopOffset }}>
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
      <section ref={showcaseRef} className="relative mx-auto max-w-6xl px-4 sm:px-6 pb-24 md:pb-32">
        <div className="space-y-20 md:space-y-24">
          {items.map((item, idx) => (
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
                {/* Horizontal connector line */}
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

      {/* Footer spacer to let the line finish gracefully */}
      <div className="h-32" />
    </div>
  );
}
