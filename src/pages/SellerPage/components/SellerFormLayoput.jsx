import { Link } from "react-router-dom";

const SellerLayout = ({ children, videoSide, redirect }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-[120vh] relative">
      <div className="w-full h-full lg:h-auto relative">
        <div className="w-full h-full flex items-start justify-start">
          {videoSide}
        </div>
      </div>

      <form
        className="absolute lg:relative flex flex-col top-0 right-0 items-start 
        justify-start  h-full w-full  bg-opacity-10 px-2
        bg-skin-colorContent text-skin-colorContent z-10 lg:bg-skin-primary/70"
      >
        {children}
      </form>

      {/* Redirect */}
      {redirect && (
        <div className="absolute bottom-5 w-full flex justify-center z-20 bg-skin-green text-skin-color1">
          <Link to={redirect.to} className="flex items-center justify-center space-x-2 text-stylep2 py-1">
            {redirect.icon}
            <span>{redirect.text}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellerLayout;
