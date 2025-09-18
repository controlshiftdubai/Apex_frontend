"use client";
import React, { FC, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShowcaseItem {
  title: string;
  description?: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface StickyScrollProps {
  showcaseContent: ShowcaseItem[];
}

export const StickyScroll: FC<StickyScrollProps> = ({ showcaseContent }) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRefs.current.length) return;

      const middleY = window.innerHeight / 2;

      contentRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top <= middleY && rect.bottom >= middleY) {
          setActiveIndex(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-2 gap-40 max-w-7xl mx-auto">
        {/* LEFT SIDE */}
        <div className="p-4">
          <div className="mt-12 space-y-16">
            {showcaseContent.map((item, index) => (
              <div
                //@ts-ignore
                ref={(el) => (contentRefs.current[index] = el)}
                key={index}
                className="relative flex flex-col justify-start"
              >
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0, y: 80 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -80 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {item.content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 max-w-xl space-y-5">
                  <AnimatePresence mode="wait">
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.4, ease: "easeIn" }}
                      className="text-lg text-[#999999] t ml-[0.5rem]"
                    >
                      {item.description}
                    </motion.p>
                  </AnimatePresence>

                  {item.subtitle && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="relative inline-block px-3 py-1 text-xl font-medium !cursor-pointer text-slate-900 link-highlight link-highlight-mint ml-[2rem]"
                      >
                        {item.subtitle}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative">
          <div className="sticky top-40">
            <LayoutGroup>
              <div className="flex flex-col space-y-8">
                {showcaseContent.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0.5 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      `text-2xl sm:text-5xl font-medium transition-all duration-500 `,
                      activeIndex === index ? "text-black" : "text-gray-400"
                    )}
                  >
                    {item.title}
                  </motion.div>
                ))}
              </div>
            </LayoutGroup>
          </div>
        </div>
      </div>
    </section>
  );
};
