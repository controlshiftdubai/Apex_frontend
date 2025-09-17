"use client";
import { motion } from "framer-motion";
import { FlipText } from "@/components/magicui/flip-text";

import banners from "./banners.json";

const Banner = () => {
  let parsedBanners = banners;

  const banner = parsedBanners.length > 0 ? parsedBanners[0] : null;

  const desktopVideo = banner?.videos?.[0];
  const mobileVideo = banner?.videos?.[1] || desktopVideo;

  if (!banner || !desktopVideo) {
    return (
      <div className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900">
        <p className="text-white text-base sm:text-lg">No video available</p>
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
      >
        <source src={desktopVideo} type="video/mp4" />
      </motion.video>

      {/* Mobile Video */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover sm:hidden"
      >
        <source src={mobileVideo} type="video/mp4" />
      </motion.video>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl"
        >
          <FlipText
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight drop-shadow-md"
            variants={undefined}
          >
            {banner.title}
          </FlipText>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
