import { useEffect, useState, useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingHeroCarouselMobileComponent = ({
  items = [],
  itemsPerView = 1,
  interval = 10500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const timerRef = useRef(null); // <-- timer ref
  const [isVisible, setIsVisible] = useState(false);

  const totalItems = items.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const { changeTheme } = useTheme();
  const { token } = useSelector((state) => state.auth);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isVisible && totalItems > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((index) => (index === maxIndex ? 0 : index + 1));
      }, interval);
    }
  };

  const prevSlide = () => {
    setCurrentIndex((index) => (index === 0 ? maxIndex : index - 1));
    resetTimer(); 
  };

  const nextSlide = () => {
    setCurrentIndex((index) => (index === maxIndex ? 0 : index + 1));
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
      {
        root: null,
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    resetTimer(); // <-- start timer on mount & visibility change
    return () => clearInterval(timerRef.current);
  }, [isVisible, totalItems, maxIndex, interval]);

  useEffect(() => {
    if (!isVisible) return;
    const activeItem = items[currentIndex];
    if (activeItem?.theme) changeTheme(activeItem.theme);
  }, [currentIndex, items, changeTheme, isVisible]);

  if (!totalItems) return null;

  const activeItem = items[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden" ref={carouselRef}>
      {/* ARROWS */}
      <button onClick={prevSlide} className="landing-hero-slide-button left-1">
        <FaArrowCircleLeft size={28} />
      </button>

      <button onClick={nextSlide} className="landing-hero-slide-button right-1">
        <FaArrowCircleRight size={28} />
      </button>

      {/* SLIDES */}
      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 h-[30vh] bg-cover bg-center w-full"
            style={{ width: `${100 / itemsPerView}%`, backgroundImage: `url(${item.image})` }}
          />
        ))}
      </div>

      {/* FEATURED OVERLAY */}
      {activeItem && (
        <div className="absolute top-1/2 left-1/2 -translate-x-2/3 -translate-y-2/3 w-[70%] h-[20vh] flex flex-col justify-center gap-2 bg-skin-primary bg-opacity-35 backdrop-blur-sm z-10 overflow-hidden">
          <h1 className="font-display text-styleh4 p-2 bg-skin-primary bg-opacity-70">{activeItem.title}</h1>
          <p className="font-Receipt text-stylep3 p-2 bg-skin-primary bg-opacity-65">{activeItem.description}</p>
        </div>
      )}

      {/* SLIDE INDICATORS */}
      <div className="flex flex-col w-full h-[15vh] bg-opacity-30 items-center justify-end p-2 text-skin-color1">
        <div className="flex flex-row space-x-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`px-2 py-1 rounded text-stylep4 transition ${
                index === currentIndex
                  ? "bg-skin-primary text-skin-color1 rounded-full"
                  : "bg-skin-secondary/60 text-skin-color2 hover:bg-white/80 rounded-none"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* LOGIN MESSAGE */}
      <div className="w-full text-stylep4 h-[10vh] p-2 flex flex-row justify-center px-4">
        {!token ? (
          <span className="flex flex-col in-center text-sm text-skin-color1 opacity-90">
            <Link className="bg-skin-green rounded-3xl text-skin-color1 p-2 px-4" to="/login">
              Sign in
            </Link>
            to personalize your shopping experience
          </span>
        ) : (
          <span className="text-sm text-skin-color1 opacity-90">Welcome back — happy browsing</span>
        )}
      </div>
    </div>
  );
};


export default LandingHeroCarouselMobileComponent;
