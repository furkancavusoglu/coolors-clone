import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick View</DialogTitle>
        </DialogHeader>
        <div
          className="w-full h-40 rounded"
          style={{ backgroundColor: viewColor }}
        ></div>
        <div className="flex">
          {colors.map((color: string, index: number) => (
            <button
              className={`h-16 w-1/5 ${index === 0 ? "rounded-l" : ""} ${
                index === colors.length - 1 ? "rounded-r" : ""
              }`}
              key={color}
              style={{ backgroundColor: `#${color}` }}
              onClick={() => setViewColor(`#${color}`)}
            ></button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
