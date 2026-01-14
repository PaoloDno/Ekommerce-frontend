import { useRef, useState, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingHeroCarouselDesktopComponent = ({
  items = [],
  itemsPerView = 1,
  interval = 12500,
}) => {
  const carouselRef = useRef(null);
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const { token } = useSelector((state) => state.auth);
  const { changeTheme } = useTheme();

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isVisible && totalItems > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
      }, interval);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((index) => (index === 0 ? maxIndex : index - 1));
    resetTimer();
  };

  const nextSlide = () => {
    setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
    resetTimer();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [isVisible, totalItems, maxIndex, interval]);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!isVisible) return;
    const activeItem = items[currentIndex];
    if (activeItem?.theme) changeTheme(activeItem.theme);
  }, [currentIndex, items, changeTheme, isVisible]);

  if (!totalItems) return null;
  const activeItem = items[currentIndex];

  return (
    <div ref={carouselRef} className="relative w-full h-full overflow-hidden">
      {/* Arrows */}
      <button onClick={prevSlide} className="landing-hero-slide-button left-1">
        <FaArrowCircleLeft size={28} />
      </button>
      <button onClick={nextSlide} className="landing-hero-slide-button right-1">
        <FaArrowCircleRight size={28} />
      </button>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-[82vh] bg-[center-top] bg-cover object-cover"
            style={{
              width: `${100 / itemsPerView}%`,
              backgroundImage: `url(${item.image})`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full h-1/2 bg-gradient-back-transparent blur-md opacity-25" />
      <div className="absolute top-0 left-0 z-10 w-[45%] lg:w-[70%] h-full bg-skin-color-back bg-opacity-15 rounded-r-full pr-20 border-gray-500/10 border-2">
        <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-2xl bg-skin-primary/15 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-2xl bg-skin-fill-5/5 blur-xl -z-10" />
      </div>
      {activeItem && (
        <div
          className="absolute p-3 top-1/4 left-5 flex-shrink-0 items-start justify-start
          w-[45%] lg:w-[40%] h-[24vh] flex flex-col gap-2 bg-skin-colorContent text-skin-colorContent rounded-3xl
          bg-opacity-75 backdrop-blur-sm z-30 overflow-hidden pl-4 md:pl-10 lg:pl-2"
        >
          <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl -z-10" />
          <h1 className="font-display w-full text-styleh3 p-2 truncate">
            {activeItem.title}
          </h1>
          <p className="font-Receipt w-full text-stylep3 p-2">
            {activeItem.description}
          </p>
        </div>
      )}

      <div
        className="absolute bottom-20 left-5 w-[45%] lg:w-[40%] in-center z-30 text-stylep4 min-h-[10vh] rounded-xl
        py-1 flex flex-row justify-center bg-skin-primary bg-opacity-5 backdrop-blur-sm pl-4 md:pl-10 lg:pl-2"
      >
        {!token ? (
          <span className="flex flex-col w-full in-center text-sm text-skin-colorContent opacity-90 py-2">
            <Link
              className="rounded-3xl relative text-skin-colorHigh overflow-hidden bg-skin-fill-4 py-2 m-2 px-4 text-stylep1 capitalize items-center justify-center text-center flex min-w-[130px]"
              to="/login"
            >
              <div className="absolute inset-0 w-full h-full rounded-2xl bg-white/10 blur-xl z-10 " />
              Sign in
            </Link>
            <span className="flex w-full bg-skin-primary text-skin-color1 px-2 bg-opacity-70 p-1">
              to personalize your shopping experience
            </span>
          </span>
        ) : (
          <span className="text-stylep3 w-full text-skin-colorContent bg-skin-colorContent rounded-full bg-opacity-70 p-2 px-3">
            Welcome back — happy browsing
          </span>
        )}
      </div>
    </div>
  );
};

export default LandingHeroCarouselDesktopComponent;
