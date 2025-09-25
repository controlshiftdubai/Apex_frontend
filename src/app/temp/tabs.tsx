"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = ["Impact", "Collaboration", "Press"];

export default function Tabs() {
  const router = useRouter();
  const activeTab =
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";

  const handleTabClick = (tab: string) => {
    router.push(`#${tab}`);
    // no need to scroll here, global HashScroll will do it
  };

  return (
    <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10">
      {tabs.map((tab, idx) => (
        <button
          key={tab + idx}
          onClick={() => handleTabClick(tab)}
          className={cn(
            "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
            activeTab === tab ? "text-black" : "text-gray-500 hover:text-black"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
