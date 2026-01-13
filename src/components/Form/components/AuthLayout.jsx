import { Link } from "react-router-dom";


const AuthLayout = ({ children, imageSide, redirect, mode = "default" }) => {
  return (
    
     <div className="page-body-background in-center">
      <div className="page-body-section in-center relative pb-4">
      <div className={`flex w-full 
        ${mode === "signup" ? "h-[130vh]" : "h-[130vh]"}
      `}>
      <div className="w-full lg:w-1/2 h-full flex items-start justify-start">
        {imageSide}
      </div>

      <form className={`absolute lg:relative flex flex-col top-0 right-0 items-start justify-start  h-full  bg-opacity-10
        bg-skin-colorContent text-skin-colorContent z-10 lg:bg-skin-primary/70
        ${mode === "default" ? "w-4/5 md:w-3/4 lg:w-1/2 px-2" : ""}
        ${mode === "signup" ? "w-11/12 md:w-3/4 lg:w-1/2 px-2" : ""}
        `}>
        {children}
      </form>
      </div>
      {redirect && (
        <div className="absolute bottom-5 w-full flex justify-center z-20 bg-skin-green text-skin-color1">
          <Link to={redirect.to} className="flex items-center justify-center space-x-2 text-stylep2 py-1">
            {redirect.icon}
            <span>{redirect.text}</span>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default AuthLayout;