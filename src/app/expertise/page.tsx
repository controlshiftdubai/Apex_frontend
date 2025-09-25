"use client";

import Carousels from "./carousels";
import Hero from "./hero";
import Tabs from "./tabs";

export default function ExpertisePage() {
  return (
    <section>
      <Hero />
      <div className="relative">
        <Tabs />
        <Carousels />
      </div>
    </section>
  );
}
