import React from "react";
import {
  CopyIcon,
  LockIcon,
  CancelIcon,
  DragIcon,
  OpenIcon,
} from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleIconColor } from "@/lib/utils";

export default function Options({ color }: { color: string }) {
  const iconColor = handleIconColor(color);
  return (
    <div className="flex flex-row gap-1 lg:gap-2 lg:flex-col">
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>
            <CancelIcon currentColor={iconColor} />
          </TooltipTrigger>
          <TooltipContent>Delete Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>
            <CopyIcon currentColor={iconColor} />
          </TooltipTrigger>
          <TooltipContent>Copy Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>
            <DragIcon currentColor={iconColor} />
          </TooltipTrigger>
          <TooltipContent>Drag Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>
            <LockIcon currentColor={iconColor} />
          </TooltipTrigger>
          <TooltipContent>Lock Color</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
