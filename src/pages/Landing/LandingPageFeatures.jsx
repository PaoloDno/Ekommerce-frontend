import React from "react";
import img from "./LandingImage/carousel.jpg";

const LandingFeatureComponent = () => {
  return (
    <div className="feature-page-content text-skin-colorDis pb-10">
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
      <div className="feature-card">
        <div className="feature-card-image">
          <img src={img} alt="image" className="bg-cover" />
          <div className="feature-gradient"></div>
        </div>
        <span className="flex w-full p-2 flex-row">
          <spam>Title</spam><span className="feature-card-link">see more</span>
        </span>
      </div>
    </div>
  );
};

export default LandingFeatureComponent;
