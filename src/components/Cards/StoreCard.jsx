import { useNavigate } from "react-router-dom";
import BannerImage from "../ImagesComponent/components/BannerImageComponent";
import StoreImage from "../ImagesComponent/components/StoreImageComponent";
import { FaCheck, FaStar } from "react-icons/fa";

const StoreCards = ({ store }) => {
  const { storeName, sellerLogo, sellerBanner, ratings, isVerified, description } = store;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-lg p-1 w-full min-w-[110px] min-h-[250px] max-h-[300px] items-center justify-center
      container relative bg-skin-colorContent">
        <div className="flex w-full h-2/3 overflow-hidden">
          <span className="flex w-full h-full">
          <BannerImage bannerImage={sellerBanner} />
          </span>
          <span className="absolute left-2 bottom-3 overflow-hidden rounded-full w-1/2 h-1/2">
            <StoreImage storeImage={sellerLogo} />
          </span>
        </div>
        <div className="grid grid-cols-[1fr_0.5fr] w-full h-1/3 text-stylep2 text-skin-colorContent gap-1 ">
          <span className="flex items-center justify-start truncate">
            <span>{isVerified ? <FaCheck className="text-green-400" /> : "" }{storeName}</span>
            <span>{description}</span>         
          </span>
        </div>
        <div className="flex w-full h-full">
          <FaStar className="text-yellow-400" /> <span className="text-styleh2 text-skin-colorContent">{ratings.average}</span>
        </div>
    </div>
  )
};

export default StoreCards;