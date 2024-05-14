"use client";

import Color from "@/components/color";
import SubHeader from "@/components/subheader";
import { Reorder } from "framer-motion";
import React, { useState, KeyboardEvent, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ViewDialog from "@/components/view-dialog";
import SaveDialog from "@/components/save-dialog";
import { generateRandomColors } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Colors({ params }: { params: { slug: string } }) {
  const colors: undefined | string[] = params.slug.split("-");
  const [reorderColors, setReorderColors] = useState(colors);
  const [lockedHexes, setLockedHexes] = useState<string[]>([]);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [saveOpen, setSaveOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();

  const handleGenerateNewPalette = useCallback(
    (e: KeyboardEvent<HTMLDivElement>, eventType: string) => {
      if (
        eventType === "keydown" &&
        (e as KeyboardEvent<HTMLDivElement>).key !== " " &&
        (e as KeyboardEvent<HTMLDivElement>).key !== "Spacebar"
      ) {
        return;
      }
      const randomColors = generateRandomColors();
      const allColors = [...lockedHexes, ...randomColors];

      if (allColors.length >= 5) {
        const routeParam = allColors
          .slice(0, 5)
          .map((color) => color.replace("#", ""))
          .join("-");
        if (eventType === "keydown") {
          router.replace(`/colors/${routeParam}`);
        }
      }
    },
    [lockedHexes, router]
  );

  return (
    <div
      className="outline-none"
      tabIndex={0}
      onKeyDown={(e) => handleGenerateNewPalette(e, "keydown")}
    >
      <ViewDialog
        open={viewOpen}
        setOpen={setViewOpen}
        colors={reorderColors}
      />
      <SaveDialog
        open={saveOpen}
        setOpen={setSaveOpen}
        colors={reorderColors}
      />
      <SubHeader setViewOpen={setViewOpen} setSaveOpen={setSaveOpen} />
      <Reorder.Group
        axis={isDesktop ? "x" : "y"}
        values={reorderColors}
        onReorder={setReorderColors}
        className="flex lg:flex-row flex-col h-screen
      lg:h-[calc(100vh-theme('spacing.headerHeight')-theme('spacing.subheaderHeight'))]"
      >
        {reorderColors.map((color: string, index: number) => (
          <Color
            key={color}
            colorIndex={index}
            color={color}
            colors={reorderColors}
            lockedHexes={lockedHexes}
            setLockedHexes={setLockedHexes}
          />
        ))}
      </Reorder.Group>
    </div>
  );
}
