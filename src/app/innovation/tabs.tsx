"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = ["Impact", "Collaboration", "Press"];

// Your pastel palette (same order you gave)
const TAB_COLORS = ["#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];

// Quick helper to add ~20% alpha (hex 0x33)
const tint = (hex: string, alphaHex = "33") => `${hex}${alphaHex}`;

export default function Tabs() {
  const router = useRouter();
  const activeTab =
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";

  const handleTabClick = (tab: string) => {
    router.push(`#${tab}`);
    // global HashScroll handles the scrolling
  };

  return (
    <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10">
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab;
        const bg = isActive ? tint(TAB_COLORS[idx % TAB_COLORS.length]) : undefined;

        return (
          <button
            key={tab + idx}
            onClick={() => handleTabClick(tab)}
            className={cn(
              "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
              isActive ? "text-black" : "text-gray-500 hover:text-black"
            )}
            style={{ backgroundColor: bg }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
