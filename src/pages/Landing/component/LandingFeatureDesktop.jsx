import { useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FEATURE_CONFIG } from "./featureConfig";
import { Link } from "react-router-dom";

const LandingFeatureRows = () => {
  const { current } = useTheme();

  // Convert object → array & move active theme to top
  const rows = useMemo(() => {
    const entries = Object.entries(FEATURE_CONFIG);

    const active = entries.find(([key]) => key === current);
    const rest = entries.filter(([key]) => key !== current);

    return active ? [active, ...rest] : entries;
  }, [current]);

    const sectionsheadlines = {
    default: "sports wear for everybody",
    coffee: "daily coffee essentials",
    dark: "tailored for every occasion",
    sakura: "seasonal picks & fresh styles",
    dark2: "gear up your game",
    forest: "fresh picks for everyday living",
  };
    

  const FeatureRow = ({ themeId, items, isActive }) => {
    return (
      <div
        className={`
        transition-all duration-700 ease-out flex flex-col md:items-center justify-start md:in-center min-w-full
        ${isActive ? "scale-[1.02]" : "opacity-90"}
      `}
      >
        <h3 className="px-2 pl-4 mb-3 text-styleh4 capitalize
        text-skin-color1 font-sans"
        >{sectionsheadlines[themeId]}</h3>

        <div className="flex gap-4 overflow-x-auto px-2">
          {items.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              image={item.image}
              link={item.link}
            />
          ))}
        </div>
      </div>
    );
  };
  const FeatureCard = ({ title, image, link }) => {
    return (
      <div className="landing-feature-card min-w-[230px]">
        <div className="landing-feature-card-image relative">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="landing-feature-gradient absolute inset-0 z-10" />
        </div>

        <div className="grid grid-cols-[2fr_1fr] px-2 py-1 items-center">
          <span className="truncate font-accent text-stylep2">{title}</span>
          <span className="flex w-full items-center justify-end">
          <Link to={`products/category/${link}`} className="landing-feature-link">
            see more
          </Link>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-7 pt-5 items-center justify-start md:in-center w-full min-h-screen">
      {rows.map(([themeId, items]) => (
        <FeatureRow
          key={themeId}
          themeId={themeId}
          items={items}
          isActive={themeId === current}
        />
      ))}
    </div>
  );
};

export default LandingFeatureRows;
