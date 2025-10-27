import React, { useState } from "react";
import ProductImages from "../../../components/ImagesComponent/components/ProductImageComponent";


export default function ProductGallery({ images }) {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(images[(currentIndex + i) % images.length]);
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-3 w-full h-auto relative">
      <div
        className="aspect-square w-full overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNext}
      >
        <ProductImages productImages={visibleImages[0]} />
      </div>

      <div className="flex flex-row md:flex-col gap-3">
        <div
          className="aspect-square flex-1 overflow-hidden rounded-lg cursor-pointer"
          onClick={handleNext}
        >
          <ProductImages productImages={visibleImages[1]} />
        </div>
        <div
          className="aspect-square flex-1 overflow-hidden rounded-lg cursor-pointer"
          onClick={handleNext}
        >
          <ProductImages productImages={visibleImages[2]} />
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
      >
        ›
      </button>
    </div>
  );
}
