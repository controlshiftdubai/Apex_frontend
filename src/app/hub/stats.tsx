"use client";

import { cn } from "@/lib/utils";

const stats: StatItem[] = [
  {
    heading: "Why",
    content:
      "We listen to your needs and explore the market to uncover meaningful opportunities that have the power to change the world.",
  },
  {
    heading: "What",
    content:
      "We work across every aspect of a project to define an ownable visual language and develop powerful experiences that inspire your audience.",
  },
  {
    heading: "How",
    content:
      "We collaborate closely with your team utilising a proven step-by-step process to deliver market-ready products and experiences that push boundaries.",
  },
];

export default function StatsSection() {
  return (
    <section
      className={cn(
        "w-full px-6 bg-[#FFEADB]",
        "md:h-[340px] max-md:py-5 flex justify-between items-center"
      )}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 max-w-6xl w-full mx-auto">
        {stats.map((s, i) => (
          <Stat key={i} heading={s.heading} content={s.content} />
        ))}
      </div>
    </section>
  );
}

export type StatItem = {
  heading: string;
  content: string;
};

function Stat({ heading, content }: StatItem) {
  return (
    <div className="text-center aspect-[7/5] w-80  flex flex-col items-center justify-center">
      <div className="text-4xl md:text-5xl tracking-tight">{heading}</div>
      <div className="mt-5 text-[17px] text-[#999999] leading-tight">
        {content}
      </div>
    </div>
  );
}
