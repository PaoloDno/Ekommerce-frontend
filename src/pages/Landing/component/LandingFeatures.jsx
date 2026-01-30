import { useContext, useMemo } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { FEATURE_CONFIG } from "./featureConfig";

const LandingFeatureComponent = () => {
  const { current } = useTheme();

  const features = useMemo(() => {
    console.log("landingfeture: ", current);
    return FEATURE_CONFIG[current] || FEATURE_CONFIG.default;
  }, [current]);

  const FeatureCard = ({ title, image, link, index}) => {
    console.log("index: ", index);
    
    return (
      <div className={`landing-feature-card`}>
        <div className="landing-feature-card-image in-center overflow-hidden">
          <img src={image} alt={title} className="bg-cover object-cover" />
          <div className="landing-feature-gradient z-20" />
        </div>

        <span className="grid grid-cols-[2fr_1fr] w-full px-2 p-1 text-skin-colorContent items-center">
          <span className="truncate font-accent">{title}</span>
          <a href={link} className="landing-feature-link">
            see more
          </a>
        </span>
      </div>
    );
  };

  return (
    <div className="landing-feature-page-content">
      {features.map((item, index) => (
        <FeatureCard
          key={index}
          index={index}
          title={item.title}
          image={item.image}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default LandingFeatureComponent;
