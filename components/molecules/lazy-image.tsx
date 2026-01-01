"use client";

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function LazyImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <LazyLoadImage {...props} />;
}
