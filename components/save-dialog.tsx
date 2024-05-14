import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function SaveDialog({
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
          <DialogTitle>Save</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
