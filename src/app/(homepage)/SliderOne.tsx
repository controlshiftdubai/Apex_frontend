"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlipText } from "@/components/magicui/flip-text";
import banners from "./banners.json";

const Banner = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const banner = banners.length > 0 ? banners[0] : null;
  const desktopVideo = banner?.videos?.[0];
  const mobileVideo = banner?.videos?.[1] || desktopVideo;

  // fallback timeout in case video load event never fires
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000); // 3s fallback

    return () => clearTimeout(timeout);
  }, []);

  if (!banner || !desktopVideo) {
    return (
      <div className="relative h-[80vh] w-full flex items-center justify-center bg-gray-900">
        <p className="text-white text-base sm:text-lg">No video available</p>
      </div>
    );
  }

  return (
   <div className="relative h-[60vh] sm:h-[85vh] w-full overflow-hidden">
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
    <source src="https://player.vimeo.com/progressive_redirect/playback/1109027840/rendition/1080p/file.mp4?loc=external&log_user=0&signature=7f1133f3d0f187b13a667b2c9e26ccab4c637865c8a9c91319253d631a5a7d80" type="video/mp4" />
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
    <source src="https://download-video-ak.vimeocdn.com/v3-1/playback/578f8768-8e6f-4a20-bfed-04161ba9970b/91e350b2-8d36a683?__token__=st=1758186272~exp=1758189872~acl=%2Fv3-1%2Fplayback%2F578f8768-8e6f-4a20-bfed-04161ba9970b%2F91e350b2-8d36a683%2A~hmac=7f4296372ddd6020d2691f64d36c4cfd1a91aaf469c8a682aa9b6b2c10361fc5&r=dXMtd2VzdDE%3D" type="video/mp4" />
  </motion.video>

      {/* Black overlay while video loads */}
      <AnimatePresence>
        {!videoLoaded && (
          <motion.div
            key="black-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black z-20"
          />
        )}
      </AnimatePresence>

      {/* Gradient overlay (always visible) */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 z-10"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text */}
     <div className="relative z-30 flex h-full items-center justify-center text-center px-4">
  {videoLoaded && (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05 }} // optional: stagger words
      className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl"
    >
      <FlipText
        className="text-2xl sm:text-3xl md:text-3xl font-medium text-white leading-tight drop-shadow-md"
        duration={0.05}
    delayMultiple={0.04}
      >
        {banner.title}
      </FlipText>
    </motion.div>
  )}
</div>

    </div>
  );
};

export default Banner;
