"use client";

import WorkShowcaseGrid1 from "./OurWorkDesktop";
import WorkShowcaseGrid from "./OurWorkMobile";
import React from "react";

export default function Work() {
  return (
    <React.Fragment>
      <div className="md:hidden">
        <WorkShowcaseGrid />
      </div>
      <div className="max-md:hidden">
        <WorkShowcaseGrid1 />
      </div>
    </React.Fragment>
  );
}
