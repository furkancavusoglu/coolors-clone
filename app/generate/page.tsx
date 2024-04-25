"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";

export default function Generate() {
  const router = useRouter();

  const generateRandomColors = useMemo(
    () =>
      randomColor({
        hue: "random",
        luminosity: "random",
        count: 5,
      }),
    [randomColor]
  );

  const colorsRoute = useMemo(
    () => generateRandomColors.map((color: string) => color.slice(1)).join("-"),
    [generateRandomColors]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`/colors/${colorsRoute}`);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="bg-white h-[calc(100vh-theme('spacing.headerHeight'))] 
    w-screen overflow-hidden flex justify-center items-center"
    >
      <div
        className="border-gray-300 h-12 w-12 rounded-full border-2 
      border-t-black animate-spin"
      ></div>
    </div>
  );
}
