import React, { useCallback, useMemo } from "react";
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
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { DragControls } from "framer-motion";

export default function Options({
  color,
  lockedHexes,
  setLockedHexes,
  controls,
}: {
  color: string;
  lockedHexes: string[];
  controls: DragControls;
  setLockedHexes: (value: string[]) => void;
}) {
  const isLocked = lockedHexes?.includes(color);
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

  const handleToggleLock = useCallback(() => {
    if (lockedHexes.includes(color)) {
      setLockedHexes(lockedHexes.filter((hex) => hex !== color));
    } else {
      setLockedHexes([...lockedHexes, color]);
    }
  }, [lockedHexes, color, setLockedHexes]);

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

      <div onClick={handleToggleLock}>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger>
              {isLocked ? (
                <LockIcon currentColor={iconColor} />
              ) : (
                <OpenIcon currentColor={iconColor} />
              )}
            </TooltipTrigger>
            <TooltipContent>Lock Color</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
