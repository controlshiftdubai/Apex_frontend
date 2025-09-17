// src/components/ExpertiseSection.jsx

"use client";
import ScrollStickyCards from "./ScrollStickyBanner";
import React from "react";

const banners = [
  {
    id: 1,
    desktop:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-14T19%3A06%3A01.660Z-WhatsApp%20Image%202025-09-15%20at%2012.35.19%20AM.jpeg",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A10%3A28.213Z-Frame%201000003798.png",
    title: "Product Innovation That Blends Design,",
    subtitle: "Technology, And Performance",
  },
  {
    id: 2,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-14T19:22:31.807Z-2.jpeg",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A14%3A25.549Z-Group%2039.png",
    title: "Smart Engineering. Unmatched",
    subtitle: "Functionality. Unforgettable Impact",
  },
  {
    id: 3,
    desktop:
      "https://d33609liqwio9r.cloudfront.net/2025-09-14T19:21:46.488Z-3.jpeg",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A14%3A58.632Z-Group%2040.png",
    title: "We Craft Brand Identities That",
    subtitle: "Stand Out, Resonate, And Last",
  },
  {
    id: 4,
    desktop:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-14T19%3A20%3A52.316Z-4.jpeg",
    mobile:
      "https://mypubblicbucket.s3.ap-south-1.amazonaws.com/2025-09-15T15%3A15%3A31.611Z-Group%2041.png",
    title: "We Craft Immersive Environments Where",
    subtitle: "Design, Technology, And Emotion Collide",
  },
];

export default function ExpertiseSection() {
  return <ScrollStickyCards banners={banners} />;
}
