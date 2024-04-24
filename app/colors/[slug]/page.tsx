import React from "react";

export default function Colors({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
