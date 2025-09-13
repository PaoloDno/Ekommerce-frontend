import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SellerFormComponent = () => {
  const { ownerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useDispatch();

  const { isPending, error } = useSelector((state) => state.auth);

  const sanitizeInput = (input) => input.trim().replace(/[\/<>#]/g, "");

  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;
  const PHONE_REGEX = /^(?:\+639|09)\d{9}$/;

  const [storeData, setStoreData] = useState({
    storeName: "",
    owner: "",
    email: "",
    phone: "",
    description: "",
    sellerLogo: "",
    sellerBanner: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "this field is required";
    }

    switch (name) {
      case "storeName":
        return PHONE_REGEX.text(value) ? "" : "Ph phone number required";
      default:
        return CLEAN_TEXT_REGEX.text(value) ? "" : "Invalid characters.";
    }
  };

  const ValidateFields = () => {
    let newErrors = {};

    Object.keys(storeData).forEach((key) => {
      const error = validateField(key, storeData[key]);
      if (error) newErrors[key] = error;
      return false;
    });
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateField()) {
      const sanitizedData = {
        ...storeData,
        storeName: sanitizeInput(storeData.storeName),
        owner: sanitizeInput(storeData.owner),
        email: sanitizeInput(storeData.email),
        phone: sanitizeInput(storeData.phone),
        description: sanitizeInput(storeData.description),
        sellerLogo: sanitizeInput(storeData.sellerLogo),
        sellerBanner: sanitizeInput(storeData.sellerBanner),
        address: sanitizeInput(storeData.address),
      };

      console.log("bad");

      try {
        //const resultAction = await dispatch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const tailwindPeerLabel =
    "auth-label peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-xs";

  const tailwindHelper =
    "form-helper hidden opacity-0 peer-focus:block peer-focus:opacity-80 transition-opacity duration-200";

  const inputClasses = "rounded auth-inputs peer border border-gray-300";

  return (
    <div className="auth-form">
      <form className="p-6 bg-gray-200 rounded-md">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        {!error ? "" : <span className="error-p">{error}</span>}
        {["storeName", "email", "phone", "description"].map((field) => (
          <div className="auth-field">
            <input
              type="text"
              name={field}
              placeholder={field}
              value={storeData.field}
              onChange={handleChange}
              className={inputClasses}
            />
            <label className={tailwindPeerLabel}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {errors[field] && <p className="error-p">{errors[field]}</p>}
          </div>
        ))}
        ;
        <div className="auth-field">
          <select
            name="sellerLogo"
            value={storeData.sellerLogo || ""}
            onChange={handleChange}
            className={`${inputClasses} bg-white`}
          >
            <option value="">Select a Seller Logo</option>
            <option value="A1">A</option>
            <option value="B1">B</option>
            <option value="C1">C</option>
          </select>
          <label className={tailwindPeerLabel}>Seller Logo</label>
          {errors.sellerLogo && <p className="error-p">{errors.sellerLogo}</p>}
        </div>
        <div className="auth-field">
          <select
            name="sellerBanner"
            value={storeData.sellerBanner || ""}
            onChange={handleChange}
            className={`${inputClasses} bg-white`}
          >
            <option value="">Select a Seller Banner</option>
            <option value="A1">A</option>
            <option value="B1">B</option>
            <option value="C1">C</option>
          </select>
          <label className={tailwindPeerLabel}>Seller Banner</label>
          {errors.sellerBanner && (
            <p className="error-p">{errors.sellerBanner}</p>
          )}
        </div>
        {["address"].map((field) => (
          <div className="auth-field">
            <input
              type="text"
              name={field}
              placeholder={field}
              value={storeData.field}
              onChange={handleChange}
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
              "Create Store!"
            )}
          </button>

      </form>
    </div>
  );
};

export default SellerFormComponent;
