import img1 from "../component/images/hero1.jpg";
import img2 from "../component/images/hero2.jpg";
import img3 from "../component/images/hero3.jpg";
import img4 from "../component/images/hero4.jpg";
import img5 from "../component/images/hero5.jpg";
import img6 from "../component/images/hero6.jpg";


import LandingHeroCarouselComponent from "./LandingHeroCarouselComponent";

const LandingHeroComponent = ({ tagline, caption }) => {
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
    <div className="landing-hero-section-mobile relative">
      <div className="absolute inset-0 bottom-0 h-[30vh] bg-gradient-back-transparent w-full  -z-10" />

      <div className="relative top-2 w-full h-[55vh] z-10">
        <LandingHeroCarouselComponent
          items={heroItems}
          itemsPerView={1}
        />

        {/* gradient overlay */}
        <div className="flex text-black relative w-full h-[40vh] items-center justify-center -z-10 bg-yellow-200">
          feature post sadasda
        </div>
      </div>
    </div>
  );
};

export default LandingHeroComponent;
