import {Link} from "react-router-dom"

const SellerLayout = ({ children, previewSide, redirect}) => {
  return (
    <div className="seller-form-container">
      <div className="authbgblur" />
      <div className="form-preview-design">
        {previewSide}
      </div>

      <form className="form-content">
        {children}
      </form>
      
      {redirect && (
        <div className="absolute bottom-5 w-full flex justify-center z-30">
          <Link to={redirect.to} className="auth-redirection">
            {redirect.icon}
            <span>{redirect.text}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellerLayout;