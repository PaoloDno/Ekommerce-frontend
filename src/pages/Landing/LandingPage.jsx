import LandingFeatureRows from "./component/LandingFeatureDesktop";
import LandingHeroComponent from "./component/LandingHeroComponent";

const LandingPage = () => {

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center">        
        <div className="flex flex-col w-full  z-0 min-h-screen">
          <LandingHeroComponent />
          <LandingFeatureRows />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
