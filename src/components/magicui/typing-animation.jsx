"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TypingAnimation({
  text,
  duration = 50,
  className,
  // This prop will be controlled by the parent component
  startAnimation = false, 
  as: Component = "div",
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Only start the animation if the prop is true
    if (startAnimation && text) {
      // Reset on re-trigger
      setDisplayedText("");
      setIsComplete(false);

      const graphemes = Array.from(text);
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i < graphemes.length) {
          setDisplayedText(graphemes.slice(0, i + 1).join(""));
          i++;
        } else {
          clearInterval(typingEffect);
          setIsComplete(true);
        }
      }, duration);

      return () => {
        clearInterval(typingEffect);
      };
    }
  }, [startAnimation, text, duration]);

  return (
    <Component
      className={cn("font-mono", className)}
    >
      {displayedText}
      {/* Blinking cursor */}
      {!isComplete && (
         <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-[3px] h-[1em] bg-current ml-1 translate-y-1"
          />
      )}
    </Component>
  );
}