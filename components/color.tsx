import React, { useCallback, useMemo, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { handleColorTextClass } from "@/lib/utils";
import Options from "./options";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Reorder, motion, useDragControls } from "framer-motion";
import { columnChildVariant, columnVariant } from "@/variants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactGPicker from "react-gcolor-picker";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

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
  extend([namesPlugin]);
  const [colorInstance, setColorInstance] = useState<string>(`#${color}`);
  const [draggable, setDraggable] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const controls = useDragControls();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const colorName = useMemo<string | undefined>(
    () => colord(colorInstance).toName({ closest: true }),
    [colorInstance]
  );

  const textColor = useMemo<string>(
    () => handleColorTextClass(colorInstance),
    [colorInstance]
  );

  const handleColorChange = useCallback(
    (value: string) => {
      const colorIndex = colors.findIndex((hex) => hex === color);
      colors[colorIndex] = value.slice(1);
      const newColorSlug = colors.join("-");
      router.replace(`/colors/${newColorSlug}`);
    },
    [color, colors, router]
  );

  const onClickOutside = useCallback(() => {
    if (isDesktop) {
      setShowColorPicker(false);
    }
  }, [isDesktop]);

  const ref = useClickOutside(onClickOutside);

  return (
    <Reorder.Item
      initial={"start"}
      whileHover={"show"}
      variants={columnVariant}
      className="h-full lg:p-0 w-full pr-4 relative flex 
      flex-row justify-center items-center"
      style={{ backgroundColor: `${colorInstance}` }}
      key={color}
      value={color}
      dragListener={draggable}
      dragControls={controls}
      ref={ref}
    >
      {showColorPicker && isDesktop && (
        <div className="p-2 bottom-28 absolute z-50">
          <ReactGPicker
            value={colorInstance}
            onChange={handleColorChange}
            format="hex"
            key={colorInstance}
          />
        </div>
      )}
      <div
        className="lg:absolute lg:items-center lg:pl-0 bottom-14 left-0 
      flex flex-col w-full mb-1 pl-4"
      >
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <h3
                className={`text-xl lg:text-[1.5rem] uppercase font-semibold 
        cursor-pointer text-left ${textColor}`}
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                {isDesktop ? (
                  colorInstance.replace(/^#/, "")
                ) : (
                  <Drawer>
                    <DrawerTrigger>
                      {colorInstance.replace(/^#/, "")}
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto py-2">
                        <ReactGPicker
                          value={colorInstance}
                          onChange={handleColorChange}
                          format="hex"
                          key={colorInstance}
                          popupWidth={window.innerWidth - 50}
                        />
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
              </h3>
            </TooltipTrigger>
            <TooltipContent>Select Color</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p
          className={`text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] ${textColor}`}
        >
          {`~${colorName}`}
        </p>
      </div>

      {isDesktop ? (
        <motion.div variants={columnChildVariant}>
          <Options
            color={colorInstance}
            controls={controls}
            lockedHexes={lockedHexes}
            setLockedHexes={setLockedHexes}
          />
        </motion.div>
      ) : (
        <Options
          color={colorInstance}
          controls={controls}
          lockedHexes={lockedHexes}
          setLockedHexes={setLockedHexes}
        />
      )}
    </Reorder.Item>
  );
}
