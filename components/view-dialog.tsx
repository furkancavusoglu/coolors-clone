import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import { handleColorTextClass, handleIconColor } from "@/lib/utils";

extend([namesPlugin]);

export default function ViewDialog({
  open,
  setOpen,
  colors,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  colors: string[];
}) {
  const [viewColor, setViewColor] = useState(`#${colors[0]}`);

  const colorTextLumi = handleColorTextClass(viewColor);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick View</DialogTitle>
        </DialogHeader>
        <div
          className={`no-scrollbar overflow-auto max-h-52 font-medium m-0 p-3 w-full ${colorTextLumi}`}
          style={{ backgroundColor: viewColor }}
        >
          <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
            <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">name</h4>
            <p className="text-sm font-medium capitalize">
              ~{colord(viewColor).toName({ closest: true })}
            </p>
          </div>
          <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
            <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">Hex</h4>
            <p className="text-sm font-medium">{colord(viewColor).toHex()}</p>
          </div>

          <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
            <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">HSL</h4>
            <p className="text-sm font-medium">
              {colord(viewColor).toHslString()}
            </p>
          </div>

          <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
            <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">RGB</h4>
            <p className="text-sm font-medium">
              {colord(viewColor).toRgbString()}
            </p>
          </div>
        </div>
        <div className="flex">
          {colors.map((color: string) => (
            <div
              className={`cursor-pointer flex-1 flex justify-center items-center 
              h-16 w-fit first:rounded-l-lg last:rounded-r-lg`}
              key={color}
              style={{ backgroundColor: `#${color}` }}
              onClick={() => setViewColor(`#${color}`)}
            >
              {viewColor === `#${color}` && (
                <div
                  className={`h-2 w-2 rounded-full 
                ${
                  handleIconColor(`#${color}`) === "white"
                    ? "bg-white"
                    : "bg-black"
                }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
