import React, { useMemo, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

export default function Color({
  color,
  colorIndex,
  colors,
  lockedHexes,
  setLockedHexes,
}: {
  color: string;
  colorIndex: number;
  colors: string[];
  lockedHexes: string[];
  setLockedHexes: (value: string[]) => void;
}) {
  const [colorInstance, setColorInstance] = useState<string>(`#${color}`);

  extend([namesPlugin]);
  const colorName = useMemo<string | undefined>(
    () => colord(colorInstance).toName({ closest: true }),
    [colorInstance, colord]
  );

  return (
    <div
      className="lg:w-1/5 lg:h-full w-full h-1/5 relative flex justify-center items-center"
      style={{ backgroundColor: `${colorInstance}` }}
    >
      <div className="lg:absolute lg:items-center lg:pl-0 left-0 flex  flex-col w-full mb-1 pl-4">
        <h3 className="text-xl lg:text-[1.5rem] uppercase font-semibold cursor-pointer text-left">
          {colorInstance.replace(/^#/, "")}
        </h3>
        <p className="text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px]">
          {`~${colorName}`}
        </p>
      </div>
    </div>
  );
}
