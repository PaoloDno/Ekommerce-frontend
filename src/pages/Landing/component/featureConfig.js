// featureConfig.js
import sportsImg from "./images/hero1.jpg";
import coffeeImg from "./images/hero2.jpg";
import suitImg from "./images/hero3.jpg";
import sakuraImg from "./images/hero4.jpg";
import gamingImg from "./images/hero5.jpg";
import produceImg from "./images/hero6.jpg";

export const FEATURE_CONFIG = {
  default: [
    { title: "Running Shoes", image: sportsImg, link: "/" },
    { title: "Active Wear", image: sportsImg, link: "/" },
    { title: "Fitness Gear", image: sportsImg, link: "/" },
    { title: "Accessories", image: sportsImg, link: "/" },
  ],

  coffee: [
    { title: "Coffee Beans", image: coffeeImg, link: "/" },
    { title: "Merch", image: coffeeImg, link: "/" },
    { title: "Brewing Tools", image: coffeeImg, link: "/" },
    { title: "Gift Sets", image: coffeeImg, link: "/" },
  ],

  dark: [
    { title: "Suits", image: suitImg, link: "/" },
    { title: "Watches", image: suitImg, link: "/" },
    { title: "Leather Shoes", image: suitImg, link: "/" },
    { title: "Accessories", image: suitImg, link: "/" },
  ],

  sakura: [
    { title: "Ornaments", image: sakuraImg, link: "/" },
    { title: "Decor", image: sakuraImg, link: "/" },
    { title: "Stationery", image: sakuraImg, link: "/" },
    { title: "Gifts", image: sakuraImg, link: "/" },
  ],

  dark2: [
    { title: "Gaming Laptops", image: gamingImg, link: "/" },
    { title: "PC Builds", image: gamingImg, link: "/" },
    { title: "Peripherals", image: gamingImg, link: "/" },
    { title: "Accessories", image: gamingImg, link: "/" },
  ],

  forest: [
    { title: "Fresh Produce", image: produceImg, link: "/" },
    { title: "Organic Goods", image: produceImg, link: "/" },
    { title: "Local Products", image: produceImg, link: "/" },
    { title: "Bundles", image: produceImg, link: "/" },
  ],
};
