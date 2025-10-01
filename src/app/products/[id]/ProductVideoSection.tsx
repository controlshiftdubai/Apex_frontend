'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';

interface VideoSectionProps {
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoUrl,
  thumbnailUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;

    setIsLoading(true);

    try {
      if (isPlaying) {
        await videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Video playback error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    console.error('Video failed to load');
  };

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Video Container */}
        <div className="relative w-full h-[400px] lg:h-[600px] aspect-video overflow-hidden bg-gray-100">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            poster={thumbnailUrl}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            playsInline
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={thumbnailUrl}
                alt="Video thumbnail"
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayVideo}
              disabled={isLoading}
              className="group relative flex items-center justify-center w-[60px] h-[60px] bg-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isLoading ? (
                <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-400 border-t-gray-200 rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 md:w-8 md:h-8 text-white ml-0" />
              ) : (
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
              )}
            </button>
          </div>

          {/* Video Controls Gradient (appears when playing) */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
