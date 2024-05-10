import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick View</DialogTitle>
        </DialogHeader>
        <div
          className="w-full h-40"
          style={{ backgroundColor: `#${colors[0]}` }}
        ></div>
        <div className="flex gap-0 rounded-lg w-full">
          {colors.map((color: string) => (
            <div
              className="h-16 w-1/5"
              key={color}
              style={{ backgroundColor: `#${color}` }}
            ></div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
