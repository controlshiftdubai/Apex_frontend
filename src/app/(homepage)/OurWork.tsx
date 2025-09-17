import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/magicui/AnimatedText";
import { cn } from "@/lib/utils";
import Link from "next/link";

const WorkShowcaseGrid = () => {
  // --- 1. THE NEW LAYOUT ---
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
      layout: "col-span-1 aspect-[4/4.8]",
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
      layout: "col-span-2 aspect-[8/4.7]",
    },

    // Row 3: Rectangle, Square, Square
    {
      id: 8,
      title: "Go",
      video:
        "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/WhatsApp+Video+2025-09-13+at+16.41.36_e22712e1+(1).mp4",
      category: "Nike",
      layout: "col-span-2 aspect-[8/4.7]",
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
      layout: "col-span-1 aspect-[4/4.8]",
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
      <div className="max-w-6xl p-4 sm:p-6 lg:p-8 justify-center mx-auto">
        {/* This text animation logic remains the same */}
        <div className="text-center mb-12 sm:mb-16">
          {/* ... (your H2 and P tags remain the same) ... */}
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="uppercase leading-tight sm:text-lg text-xl md:text-5xl font-medium text-gray-900 mb-6 underline decoration-dotted md:no-underline"
          >
            Partnering To Create{" "}
            <span className="text-xl text-gray-500 md:!text-5xl font-medium">
              Smart Spaces & <br /> Custom Products
            </span>
          </motion.h2>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-2xl leading-snug font-thin text-gray-500 max-w-4xl mx-auto"
          >
            We Create Products That Stand Out, Inspire, And Perform. From Design
            To Engineering And Branding, Apex Is Where Bold Visions Turn Into
            Reality.
          </motion.p>
        </div>

        <div className="relative">
          {/* --- FIX 2: Changed to 'md:grid-cols-4' ---
             This is the 4-column base grid.
          */}
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
                 
                  <div className="overflow-hidden bg-gray-700 h-full">
                    {item.video && (
                      <video
                        src={item.video}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        autoPlay
                        loop
                        muted
                        playsInline
                        key={item.video}
                      />
                    )}
                    <motion.div
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-colors duration-300 flex items-end p-6 sm:p-8 text-white"
                      variants={textOverlayVariants}
                      initial="hidden"
                      whileHover="visible"
                    >
                      <div className="text-left w-full">
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

          {/* --- START: NEW BUTTON ADDED --- */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link href="/projects">
              <p className="project-link relative inline-block text-lg font-medium text-black px-2">
                See our projects
              </p>
            </Link>
          </div>

          {/* --- END: NEW BUTTON ADDED --- */}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcaseGrid;
