import React, { Dispatch, SetStateAction } from "react";
import eye from "@/assets/eye-open.svg";
import Image from "next/image";

export default function SubHeader({
  setViewOpen,
}: {
  setViewOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const toggleView = () => {
    setViewOpen((prev: boolean) => !prev);
  };

  return (
    <div className="flex items-center justify-between min-h-[theme('spacing.subheaderHeight')] px-4 py-4 z-[5] shadow-sm">
      <p className="opacity-[0.5] hidden lg:block">
        Press the spacebar to generate color palettes!
      </p>
      <div className="flex gap-2 items-center">
        <button
          onClick={toggleView}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#f2f2f3]"
        >
          <Image src={eye} alt="view colors" /> <p>View</p>
        </button>
      </div>
    </div>
  );
}
