"use client";

import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { scrambleData, ScrambleDataType } from "./scramble-data";
import ParallaxImage from "@/components/parallaxImageContainer";

export default function ScrambleSection() {
  return (
    <div className="px-6 w-full">
      <div className="max-w-[1200px] mx-auto py-5">
        <div className="grid md:gap-28 gap-12">
          {scrambleData.map((d, i) => (
            <Scramble key={i} data={d} flag={Boolean(i % 2)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Scramble({ data, flag }: { data: ScrambleDataType; flag: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      {/* Row 1: Text + Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image */}
        <div
          className={cn(
            "w-full",
            flag ? "md:order-1 md:col-span-2" : "md:order-2 md:col-span-2",
            "order-1 col-span-1" // mobile: always first
          )}
        >
          <ParallaxImage
            alt="img"
            src={data.imageUrl}
            className="object-cover w-full h-full aspect-[4/3] md:aspect-[7/3]" // responsive aspect ratio
            text=""
            disableHoverEffect
            strength={90}
          />
        </div>

        {/* Heading + Subheading */}
        <div
          className={cn(
            "flex flex-col justify-end",
            "order-2", // mobile: centered under image,
            flag
              ? "md:items-end md:text-right md:order-2"
              : "md:items-start md:text-left md:order-1"
          )}
        >
          <p className="text-6xl md:text-[106px] md:leading-28">
            {data.heading}
          </p>
          <p className="text-2xl md:text-[45px] md:leading-10">
            {data.subHeading}
          </p>
        </div>
      </div>

      {/* Row 2: Description + Button */}
      <div
        className={cn(
          "items-center", // mobile: centered
          "flex flex-col py-2",
          flag ? "md:items-end md:text-right" : "md:items-start md:text-left"
        )}
      >
        <p className="text-[#999999] max-w-[920px] md:text-lg mb-6 leading-tight">
          {data.description}
        </p>
        <div className={cn(flag ? "pr-8" : "pl-8")}>
          <AnimateOnViewOnce
            delay={300}
            className="link-highlight link-highlight-brown text-nowrap cursor-pointer"
          >
            <p className="relative inline-block text-lg md:text-2xl text-black px-2 font-normal">
              {data.buttonText}
            </p>
          </AnimateOnViewOnce>
        </div>
      </div>
    </div>
  );
}
