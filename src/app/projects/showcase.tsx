"use client";

import { AnimatedText } from "@/components/magicui/AnimatedText";
import { tabs, Project } from "./projects-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

/** Pastel palette + faint tint helper (same as your other page) */
const TITLE_BG_COLORS = ["#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
const tint = (hex: string, alphaHex = "33") => `${hex}${alphaHex}`;

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState("all");

  const projects =
    tabs.find((tab) => tab.key === activeTab)?.data || tabs[0].data;

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const textOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <section className="pb-6 sm:pb-10">
      <div className="max-w-[1220px] p-6 sm:p-5 mx-auto">
        {/* Tabs with pastel active tint */}
        <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-6 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10">
          {tabs.map((tab, i) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-2  md:text-lg font-medium transition-colors cursor-pointer",
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                )}
                style={
                  isActive
                    ? { backgroundColor: tint(TITLE_BG_COLORS[i % TITLE_BG_COLORS.length]) }
                    : undefined
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Showcase Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-1"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((item: Project, index: number) => {
            const isEvenRow = Math.floor(index / 2) % 2 === 0;
            const isFirstInPair = index % 2 === 0;

            let spanClass = "";
            if (isEvenRow) {
              spanClass = isFirstInPair ? "md:col-span-2" : "md:col-span-1";
            } else {
              spanClass = isFirstInPair ? "md:col-span-1" : "md:col-span-2";
            }

            return (
              <motion.div
                key={item.id}
                className={cn(spanClass)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                //@ts-ignore
                variants={itemVariants}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <div className="relative group cursor-pointer w-full aspect-auto h-min md:h-[420px]">
                  <div className="relative overflow-hidden bg-gray-700 h-full group">
                    {item.video ? (
                      <video
                        src={item.video}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={item.image}
                        key={item.video}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}

                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/15 transition-colors duration-300 text-white text-center"
                      variants={textOverlayVariants}
                      initial="hidden"
                      whileHover="visible"
                    >
                      <AnimatedText
                        as="h3"
                        text={item.title}
                        className="font-extrabold text-3xl sm:text-4xl drop-shadow-lg"
                      />
                      <AnimatedText
                        as="h3"
                        text={item.subTitle}
                        className="!font-normal text-xl sm:text-2xl drop-shadow-lg"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
