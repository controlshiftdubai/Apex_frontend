"use client";
import React from "react";
import { StickyScroll } from "@/components/sticky-scroll-reveal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const content = [
  {
    title: "20+ Bold Projects",
    description:
      "We design breakthrough products and proposals that secure capital and transform bold visions into global market leaders.",
    subtitle: "Apex innovation & creations",
    content: (
      <div className="h-72 w-full object-contain sm:!object-cover object-center ">
        <img
          src="https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T12%3A37%3A18.417Z-image%207%20%281%29.png"
          alt="Projects Delivered"
          className="h-full w-full sm:!object-cover"
        />
      </div>
    ),
  },
  {
    title: "Global Partnerships in Progress",
    description:
      "We create groundbreaking products that set new standards — and our work is already attracting global recognition.",
    subtitle: "Meet our partners",
    content: (
      <div className="h-72 w-full object-contain sm:object-cover object-center ">
        <img
          src="https://d33609liqwio9r.cloudfront.net/2025-09-13T14:06:50.529Z-image2scroll.png"
          alt="Funding Raised"
          className="h-full w-full sm:!object-cover"
        />
      </div>
    ),
  },
  {
    title: "Expanding Media Recognition",
    description:
      "We create groundbreaking products that set new standards — and our work is already attracting global recognition.",
    subtitle: "Discover our achievements",
    content: (
      <div className="h-72 w-full object-contain sm:object-cover object-center ">
        <img
          src="https://d33609liqwio9r.cloudfront.net/2025-09-13T14:07:44.335Z-image%208.png"
          alt="Industry Awards"
          className="h-full w-full sm:!object-cover"
        />
      </div>
    ),
  },
  {
    title: "350+ Media Features",
    description:
      "Our work captures global media attention, ensuring every creation gets the spotlight it deserves.",
    subtitle: "Read our press features",
    content: (
      <div className="h-72 w-full object-contain sm:object-cover object-center ">
        <img
          src="https://d33609liqwio9r.cloudfront.net/2025-09-13T14:09:02.919Z-image%206.png"
          alt="Media Features"
          className="h-full w-full sm:!object-cover"
        />
      </div>
    ),
  },
];

const StatsMobileShowcase = () => (
  <div className="p-4">
    <div className="mt-12 space-y-16">
      {content.map((item, idx) => (
        <div key={idx} className="relative flex flex-col justify-start">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {item.content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 max-w-sm space-y-2">
            <AnimatePresence mode="wait">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeIn" }}
                className="text-lg text-slate-700"
              >
                {item.description}
              </motion.p>
            </AnimatePresence>

            {item.subtitle && (
              <AnimatePresence mode="wait">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                  className="inline-block px-3 py-1 text-base font-medium text-slate-900 bg-yellow-100"
                >
                  {item.subtitle}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function WorkShowcaseStickyScroll() {
  return (
    <div className="bg-[#f6f3f1]">
      <section className="w-full py-20 md:py-32">
        <h2 className="text-xl md:text-5xl mx-auto max-w-6xl font-medium uppercase text-gray-900 mb-6 leading-tight underline decoration-dotted md:no-underline text-center">
          Our&nbsp;
          <span className="text-xl md:text-5xl text-gray-500 font-medium leading-relaxed">
            Impact
          </span>
        </h2>

        <p className="text-base md:text-2xl text-center max-w-5xl mb-10 mx-auto md:mb-24 text-centersm:text-lg  text-gray-500 font-regular leading-tight">
          We create products and experiences that capture attention, drive
          value, and open new markets for our partners worldwide.
        </p>

        <div className="md:hidden">
          <StatsMobileShowcase />
        </div>
        <div className="max-md:hidden">
          <StickyScroll showcaseContent={content} />
        </div>
      </section>
    </div>
  );
}
