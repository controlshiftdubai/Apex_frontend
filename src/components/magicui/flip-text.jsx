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
  variants = defaultVariants,
  startDelay = 0,
  containerClassName = "",
  ...props
}) {
  const MotionComponent = motion[Component] || motion.span;
  const words = React.Children.toArray(children).join("").split(" ");

  return (
    <div
      className={cn(
        "flex justify-center flex-wrap gap-x-2 gap-y-3",
        containerClassName
      )}
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
                variants={variants} // inherit parent's animate state
                transition={{
                  duration,
                  delay:
                    startDelay + (precedingChars + charIndex) * delayMultiple, // 👈 add startDelay

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
