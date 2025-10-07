
import {Link} from "react-router-dom";

const ProductLayout = ({ children, redirect}) => {
  return (
    <div className="product-form-container">
      <div className="authbgblur" />
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
}

export default ProductLayout;