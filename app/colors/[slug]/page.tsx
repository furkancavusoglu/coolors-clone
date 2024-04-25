"use client";

import Color from "@/components/color";
import SubHeader from "@/components/subheader";
import React from "react";

export default function Colors({ params }: { params: { slug: string } }) {
  const colors: undefined | string[] = params.slug.split("-");

  return (
    <div>
      <SubHeader />
      <div
        className="flex lg:flex-row flex-col h-screen
      lg:h-[calc(100vh-theme('spacing.headerHeight')-theme('spacing.subheaderHeight'))]"
      >
        {colors.map((color, index) => (
          <Color key={index} colorIndex={index} color={color} colors={colors} />
        ))}
      </div>
    </div>
  );
}
