import LandingHeroComponent from "./component/LandingHeroComponent";

const LandingPage = () => {

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center">        
        <div className="landing-page-section-mobile">
          <LandingHeroComponent />
        </div>
      </div>
      {/*
      <div className="page-background"></div>
      */}
    </div>
  );
};

export default LandingPage;
