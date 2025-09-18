"use client";

import { AnimatedText } from "@/components/magicui/AnimatedText";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";



const WorkShowcaseGrid1 = () => {
  // --- 1. THE NEW LAYOUT ---
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
      image: "https://cdn.layerdesign.com/wp-content/uploads/2022/08/NNEW-Resizing-1331-x-821px.jpg.webp",
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
      video:
        "https://cdn.layerdesign.com/wp-content/uploads/2023/01/SAGA.mp4",
      image: "/fallbacks/calma.jpg",
      category: "Andreau World",
      layout: "col-span-2 aspect-[8/4.7]",
    },
    {
      id: 6,
      title: "Emerge",

      image: "https://cdn.layerdesign.com/wp-content/uploads/2022/11/643-x-821px_0074_Calma-1.jpg.webp",
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
      image: "https://cdn.layerdesign.com/wp-content/uploads/2022/08/DT-FEATURED.jpg.webp",
      category: "Deutsche Telekom Design",
      layout: "col-span-2 aspect-[8/4.7]",
    },
  ];

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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl p-4 sm:p-6 lg:p-8 justify-center mx-auto">
        {/* Heading / Subheading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="leading-tight max-w-4xl mx-auto sm:text-lg text-xl md:text-5xl font-medium text-gray-900 mb-4"
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

        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-4"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {workData.map((item) => (
              <motion.div
                key={item.id}
                className={cn(item.layout)}
                //@ts-ignore
                variants={itemVariants}
              >
                <div className="relative group cursor-pointer h-full">
                  <div className="relative overflow-hidden bg-gray-700 h-full group">
                    {/* Media: prefer video; otherwise render image. Use image as poster too. */}
                    {item.video ? (
                      <video
                        src={item.video}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={item.image}
                        key={item.video}
                      />
                    ) : item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    ) : null}

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300 text-white"
                      variants={textOverlayVariants}
                      initial="hidden"
                      whileHover="visible"
                    >
                      <div className="text-center">
                        <AnimatedText
                          as="h3"
                          text={item.title}
                          className="font-extrabold mb-2 text-5xl sm:text-4xl drop-shadow-lg"
                        />
                        <AnimatedText
                          as="p"
                          text={item.category}
                          className="text-gray-200 text-xl sm:text-lg font-semibold drop-shadow-md"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link href="/projects">
              <p className="link-highlight link-highlight-brown relative inline-block text-2xl font-medium text-black px-2">
                See our projects
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcaseGrid1;
