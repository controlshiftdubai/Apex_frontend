"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

const defaultVariants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
};

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,
  className,
  as: Component = "span",
  variants,
  ...props
}) {
  const MotionComponent = motion[Component] || motion.span;
  const words = React.Children.toArray(children).join("").split(" ");

  return (
    <div
      className="flex justify-center flex-wrap gap-x-2 gap-y-3"
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => {
        const precedingChars = words
          .slice(0, wordIndex)
          .reduce((acc, curr) => acc + curr.length + 1, 0);

        return (
          <div key={wordIndex} className="flex">
            {word.split("").map((char, charIndex) => (
              <MotionComponent
                key={charIndex}
                initial="hidden"
                animate="visible"
                variants={variants || defaultVariants}
                transition={{
                  duration,
                  delay: (precedingChars + charIndex) * delayMultiple,

                  ease: "easeInOut", 

                 
                }}
                className={cn("origin-center drop-shadow-sm", className)}
                {...props}
              >
                {char}
              </MotionComponent>
            ))}
          </div>
        );
      })}
    </div>
  );
}