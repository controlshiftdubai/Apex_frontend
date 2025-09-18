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
   <div className="relative h-[60vh] sm:h-[80vh] w-full overflow-hidden">
  {/* Desktop Video */}
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
    <source src="https://download-video-ak.vimeocdn.com/v3-1/playback/6ced432a-f0a7-42d3-8fb6-6edae4024e44/fabf5cc5-525244ae?__token__=st=1758177915~exp=1758181515~acl=%2Fv3-1%2Fplayback%2F6ced432a-f0a7-42d3-8fb6-6edae4024e44%2Ffabf5cc5-525244ae%2A~hmac=9fd83d77b37769cfe18977c8751b3bdf73c748e73540229b569a131863dfc605&r=dXMtY2VudHJhbDE%3D" type="video/mp4" />
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
    <source src="https://download-video-ak.vimeocdn.com/v3-1/playback/578f8768-8e6f-4a20-bfed-04161ba9970b/91e350b2-8d36a683?__token__=st=1758177884~exp=1758181484~acl=%2Fv3-1%2Fplayback%2F578f8768-8e6f-4a20-bfed-04161ba9970b%2F91e350b2-8d36a683%2A~hmac=88abb2ca9f6b0c56787cab89f5d2d69df537fdb967b04b2aac563d2f3ce4e3ef&r=dXMtd2VzdDE%3D" type="video/mp4" />
  </motion.video>

  {/* Gradient overlay */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"
    animate={{ opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Text */}
  <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl"
    >
      <FlipText
        className="text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight drop-shadow-md"
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
