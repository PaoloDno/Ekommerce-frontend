
import Carousel from "../../components/Carousel/Carousel";
import LandingFeatureComponent from "./LandingPageFeatures";

import img1 from "../../components/Carousel/images/carousel.jpg";
import img2 from "../../components/Carousel/images/carousel2.jpg";

const LandingPage = () => {
  
  const images = [img1, img2];
  
  return (
    <div className="page-section">
      <div className="page-body">
      <Carousel
        items={images}
        itemsPerView={1}
        renderItem={(img) => (
          <img src={img} alt="Slide" className="carousel-image" />
        )}
      />

      <LandingFeatureComponent />

      </div>
      <div className="page-background"></div>
    </div>
  )
};

export default LandingPage;
