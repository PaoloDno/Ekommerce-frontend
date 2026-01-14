import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStoreAction } from "../../../store/actions/SellerThunks";

import SellerLayout from "./SellerFormLayoput";
import { FaHome } from "react-icons/fa";

import AuthVideo from "../../../components/Form/videos/Rainy.mp4";
import StoreImage from "../../../components/ImagesComponent/components/StoreImageComponent";
import BannerImage from "../../../components/ImagesComponent/components/BannerImageComponent";
import AuthInput from "../../../components/Form/components/AuthInput";

const CreateSellerFormComponent = () => {
  const { token, isPending } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT = /^[^&<>"'/]*$/;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    store: {
      storeName: "",
      email: "",
      phone: "",
      description: "",
    },
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
    },
    display: {
      sellerLogo: "S1",
      sellerBanner: "B1",
    },
  });

  const [errors, setErrors] = useState({
    store: {},
    address: {},
  });

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: "",
      },
    }));
  };

  const sanitizeInput = (input) => input.trim().replace(/[\/<>#]/g, "");

  const validateField = (section, field, value) => {
    if (!value || value.trim() === "") return "This field is required.";

    if (field === "email") {
      return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
    }

    return CLEAN_TEXT.test(value) ? "" : "Invalid characters.";
  };

  const validateStep = () => {
    if (step === 3) return true; // display step has no text validation

    const section = step === 1 ? "store" : "address";
    const fields = formData[section];
    let stepErrors = {};

    Object.keys(fields).forEach((field) => {
      const error = validateField(section, field, fields[field]);
      if (error) stepErrors[field] = error;
    });

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, [section]: stepErrors }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [section]: {} }));
    return true;
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const selectLabel = "text-gray-800 text-stylep1";
  const selectOptions = `
    border-2 border-skin-colorBorder1 rounded-lg
    w-full px-2 py-2 text-stylep2
    placeholder-transparent shadow-sm
    focus:border-green-500 focus:ring focus:ring-green-200
    focus:outline-none
    transition-all duration-300
  `;
  const selectOption = "text-gray-600 text-stylep2 py-2 px-4";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    const payload = {
      storeName: sanitizeInput(formData.store.storeName),
      email: sanitizeInput(formData.store.email),
      phone: sanitizeInput(formData.store.phone),
      description: sanitizeInput(formData.store.description),
      address: {
        street: sanitizeInput(formData.address.street),
        city: sanitizeInput(formData.address.city),
        country: sanitizeInput(formData.address.country),
        postalCode: sanitizeInput(formData.address.postalCode),
      },
      display: formData.display,
    };

    const resultAction = await dispatch(createStoreAction(payload));

    if (createStoreAction.fulfilled.match(resultAction)) {
      navigate("/user-store");
    }
  };

  const renderStep = () => {
    return (
      <>
        {step === 1 && (
          <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
              <h2 className="form-title">Create A Store</h2>
              <AuthInput
                label="Store Name"
                name="storeName"
                value={formData.store.storeName}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.storeName}
                helper="Name for the store is required"
              />
              <AuthInput
                label="Email"
                name="email"
                type="email"
                value={formData.store.email}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.email}
                helper="Email format"
              />
              <AuthInput
                label="Phone Number"
                name="phone"
                type="text"
                value={formData.store.phone}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.phone}
                helper="Store contact number"
              />
              <AuthInput
                label="Description"
                name="description"
                type="text"
                value={formData.store.description}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.description}
                helper="Describe the store"
              />
            </div>
            <span className="flex flex-row w-full items-center justify-center">
              <button
                className="mt-4 w-full py-2 rounded-lg
                  bg-skin-green/90 hover:bg-skin-green
                  text-skin-color1 text-stylep2
                  flex justify-center items-center
                  backdrop-blur-md transition-all"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
              <h2 className="form-title">Store Address</h2>
              <AuthInput
                label="Street"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.street}
              />
              <AuthInput
                label="City"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.city}
              />
              <AuthInput
                label="Country"
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.country}
              />
              <AuthInput
                label="Postal Code"
                name="postalCode"
                value={formData.address.postalCode}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.postalCode}
              />
            </div>
            <span className="flex flex-row w-full items-center justify-center gap-2">
              <button
                className="mt-4 w-full py-2 rounded-lg
                  bg-skin-green/90 hover:bg-skin-green
                  text-skin-color1 text-stylep2
                  flex justify-center items-center
                  backdrop-blur-md transition-all"
                type="button"
                onClick={handleBack}
              >
                PREV
              </button>
              <button
                className="mt-4 w-full py-2 rounded-lg
                  bg-skin-green/90 hover:bg-skin-green
                  text-skin-color1 text-stylep2
                  flex justify-center items-center
                  backdrop-blur-md transition-all"
                type="button"
                onClick={handleNext}
              >
                Next
              </button>
            </span>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full space-y-4">
              <h2 className="form-title">Store Display</h2>
              <div className="flex flex-col items-center md:grid gap-1 md:grid-cols-[1fr_1.5fr] my-2">
                <span className="flex w-full h-[120px] relative rounded-lg bg-gray-500 p-4 overflow-hidden">
                  <span className="absolute inset-0 w-full h-[60px]">
                    <BannerImage bannerImage={formData.display.sellerBanner} />
                  </span>

                  <span className="absolute left-2 bottom-0 w-[100px] h-[100px] rounded-full overflow-hidden">
                    <StoreImage storeImage={formData.display.sellerLogo} />
                  </span>
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className={selectLabel} htmlFor="sellerLogo">
                  Choose a Store Logo:
                </label>
                <select
                  className={selectOptions}
                  name="sellerLogo"
                  id="sellerLogo"
                  value={formData.display.sellerLogo}
                  onChange={(e) => handleChange("display", e)}
                >
                  <option className={selectOption} value="S1">
                    Logo A1
                  </option>
                  <option className={selectOption} value="S2">
                    Logo A2
                  </option>
                  <option className={selectOption} value="S3">
                    Logo A3
                  </option>
                  <option className={selectOption} value="S4">
                    Logo A4
                  </option>
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className={selectLabel} htmlFor="sellerBanner">
                  Choose a Store Banner:
                </label>
                <select
                  className={selectOptions}
                  name="sellerBanner"
                  id="sellerBanner"
                  value={formData.display.sellerBanner}
                  onChange={(e) => handleChange("display", e)}
                >
                  <option className={selectOption} value="B1">
                    Banner B1
                  </option>
                  <option className={selectOption} value="B2">
                    Banner B2
                  </option>
                  <option className={selectOption} value="B3">
                    Banner B3
                  </option>
                  <option className={selectOption} value="B4">
                    Banner B4
                  </option>
                </select>
              </div>
            </div>
            <span className="flex flex-row justify-between gap-2">
              <button
                className="mt-4 w-full py-2 rounded-lg
                  bg-skin-green/90 hover:bg-skin-green
                  text-skin-color1 text-stylep2
                  flex justify-center items-center
                  backdrop-blur-md transition-all"
                type="button"
                onClick={handleBack}
              >
                PREV
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isPending}
                className="mt-4 w-full py-2 rounded-lg
                  bg-skin-green/90 hover:bg-skin-green
                  text-skin-color1 text-stylep4
                  flex justify-center items-center
                  backdrop-blur-md transition-all"
              >
                {isPending ? <div className="loader" /> : "CREATE STORE"}
              </button>
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <SellerLayout
      videoSide={
        <video
          src={AuthVideo}
          autoPlay
          loop
          muted
          playsInline
          className="flex relative inset-0 w-full h-full object-cover"
        />
      }
      redirect={{
        to: "/",
        text: "go back to homepage",
        icon: <FaHome />,
      }}
    >
      <div
        className="relative w-full max-w-md mx-auto mt-16 p-6 rounded-2xl
          bg-skin-colorContent/60 backdrop-blur-xl
          border border-white/20 shadow-2xl
          text-skin-colorContent flex flex-col space-y-4"
      >
        <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl -z-10" />
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-styleh4 font-display text-center">
            CREATE STORE
          </h2>
          <span className="text-styleh2">{"/"}</span>
          <h3
            onClick={() => navigate("/home")}
            className="text-stylep3 font-display text-center 
          bg-skin-fill-3 text-skin-color3 px-2 py-1 rounded-lg"
          >
            GO BACK
          </h3>
        </div>
        {renderStep()}
      </div>
    </SellerLayout>
  );
};

export default CreateSellerFormComponent;
