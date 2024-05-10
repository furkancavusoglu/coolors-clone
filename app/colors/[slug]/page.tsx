"use client";

import Color from "@/components/color";
import SubHeader from "@/components/subheader";
import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ViewDialog from "@/components/view-dialog";

export default function Colors({ params }: { params: { slug: string } }) {
  const colors: undefined | string[] = params.slug.split("-");
  const [reorderColors, setReorderColors] = useState(colors);
  const [lockedHexes, setLockedHexes] = useState<string[]>([]);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div>
      <ViewDialog open={viewOpen} setOpen={setViewOpen} colors={reorderColors} />
      <SubHeader setViewOpen={setViewOpen} />
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
