"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const WorkShowcaseGrid = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl p-4 sm:p-6 lg:p-8 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          {/* ... (your H2 and P tags remain the same) ... */}
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className=" leading-tight sm:text-lg text-xl md:text-5xl font-medium text-gray-900 mb-4"
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
            className="text-base sm:text-2xl leading-snug font-light text-gray-500 max-w-4xl mx-auto"
          >
            We Create Products That Stand Out, Inspire, And Perform. From Design
            To Engineering And Branding, Apex Is Where Bold Visions Turn Into
            Reality.
          </motion.p>
        </div>

        {/* --- Mobile Layout --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {workData.map((item, index) => {
            // Decide layout based on repeating pattern: rectangle, square, square
            const patternIndex = index % 3; // 0 = rectangle, 1/2 = square
            if (patternIndex === 0) {
              return (
                <motion.div
                  key={item.id}
                  className="aspect-[16/9]"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  <video
                    src={item.video}
                    className="w-full h-[200px] object-cover "
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              );
            } else if (patternIndex === 1) {
              // Render two squares together for pattern
              const nextItem = workData[index + 1];
              return (
                <div key={item.id} className="grid grid-cols-2 gap-4">
                  {[item, nextItem].map((v) =>
                    v ? (
                      <motion.div
                        key={v.id}
                        className="aspect-square"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                      >
                        <video
                          src={v.video}
                          className="w-full h-[200px]  object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      </motion.div>
                    ) : null
                  )}
                </div>
              );
            }
            return null; // skip index 2 because it's included in previous 2-square row
          })}
        </div>
        <div className="mt-12 sm:mt-16 text-center">
          <Link href="/projects">
            <p className="link-highlight link-highlight-brown relative inline-block text-2xl font-medium text-black px-2">
              See our projects
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkShowcaseGrid;
