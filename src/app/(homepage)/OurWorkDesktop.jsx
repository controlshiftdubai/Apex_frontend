"use client";
import { AnimatedText } from "@/components/magicui/AnimatedText";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const WorkShowcaseGrid1 = () => {
  const workData = [
    // Row 1: Square, Rectangle, Square
    {
      id: 2,
      title: "Light Vison",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.39_afb1b9ff+(1).mp4",
      category: "Resonate",
      layout: "col-span-1 aspect-[4/4.8]",
    }, // 4:3 Ratio
    {
      id: 3,
      title: "Speaker System",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.51_0041f070+(1).mp4",
      category: "Viture",
      layout: "col-span-2 aspect-[8/4.7]",
    }, // 8:3 Ratio (matches 4:3 height)
    {
      id: 4,
      title: "Halo Bike",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.37_49945eb7+(1).mp4",
      category: "SAGA",
      layout: "col-span-1 aspect-[4/4.8]",
    }, // 4:3 Ratio

    // Row 2: Square, Square, Rectangle
    {
      id: 5,
      title: "Calma",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/details-fabric-and-textile-modern-brown-gray-chair-4k-2025-08-28-13-55-51-utc+(1).mov",
      category: "Andreau World",
      layout: "col-span-2 aspect-[8/4.7]",
    },
    {
      id: 6,
      title: "Emerge",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.31_6a6b1000+(1).mp4",
      category: "Bang & Olufsen",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 7,
      title: "Ledger",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.51_f16362ce+(1).mp4",
      category: "Ledger",
      layout: "col-span-1 aspect-[4/4.8]",
    },

    // Row 3: Rectangle, Square, Square
    {
      id: 8,
      title: "Go",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.36_e22712e1+(1).mp4",
      category: "Nike",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 9,
      title: "Connectivity",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.50_04921f72+(1).mp4",
      category: "Deutsche Telekom Design",
      layout: "col-span-1 aspect-[4/4.8]",
    },
    {
      id: 10,
      title: "Connectivity 2",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.50_04921f72+(1).mp4",
      category: "Deutsche Telekom Design",
      layout: "col-span-2 aspect-[8/4.7]",
    },
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
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
      <div className="max-w-[1220px] p-4 sm:p-6 justify-center mx-auto">
        <div className="text-center mb-12 sm:mb-24">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className=" leading-tight max-w-4xl mx-auto sm:text-lg text-xl md:text-5xl font-medium text-gray-900 mb-4 sm:mb-6"
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
                    {item.video && (
                      <video
                        src={item.video}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        key={item.video}
                      />
                    )}

                    {/* --- START: FIX --- */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center 
                               bg-black/0 group-hover:bg-black/15 
                               transition-colors duration-300 text-white text-center"
                      variants={textOverlayVariants}
                      initial="hidden"
                      whileHover="visible"
                    >
                      {/* Text elements are now direct children of the flex container */}
                      <AnimatedText
                        as="h3"
                        text={item.title}
                        className="font-extrabold mb-2 text-5xl sm:text-4xl drop-shadow-lg"
                      />
                      <AnimatedText
                        as="p"
                        text={item.category}
                        className="text-gray-100 text-xl sm:text-xl font-semibold drop-shadow-md"
                      />
                    </motion.div>
                    {/* --- END: FIX --- */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 sm:mt-24 text-center">
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