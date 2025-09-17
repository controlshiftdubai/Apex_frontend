"use client";

import { useEffect, useState } from "react";
import WorkShowcaseGrid from "./OurWorkMobile";
import WorkShowcaseGrid1 from "./OurWorkDesktop";


export default function Work() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // detect initial screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind "md" breakpoint
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return isMobile ? <WorkShowcaseGrid /> : <WorkShowcaseGrid1 />;
}
