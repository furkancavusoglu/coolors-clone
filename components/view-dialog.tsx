import React, { useCallback } from "react";
import eye from "@/assets/eye-open.svg";
import Image from "next/image";

export default function ViewDialog() {
  const onViewClick = useCallback(() => {}, []);

  return (
    <button className="flex items-center gap-1 p-1 rounded-md hover:bg-[#f2f2f3]">
      <Image src={eye} alt="view colors" /> <p>View</p>
    </button>
  );
}
