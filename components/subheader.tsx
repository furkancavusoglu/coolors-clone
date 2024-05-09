import React from "react";
import ViewDialog from "./view-dialog";

export default function SubHeader() {
  return (
    <div className="flex items-center justify-between min-h-[theme('spacing.subheaderHeight')] px-4 py-4 z-[5] shadow-sm">
      <p className="opacity-[0.5] hidden lg:block">
        Press the spacebar to generate color palettes!
      </p>
      <div className="flex gap-2 items-center">
        <ViewDialog /> <p>Icon 2</p>
      </div>
    </div>
  );
}
