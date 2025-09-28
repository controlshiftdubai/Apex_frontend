"use client";
import { motion } from "framer-motion";
import { FlipText } from "@/components/magicui/flip-text";
import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";

export default function Footer() {
  return (
    <footer className="bg-[#f6f3f1] text-black min-h-screen flex items-end relative">
      <div className="absolute inset-0 flex items-center flex-col justify-center px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-xs md:max-w-2xl"
        >
          <FlipText
            className="font-normal text-gray-900 text-center leading-0 text-[30px] lg:text-[45px]"
            duration={0.01}
            delayMultiple={0.01}
            containerClassName="space-y-0 gap-y-0 leading-9 md:leading-14"
          >
            Together, we can shape the future with powerful creations.
          </FlipText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="pt-8 md:pt-"
        >
          <AnimateOnViewOnce
            delay={1700}
            className="link-highlight link-highlight-yellow"
          >
            <span className="!cursor-pointer px-5 relative inline-block text-lg md:text-[22px] text-black">
              Start your project today
            </span>
          </AnimateOnViewOnce>
        </motion.div>
      </div>
    </footer>
  );
}
