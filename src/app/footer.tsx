"use client";
import { motion } from "framer-motion";
import { FlipText } from "@/components/magicui/flip-text";

export default function Footer() {
  return (
    <footer className="bg-[#f6f3f1] text-black min-h-screen flex items-end relative">
      <div className="absolute inset-0 flex items-center flex-col justify-center px-4">
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.5 }}
  className="space-y-2"
>
  <FlipText
    className="font-light text-gray-900 leading-tight text-center text-2xl sm:text-3xl md:text-4xl lg:text-[48px] max-w-5xl"
    duration={0.01}
    delayMultiple={0.01}
  >
    Together, we can shape the future
  </FlipText>

  <FlipText
    className="font-light text-gray-900 leading-tight text-center text-2xl sm:text-3xl md:text-4xl lg:text-[48px] max-w-5xl"
    duration={0.01}
    delayMultiple={0.01}
    startDelay={0.4} // 👈 delay until first line completes
  >
    with powerful creations.
  </FlipText>
</motion.div>




        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 1.8 }}
          className="link-highlight !cursor-pointer px-6 link-highlight-yellow relative inline-block text-2xl text-black my-12"
        >
          See your  projects today
        </motion.p>
      </div>
    </footer>
  );
}
