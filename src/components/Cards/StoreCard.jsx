import { useNavigate } from "react-router-dom";
import BannerImage from "../ImagesComponent/components/BannerImageComponent";
import StoreImage from "../ImagesComponent/components/StoreImageComponent";
import { FaCheck, FaStar } from "react-icons/fa";

const StoreCards = ({ store }) => {
  const {
    storeName,
    sellerLogo,
    sellerBanner,
    ratings,
    isVerified,
    description,
  } = store;

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col rounded-xl shadow-sm pb-2 
                 w-full min-h-[320px] max-h-[380px] cursor-pointer
                 transition hover:shadow-md overflow-hidden relative bg-skin-colorContent"
      onClick={() => navigate(`/store/${store._id}`)}
    >
      {/* Banner Area */}
      <div className="flex w-full h-[250px] md:h-[230px] -mt-1 justify-center items-center relative">
        <BannerImage bannerImage={sellerBanner} />

        <span className="absolute -left-0 -bottom-0 w-full h-[220px] rounded-none overflow-hidden z-20">
          <StoreImage storeImage={sellerLogo} />
        </span>
      </div>

      <div
        className="flex flex-col md:grid md:grid-cols-[1fr_auto] bg-skin-colorContent min-h-[30%] text-skin-colorContent
                   w-full text-stylep4 z-10 gap-3 items-center justify-start mt-2 lg:mt-5 px-2 pt-1"
      >
        <div className="flex flex-col gap-1 overflow-hidden w-full">
          <div className="flex flex-row gap-1 items-center text-stylep3 truncate">
            {isVerified && <FaCheck className="text-green-400" />}
            <span className="truncate text-stylep3">{storeName}</span>
          </div>

          <p className="text-stylep4 text-start truncate overflow-hidden max-h-[50px] leading-tight">
            {description}
          </p>
        </div>

        {/* Ratings */}
        <div className="flex flex-row items-center justify-start space-x-2 w-full">
          <FaStar size={12} className="text-yellow-400 bg-skin-primary shadow-md bg-opacity-5" />
          <span className="text-stylep4">{ratings?.average}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCards;
