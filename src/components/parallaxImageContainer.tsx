"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  text: string;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}

export default function ParallaxImage({
  src,
  alt,
  text,
  className,
  textClassName,
  imageClassName,
}: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative aspect-[3/2] overflow-hidden md:aspect-[3/1]",
        className,
      )}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 75vw"
          className={cn(
            "object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-75",
            imageClassName,
          )}
        />
      </motion.div>
      <h3
        className={cn("absolute w-full px-4 text-center text-lg font-extrabold text-white sm:text-2xl lg:text-4xl",textClassName)}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {text}
      </h3>
    </div>
  );
}
