import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUpAction } from "../../store/actions/AuthThunks";
import { FaCircleArrowLeft } from "react-icons/fa6";

const SignInFormComponent = () => {
  const { isPending, error } = useSelector((state) => state.auth);
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
    console.log("a");
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
    <div className="auth-form">
       {username ? (
        <div className="flex w-full h-full flex-col items-start">
          <p className="text-stylep1">Welcome! You are logged in!</p>
          <Link
            to="/"
            className="flex flex-row items-center text-stylep1 w-fit py-1"
          >
            <FaCircleArrowLeft className="text-styleh4 mr-2" /> Go to Homepage!
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md">
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          {!error ? "" : <span className="error-p">{error}</span>}
     
          {/* Username */}
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
              <span>Can include letters, numbers, underscores, or hyphens</span>
              <span>Length: 4 to 24 characters</span>
            </div>
            {errors.username && <p className="error-p">{errors.username}</p>}
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
            {errors.password && <p className="error-p">{errors.password}</p>}
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Identification</h3>

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
              {errors[field] && <p className="error-p">{errors[field]}</p>}
            </div>
          ))}

          <h3 className="text-lg font-semibold mt-4 mb-2">Address</h3>

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
              {errors[field] && <p className="error-p">{errors[field]}</p>}
            </div>
          ))}

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
      )}
    </div>
  );
};

export default SignInFormComponent;
