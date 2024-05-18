import React, { Dispatch, SetStateAction, useCallback } from "react";
import eye from "@/assets/eye-open.svg";
import heart from "@/assets/heart.svg";
import Image from "next/image";

export default function SubHeader({
  setViewOpen,
  setSaveOpen,
  setExportOpen,
}: {
  setViewOpen: Dispatch<SetStateAction<boolean>>;
  setSaveOpen: Dispatch<SetStateAction<boolean>>;
  setExportOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const toggleView = useCallback(() => {
    setViewOpen((prev: boolean) => !prev);
  }, [setViewOpen]);

  const toggleSave = useCallback(() => {
    setSaveOpen((prev: boolean) => !prev);
  }, [setSaveOpen]);

  const toggleExport = useCallback(() => {
    setExportOpen((prev: boolean) => !prev);
  }, [setExportOpen]);

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
        <button
          onClick={toggleSave}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#f2f2f3]"
        >
          <Image src={heart} alt="view colors" /> <p>Save</p>
        </button>
        <button
          onClick={toggleExport}
          className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-[#f2f2f3]"
        >
          <Image src={heart} alt="view colors" /> <p>Export</p>
        </button>
      </div>
    </div>
  );
}
