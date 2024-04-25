import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { colord, extend } from "colord";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleColorTextClass = (color: string) => {
  return colord(color).isReadable("white") ? "text-white" : "text-black";
};

export const handleIconColor = (color: string) => {
  return colord(color).isReadable("white") ? "white" : "black";
};
