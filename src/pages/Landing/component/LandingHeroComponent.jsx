import img1 from "../component/images/hero1.jpg";
import img2 from "../component/images/hero2.jpg";
import img3 from "../component/images/hero3.jpg";
import img4 from "../component/images/hero4.jpg";
import img5 from "../component/images/hero5.jpg";
import img6 from "../component/images/hero6.jpg";
import LandingHeroCarouselDesktopComponent from "./LandingHeroCarouselDesktopComponent";

import LandingHeroCarouselMobileComponent from "./LandingHeroCarouselMobileComponent";

const LandingHeroComponent = () => {
  const heroItems = [
    {
      image: img1,
      title: "Modern Ecommerce",
      description: "A demo project showcasing my full-stack development skills",
      theme: "default",
    },
    {
      image: img2,
      title: "Clean UI Design",
      description: "Focused on usability, performance, and visual clarity",
      theme: "coffee",
    },
    {
      image: img3,
      title: "Dark Mode Experience",
      description: "A sleek dark interface designed for low-light comfort",
      theme: "dark",
    },
    {
      image: img4,
      title: "Sakura Aesthetic",
      description: "Soft colors inspired by spring and minimal elegance",
      theme: "sakura",
    },
    {
      image: img6,
      title: "Deep Contrast UI",
      description: "Bold highlights with improved readability and balance",
      theme: "dark2",
    },
    {
      image: img5,
      title: "Forest Inspired Design",
      description: "Nature-driven colors for a calm browsing experience",
      theme: "forest",
    },
    {
      image: img1,
      title: "Responsive Layout",
      description: "Optimized for mobile, tablet, and desktop devices",
      theme: "default",
    },
    {
      image: img2,
      title: "Component-Driven UI",
      description: "Reusable components built with scalability in mind",
      theme: "coffee",
    },
    {
      image: img5,
      title: "Theme Switching Ready",
      description: "Instant theme changes without page reloads",
      theme: "forest",
    },
  ];

  return (
    <div
      className="flex flex-row w-full min-h-[62vh] relative
      text-skin-color1 text-styleh3 font-accent "
    >
      <div
        className="flex flex-row w-full h-[62vh] relative
        text-skin-color1 text-styleh3 font-accent md:hidden"
      >
        <div className="absolute h-[100%] rotate-180 opacity-20 right-0 
             top-0 bg-gradient-back-transparent w-full -z-10" />

        <div className="relative top-5 w-full h-[58vh] z-10 ">
          <LandingHeroCarouselMobileComponent
            items={heroItems}
            itemsPerView={1}
          />
        </div>
      </div>
      <div
      className="md:flex flex-row w-full h-[85vh] relative
        text-skin-color1 text-styleh3 font-accent hidden"
      >
      <div className="relative top-5 w-full h-[82vh] z-10 mb-6">
        <LandingHeroCarouselDesktopComponent
            items={heroItems}
            itemsPerView={1}
          />
      </div>
      </div>
    </div>
  );
};

export default LandingHeroComponent;
