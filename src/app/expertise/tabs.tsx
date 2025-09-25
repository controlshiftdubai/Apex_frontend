"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const tabs = ["Impact", "Collaboration", "Press"];

export default function Tabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("");
  const [hideTabs, setHideTabs] = useState(false);
  const lastScrollY = useRef(0);
  const [stuck, setStuck] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Detect sticky stuck state
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

      let found = false;
      const middle = window.innerHeight / 2;
      for (const tab of tabs) {
        const section = document.getElementById(tab);
        if (section) {
          const rect = section.getBoundingClientRect();
        
          if (rect.top <= middle && rect.bottom > middle) {
            setActiveTab(tab);
            found = true;
            break;
          }
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
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    router.push(`#${tab}`);
  };

  return (
    <div
      ref={tabRef}
      className={cn(
        "flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10 transition-transform duration-500",
        hideTabs && stuck ? "-translate-y-full" : "translate-y-0"
      )}
      style={{ willChange: "transform" }}
    >
      {tabs.map((tab, idx) => (
        <button
          key={tab + idx}
          onClick={() => handleTabClick(tab)}
          className={cn(
            "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
            activeTab === tab
              ? "text-black "
              : "text-gray-500 hover:text-black"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
