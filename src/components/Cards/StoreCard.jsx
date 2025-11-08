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
      className="flex flex-col rounded-xl bg-skin-colorContent shadow-sm p-2 
                 w-full min-h-[210px] max-h-[320px] cursor-pointer
                 transition hover:shadow-md overflow-hidden relative"
      onClick={() => navigate(`/store/${store._id}`)}
    >
      {/* Banner Area */}
      <div className="flex w-full h-[100px] -mt-1 bg-yellow-200 justify-center items-center overflow-hidden relative">
        <BannerImage bannerImage={sellerBanner} />

        <span className="absolute left-0 top-3 rounded-sm md:rounded-full w-[100px] h-[100px] overflow-hidden z-20">
          <StoreImage storeImage={sellerLogo} />
        </span>
      </div>

      <div
        className="grid grid-cols-[1fr_auto] bg-skin-colorContent text-skin-colorContent
                   w-full text-stylep2 z-10 gap-3 items-center mt-2"
      >
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="flex flex-row gap-1 items-center text-stylep2 truncate">
            {isVerified && <FaCheck className="text-green-400" />}
            <span className="truncate">{storeName}</span>
          </div>

          <p className="text-stylep3 text-start overflow-hidden max-h-[48px] leading-tight">
            {description}
          </p>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400 text-styleh3" />
          <span className="text-styleh3">{ratings?.average}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreCards;
