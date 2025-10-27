import bannerImage1 from "../images/banners/bannerImage.jpg";
import bannerImage2 from "../images/banners/bannerImage2.jpg";
import bannerImage3 from "../images/banners/bannerImage3.jpg";
import bannerImage4 from "../images/banners/bannerImage4.jpg";
import bannerImage5 from "../images/banners/bannerImage5.jpg";
import bannerImage6 from "../images/banners/bannerImage6.jpg";

const BannerImage = ({ bannerImage }) => {
  let bannerSrc = "";

  switch (bannerImage) {
    case "B1":
      bannerSrc = bannerImage1;
      break;
    case "B2":
      bannerSrc = bannerImage2;
      break;
    case "B3":
      bannerSrc = bannerImage3;
      break;
    case "B4":
      bannerSrc = bannerImage4;
      break;
    case "B5":
      bannerSrc = bannerImage5;
      break;
    case "B6":
      bannerSrc = bannerImage6;
      break;
    default:
      bannerSrc = bannerImage2;
  }

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <img src={bannerSrc} alt="banner-image" className="w-full h-full object-cover" />
    </div>
  )
}

export default BannerImage;