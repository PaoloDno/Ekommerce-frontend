import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUpAction } from "../../store/actions/AuthThunks";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import AuthImg from "./images/authImg.jpg";
import { useAppContext } from "../../context/AppContext";

const SignInFormComponent = () => {
  const { token, isPending, isSuccess, error } = useSelector(
    (state) => state.auth
  );

  const { username } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ====== Helpers ======
  const sanitizeInput = (input) => input.trim().replace(/[\/<>#]/g, "");

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;

  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
    },
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required.";
    }

    switch (name) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Invalid username.";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email.";
      case "password":
        return PWD_REGEX.test(value) ? "" : "Invalid password.";
      default:
        return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid characters.";
    }
  };

  const validateFields = () => {
    //console.log("a");
    let newErrors = {}; // initiate an empty object

    // Validate all fields
    Object.keys(userData).forEach((key) => {
      if (typeof userData[key] !== "object") {
        const error = validateField(key, userData[key]);
        if (error) newErrors[key] = error;
      }
    });

    console.log("err");

    Object.keys(userData.address).forEach((addrKey) => {
      const error = validateField(addrKey, userData.address[addrKey]);
      if (error) newErrors[addrKey] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      // Sanitize before sending
      const sanitizedData = {
        ...userData,
        username: sanitizeInput(userData.username),
        firstname: sanitizeInput(userData.firstname),
        lastname: sanitizeInput(userData.lastname),
        middlename: sanitizeInput(userData.middlename),
        email: sanitizeInput(userData.email),
        password: sanitizeInput(userData.password),
        address: {
          street: sanitizeInput(userData.address.street),
          city: sanitizeInput(userData.address.city),
          country: sanitizeInput(userData.address.country),
          postalCode: sanitizeInput(userData.address.postalCode),
        },
      };

      console.log("badas");

      try {
        const resultAction = await dispatch(signUpAction(sanitizedData));

        if (signUpAction.fulfilled.match(resultAction)) {
          console.log("Signup successful");
          setTimeout(() => navigate("/"), 1000);
        } else {
          console.log("SignUp failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // tailwind styles

  const tailwindPeerLabel =
    "auth-label peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-xs";

  const tailwindHelper =
    "form-helper hidden opacity-0 peer-focus:block peer-focus:opacity-80 transition-opacity duration-200";

  const inputClasses = "rounded auth-inputs peer border border-gray-300";

  return (
    <div className="auth-form shadow-sm">
      <div className="authbgblur"></div>
      {token && username ? (
        <div className="flex z-20 w-full h-full bg-skin-primary text-skin-color1 relative">
          <p className="text-stylep1">Welcome! u r logged in!</p>
          <Link
            to="/signup"
            className="flex flex-row items-center text-stylep1 md:w-fit py-1"
          >
            <FaCircleArrowLeft className="text-styleh4 mr-2" /> Go to Homepage!
          </Link>
        </div>
      ) : (
        <div className="auth-container-sign">
          <form onSubmit={handleSubmit} className="auth-form-content">
            {/* Username */}
            <div className="auth-sign-form-content">
              <div className="auth-fields">
                <h2 className="auth-header-2">Sign In</h2>
                {!error ? "" : <span className="error-p">{error}</span>}

                <div className="auth-field">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userData.username}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label className={tailwindPeerLabel}>Username</label>
                  <div className={tailwindHelper}>
                    <span>Must start with a letter A to Z, a to z</span>
                    <span>
                      Can include letters, numbers, underscores, or hyphens
                    </span>
                    <span>Length: 4 to 24 characters</span>
                  </div>
                  {errors.username && (
                    <p className="error-p">{errors.username}</p>
                  )}
                </div>

                {/* Email */}
                <div className="auth-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label className={tailwindPeerLabel}>Email</label>
                  <div className={tailwindHelper}>
                    <span>Must follow a valid email format</span>
                    <span>Domain extension: 2–24 letters</span>
                  </div>
                  {errors.email && <p className="error-p">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="auth-field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <label className={tailwindPeerLabel}>Password</label>
                  <div className={tailwindHelper}>
                    <span>At least 1 lowercase, 1 uppercase, 1 number</span>
                    <span>At least 1 special: ! @ # $ %</span>
                    <span>8 to 24 characters</span>
                  </div>
                  {errors.password && (
                    <p className="error-p">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="auth-fields">
                <h3 className="auth-header-2">Identification</h3>

                {["firstname", "lastname", "middlename"].map((field) => (
                  <div className="auth-field" key={field}>
                    <input
                      type="text"
                      name={field}
                      placeholder={field}
                      value={userData.field}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <label className={tailwindPeerLabel}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {errors[field] && (
                      <p className="error-p">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="auth-fields">
                <h3 className="auth-header-2">Address</h3>

                {/* address field */}
                {["street", "city", "country", "postalCode"].map((field) => (
                  <div className="auth-field" key={field}>
                    <input
                      type="text"
                      name={field}
                      placeholder={field}
                      value={userData.address[field]}
                      onChange={handleChangeAddress}
                      className={inputClasses}
                    />
                    <label className={tailwindPeerLabel}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {errors[field] && (
                      <p className="error-p">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="auth-button flex items-center justify-center mt-4"
              disabled={isPending}
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Sign In!"
              )}
            </button>
          </form>

          <div className="auth-container-right ">
            <img src={AuthImg} className="w-full h-full object-cover" />
            <div className="absolute md:hidden inset-0 bg-gradient-to-b from-transparent to-skin-end z-20 bg-opacity-10"></div>
            <div className="hidden md:absolute inset-0 bg-gradient-to-tl from-transparent to-skin-start z-20 bg-opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-tl  md:bg-gradient-to-t from-transparent to-skin-end z-20 bg-opacity-90"></div>
            <div className="absolute top-10 md:top-2 left-0 flex-col text-start w-full md:w-11/12 p-3 md:p-5 z-30">
              <p className="auht-p">
                <span className="text-styleh4 font-bold">Welcome!</span>
                <span className="flex flex-row text-stylep1">
                  Already log-in
                </span>
                <span className="flex flex-row text-stylep1">
                  Login instead.
                </span>
              </p>
              <Link to="/login" className="auth-redirection">
                <span className="auth-redirection-text">LOGIN!</span>
                <FaCircleArrowRight className="auth-redirection-icon" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInFormComponent;
