"use client";

import { tabs, Project } from "./projects-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

export default function ProjectsShowcase() {
  const [activeTab, setActiveTab] = useState("all");
  const projects =
    tabs.find((tab) => tab.key === activeTab)?.data || tabs[0].data;

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="pb-6 sm:pb-10">
      <div className="max-w-[1220px] p-6 sm:p-5 mx-auto">
        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-y-2 gap-x-3 mb-8 md:gap-x-6 sticky py-4 md:py-5 top-16 md:top-20 bg-white z-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-4 py-2 rounded-md md:text-lg font-medium transition-colors cursor-pointer",
                activeTab === tab.key
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image + Text cards (inspired by “Our Values”) */}
        <motion.div
          className="grid grid-cols-1 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((item: Project, index: number) => {
            const imageFirst = index % 2 === 0; // alternate left/right
            return (
              <motion.article
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5"
        
              >
                {/* Media */}
                <div
                  className={cn(
                    "relative h-64 md:h-[420px] order-1",
                    imageFirst ? "md:order-1" : "md:order-2"
                  )}
                >
                  {item.video ? (
                    <video
                      src={item.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.image}
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
                </div>

                {/* Copy */}
                <div
                  className={cn(
                    "flex flex-col justify-center p-6 sm:p-10 gap-3 order-2",
                    imageFirst ? "md:order-2" : "md:order-1"
                  )}
                >
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-lg text-gray-700">{item.subTitle}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  {item.ctaLabel && (
                    <div className="pt-2">
                      <a
                        href={item.ctaHref || "#"}
                        className="inline-flex items-center rounded-md border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
                      >
                        {item.ctaLabel}
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
