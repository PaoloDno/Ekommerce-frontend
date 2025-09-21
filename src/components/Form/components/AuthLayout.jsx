import { Link } from "react-router-dom";


const AuthLayout = ({ children, imageSide, redirect }) => {
  return (
    <div className="auth-form">
      <div className="authbgblur"></div>
      <div className="auth-container">
        {imageSide}
      </div>
      <form className="auth-form-content">
        {children}
      </form>

      {redirect && (
        <div className="absolute bottom-5 w-full flex justify-center z-30">
          <Link to={redirect.to} className="auth-redirection">
            {redirect.icon}
            <span className="auth-redirection-text">{redirect.text}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;