import React, { useMemo, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { handleColorTextClass } from "@/lib/utils";
import Options from "./options";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { columnChildVariant, columnVariant } from "@/variants";

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

  const textColor = useMemo<string>(
    () => handleColorTextClass(colorInstance),
    [colorInstance]
  );

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={"start"}
      whileHover={"show"}
      variants={columnVariant}
      className="lg:w-1/5 lg:h-full lg:p-0 w-full pr-4 h-1/5 relative flex 
      flex-row justify-center items-center"
      style={{ backgroundColor: `${colorInstance}` }}
    >
      <div className="lg:absolute lg:items-center bottom-14 left-0 flex flex-col w-full mb-1 pl-4">
        <h3
          className={`text-xl lg:text-[1.5rem] uppercase font-semibold 
        cursor-pointer text-left ${textColor}`}
        >
          {colorInstance.replace(/^#/, "")}
        </h3>
        <p
          className={`text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] ${textColor}`}
        >
          {`~${colorName}`}
        </p>
      </div>
      
      {isDesktop ? (
        <motion.div variants={columnChildVariant}>
          <Options color={colorInstance} />
        </motion.div>
      ) : (
        <Options color={colorInstance} />
      )}
    </motion.div>
  );
}
