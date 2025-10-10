"use client";
import WorkShowcaseStickyScroll from "./WorkShowcaseStickyScroll";
import ExpertiseSection from "./ExpertiseSection";
import WorkShowcaseSlider from "./OurWork";
import SliderOne from "./SliderOne";
import SearchSection from "./SearchSection";

export default function Home() {
  return (
    <div>
      <h1 className="hidden sr-only">Dubai City Sightseeing tour Package</h1>
      <SliderOne />
      <WorkShowcaseSlider />
      <SearchSection /> {/* New search section added here */}
      <WorkShowcaseStickyScroll />
      <ExpertiseSection />
    </div>
  );
}
