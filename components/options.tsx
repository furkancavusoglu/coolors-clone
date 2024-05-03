import React, { Fragment, useCallback, useMemo } from "react";
import { CopyIcon, LockIcon, CancelIcon, DragIcon } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleIconColor } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { DragControls } from "framer-motion";

export default function Options({
  color,
  lockedHexes,
  controls,
}: {
  color: string;
  lockedHexes: string[];
  controls: DragControls;
}) {
  const { slug } = useParams<{ slug: string }>();
  const iconColor = handleIconColor(color);
  const router = useRouter();
  const colors: string[] = useMemo(() => slug.split("-"), [slug]);
  const { toast } = useToast();

  const handleRemoveColor = useCallback(
    (colorToRemove: string) => {
      const newColors = colors.filter(
        (color: string) => color !== colorToRemove.slice(1)
      );
      router.replace(`/colors/${newColors.join("-")}`);
    },
    [colors, router, color]
  );

  const handleCopyColor = useCallback(
    (colorToCopy: string) => {
      navigator.clipboard
        .writeText(`${colorToCopy}`)
        .then(() => {
          toast({
            description: `Color copied to clipboard successfully!`,
            duration: 2000,
          });
        })
        .catch((err) => {
          console.error("Could not copy color: ", err);
        });
    },
    [toast]
  );

  return (
    <div className="flex flex-row gap-1 lg:gap-2 lg:flex-col">
      {colors.length > 2 && (
        <div onClick={() => handleRemoveColor(color)}>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <CancelIcon currentColor={iconColor} />
              </TooltipTrigger>
              <TooltipContent>Delete Color</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <div onClick={() => handleCopyColor(color)}>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              <CopyIcon currentColor={iconColor} />
            </TooltipTrigger>
            <TooltipContent>Copy Color</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger>
            <div onPointerDown={(e) => controls.start(e)}>
              <DragIcon currentColor={iconColor} />
            </div>
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
