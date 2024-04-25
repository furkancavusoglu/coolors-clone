import React from "react";

export default function SubHeader() {
  return (
    <div className="flex min-h-[theme('spacing.subheaderHeight')] px-4 py-4 z-[5] shadow-sm">
      <p>Press the spacebar to generate color palettes!</p>
      <div className="flex ml-auto gap-2">
        <p>Icon 1</p> <p>Icon 2</p>
      </div>
    </div>
  );
}
