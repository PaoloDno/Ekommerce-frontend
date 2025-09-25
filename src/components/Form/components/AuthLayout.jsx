import { Link } from "react-router-dom";


const AuthLayout = ({ children, imageSide, redirect }) => {
  return (
    <div className="auth-form-container">
      <div className="authbgblur"></div>
      
      <div className="auth-video-content">
        {imageSide}
      </div>

      <form className="auth-form-content">
        {children}
      </form>

      {redirect && (
        <div className="absolute bottom-5 w-full flex justify-center z-30">
          <Link to="/" className="auth-redirection">
            {redirect.icon}
            <span className="auth-redirection-text">go back to landing page</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;