import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carousel({
  items,
  renderItem,
  itemsPerView = 1,
  interval = 5000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = items.length;
  const maxindex = Math.max(0, totalItems - itemsPerView);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxindex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === maxindex ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer); // cleanup
  }, [currentIndex, interval, maxindex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 items-center"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-image-slide"
            style={{ width: `${100 / itemsPerView}%` }}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="left-3 carousel-button-styles">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="right-3 carousel-button-styles">
        <FaChevronRight />
      </button>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-skin-end to-transparent pointer-events-none"></div>
    </div>
  );
}
