"use client";

import { scrollToSection } from "@/lib/utils";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      scrollToSection(hash);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return <></>;
}
