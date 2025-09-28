"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["Impact", "Collaboration", "Press"];

// Pastel palette (extend if you add more tabs)
const TAB_COLORS = ["#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
// Add ~20% alpha to a hex color (0x33)
const tint = (hex: string, alphaHex = "33") => `${hex}${alphaHex}`;

export default function Tabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const [hideTabs, setHideTabs] = useState(false);
  const lastScrollY = useRef(0);
  const [stuck, setStuck] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // detect sticky "stuck" state
      if (tabRef.current) {
        const { top } = tabRef.current.getBoundingClientRect();
        setStuck(top <= 0);
      }

      const currentScrollY = window.scrollY;

      if (stuck && currentScrollY > lastScrollY.current) {
        setHideTabs(true);
      } else if (!stuck || currentScrollY < lastScrollY.current) {
        setHideTabs(false);
      }
      lastScrollY.current = currentScrollY;

      // set active tab by viewport middle
      let found = false;
      const middle = window.innerHeight / 2;
      for (const tab of tabs) {
        const section = document.getElementById(tab);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom > middle) {
          setActiveTab(tab);
          found = true;
          break;
        }
      }
      if (!found) setActiveTab("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stuck]);

  const handleTabClick = (tab: string) => {
    const section = document.getElementById(tab);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    router.push(`#${tab}`);
  };

  return (
    <div
      ref={tabRef}
      className={cn(
        "flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6",
        "sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10",
        "transition-transform duration-500",
        hideTabs && stuck ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ willChange: "transform" }}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab;
        const bgColor = tint(TAB_COLORS[idx % TAB_COLORS.length]);

        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "relative px-4 py-2 rounded-md md:text-lg font-medium cursor-pointer",
              "transition-colors",
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Animated pastel pill that moves between tabs */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="tabHighlight"
                  className="absolute inset-0 rounded-md"
                  style={{ backgroundColor: bgColor }}
                  transition={{ type: "spring", stiffness: 420, damping: 40, mass: 0.5 }}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>

            {/* Text stays above the animated background */}
            <span className="relative">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
