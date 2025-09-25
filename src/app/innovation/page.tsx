"use client";

import CollabAndTestimonials from "./collabAndTestimonials";
import ScrambleSection from "./scramble";
import OurPress from "./ourPress";
import Hero from "./hero";
import Tabs from "./tabs";

export default function TempPage() {
  return (
    <section>
      <Hero />
      <div className="relative">
        {/* <Tabs /> */}
        <ScrambleSection />
        {/* <CollabAndTestimonials />
        <OurPress /> */}
      </div>
    </section>
  );
}
