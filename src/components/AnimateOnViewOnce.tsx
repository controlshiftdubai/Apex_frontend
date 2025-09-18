// AnimateOnViewOnce.tsx
"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface AnimateOnViewOnceProps {
  children: ReactNode;
  className: string; // animation or effect class
  delay?: number;
}

export default function AnimateOnViewOnce({
  children,
  className,
  delay = 0,
}: AnimateOnViewOnceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setTimeout(() => {
              setHasAnimated(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 1.0 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={hasAnimated ? className : ""}>
      {children}
    </div>
  );
}
