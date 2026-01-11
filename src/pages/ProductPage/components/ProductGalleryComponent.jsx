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

  const visibleImages = [
    images[currentIndex],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 w-full h-[50vh] md:h-[60vh] lg:h-[72vh] relative">
      {/* Big left */}
      <div
        className="row-span-2 col-span-2 w-full h-full overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNext}
      >
        <ProductImages productImages={visibleImages[0]} />
      </div>

      {/* Right top (50%) */}
      <div
        className="w-full h-[50%] md:h-full overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNext}
      >
        <ProductImages productImages={visibleImages[1]} />
      </div>

      {/* Right bottom (50%) */}
      <div
        className="w-full h-[50%] md:h-full overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNext}
      >
        <ProductImages productImages={visibleImages[2]} />
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
      >
        ›
      </button>
    </div>
  );
}
