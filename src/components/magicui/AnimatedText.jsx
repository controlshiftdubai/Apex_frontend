"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedText({
  text = "",
  className,
  as: Component = "h1",
}) {
  // Variants for the container to orchestrate the animation of its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025, // Time between each character animation
      },
    },
  };

  // Variants for each individual character
  const charVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const words = text.split(" ");

  return (
    // The `as` prop lets this render as h1, h3, p, etc.
    <Component className={cn(className)}>
      <motion.span
        className="flex flex-wrap" // Let the parent container handle alignment
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate as soon as the parent is visible
      >
        {words.map((word, wordIndex) => (
          // A non-breaking container for each word
          <span key={wordIndex} className="mr-3 inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={charVariants}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Component>
  );
}