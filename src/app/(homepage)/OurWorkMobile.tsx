"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";

type WorkItem = {
  id: number;
  title: string;
  category: string;
  layout: string;
  video?: string; // optional
  image?: string; // optional fallback + poster
};

const WorkShowcaseGrid = () => {
  const workData = [
    // Row 1: Square, Rectangle, Square
    {
      id: 2,
      title: "Light Vison",
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/BALANCE_Portrait.mp4",
      image: "/fallbacks/light-vision.jpg",
      category: "Resonate",
      layout: "col-span-1 aspect-[4/4.8]",
    }, // 4:3-ish portrait
    {
      id: 3,
      title: "Speaker System",
      // no video -> image will render
      image:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
      category: "Viture",
      layout: "col-span-2 aspect-[8/4.7]",
    },
    {
      id: 4,
      title: "Halo Bike",
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/VITURE_PORTRAIT.mp4",
      image: "/fallbacks/halo-bike.jpg",
      category: "SAGA",
      layout: "col-span-1 aspect-[4/4.8]",
    },

    // Row 2: Square, Square, Rectangle
    {
      id: 5,
      title: "Calma",
      video: "https://cdn.layerdesign.com/wp-content/uploads/2023/01/SAGA.mp4",
      image: "/fallbacks/calma.jpg",
      category: "Andreau World",
      layout: "col-span-2 aspect-[8/4.7]",
    },
    {
      id: 6,
      title: "Emerge",

      image:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/11/643-x-821px_0074_Calma-1.jpg.webp",
      category: "Bang & Olufsen",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 7,
      title: "Ledger",
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/EMERGE_PORTRAIT-1.mp4",
      image: "/fallbacks/ledger.jpg",
      category: "Ledger",
      layout: "col-span-1 aspect-[4/4.8]",
    },

    // Row 3: Rectangle, Square, Square
    {
      id: 8,
      title: "Go",
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/12/LEDGER_PORTRAIT.mp4",
      image: "/fallbacks/go.jpg",
      category: "Nike",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 9,
      title: "Connectivity",
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/GO_PORTRAIT.mp4",
      image: "/fallbacks/connectivity.jpg",
      category: "Deutsche Telekom Design",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 10,
      title: "Connectivity 2",
      // no video -> image will render
      image:
        "https://cdn.layerdesign.com/wp-content/uploads/2022/08/DT-FEATURED.jpg.webp",
      category: "Deutsche Telekom Design",
      layout: "col-span-2 aspect-[8/4.7]",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl p-4 sm:p-6 lg:p-8 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="leading-tight sm:text-lg text-xl md:text-5xl font-medium text-gray-900 mb-4"
          >
            Partnering To Create Smart Spaces & Custom Products
          </motion.h2>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-2xl leading-snug font-light text-[#999999] max-w-4xl mx-auto"
          >
            We Create Products That Stand Out, Inspire, And Perform. From Design
            To Engineering And Branding, Apex Is Where Bold Visions Turn Into
            Reality.
          </motion.p>
        </div>

        {/* --- Mobile Layout --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {workData.map((item, index) => {
            // pattern: rectangle, two squares
            const patternIndex = index % 3; // 0 = rectangle, 1 = begin two-square row, 2 handled by previous

            // Helper to render media in a sized box without stretching
            const Media = (it: WorkItem) => (
              <div className="relative w-full h-full">
                {it.video ? (
                  <video
                    src={it.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={it.image}
                  />
                ) : it.image ? (
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                ) : null}
              </div>
            );

            if (patternIndex === 0) {
              // Rectangle block
              return (
                <motion.div
                  key={item.id}
                  className="relative aspect-[16/9] overflow-hidden"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <Media {...item} />
                </motion.div>
              );
            } else if (patternIndex === 1) {
              // Two squares (this and next)
              const nextItem = workData[index + 1];
              return (
                <div key={item.id} className="grid grid-cols-2 gap-4">
                  {[item, nextItem].map(
                    (v) =>
                      v && (
                        <motion.div
                          key={v.id}
                          className="relative aspect-square overflow-hidden"
                          variants={itemVariants}
                          initial="hidden"
                          whileInView="visible"
                        >
                          <Media {...v} />
                        </motion.div>
                      )
                  )}
                </div>
              );
            }
            // patternIndex === 2: skip, already rendered as second square above
            return null;
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link href="/projects">
            <AnimateOnViewOnce className="link-highlight link-highlight-brown ">
              <p className="relative inline-block text-2xl text-black px-2">
                See our projects
              </p>
            </AnimateOnViewOnce>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcaseGrid;
