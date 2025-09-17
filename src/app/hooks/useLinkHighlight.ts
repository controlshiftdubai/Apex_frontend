"use client";

import { useEffect } from "react";

export const useLinkHighlight = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".link-highlight");

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active"); // trigger animation
            observerInstance.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
