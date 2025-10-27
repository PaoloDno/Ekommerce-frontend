import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStoreAction } from "../../../store/actions/SellerThunks";
import SellerInput from "./SellerFormInput";
import SellerLayout from "./SellerFormLayoput";
import { FaHome } from "react-icons/fa";

import AuthVideo from "../../../components/Form/videos/Rainy.mp4";
import StoreImage from "../../../components/ImagesComponent/components/StoreImageComponent";
import BannerImage from "../../../components/ImagesComponent/components/BannerImageComponent";

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

  const validateField = (section, field, value) => {
    switch (field) {
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
      default:
        return CLEAN_TEXT.test(value) && value
          ? ""
          : "No Empty or Special Characters Allowed.";
    }
  };

  const validateStep = () => {
    const section = step === 1 ? "store" : "address";
    const fields = formData[section];
    let stepErrors = {};
    for (const field in fields) {
      const error = validateField(section, field, fields[field]);
      if (error) {
        stepErrors[field] = error;
        console.log(error);
      }
    }
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, [section]: stepErrors }));
      console.log(errors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setIsLoading(true);
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("A");
    if (validateStep()) {
      const { store, address } = formData;
      const resultAction = await dispatch(
        createStoreAction({ ...store, address: { ...address } })
      );

      if (createStoreAction.fulfilled.match(resultAction)) {
        const timeoutId = setTimeout(() => {
          navigate("/user-store");
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    } else {
      console.log("err");
    }
  };

  const selectLabel = `text-gray-800 text-stylep1`;
  const selectOptions = `border-2 border-skin-colorBorder1 rounded-lg
    w-full px-2 py-2 text-stylep2
    placeholder-transparent shadow-sm
    focus:border-green-500 focus:ring focus:ring-green-200
    focus:outline-none
    transition-all duration-30`;
  const selectOption = `text-gray-600 text-stylep2 py-2 px-4`;

  const renderStep = () => {
    return (
      <>
        {step === 1 && (
          <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
              <h2 className="form-title">Create A Store</h2>
              <SellerInput
                label="Store Name"
                name="storeName"
                value={formData.store.storeName}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.storeName}
                helper="Name for the store is required"
              />
              <SellerInput
                label="Email"
                name="email"
                type="email"
                value={formData.store.email}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.email}
                helper="Email format"
              />
              <SellerInput
                label="Phone Number"
                name="phone"
                type="text"
                value={formData.store.phone}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.phone}
                helper="Store contact number"
              />
              <SellerInput
                label="Description"
                name="description"
                type="text"
                value={formData.store.description}
                onChange={(e) => handleChange("store", e)}
                error={errors.store.description}
                helper="Describe the store"
              />
            </div>
            <span className="flex flex-row justify-between">
              <button
                className="form-button"
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
              <SellerInput
                label="Street"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.street}
              />
              <SellerInput
                label="City"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.city}
              />
              <SellerInput
                label="Country"
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.country}
              />
              <SellerInput
                label="Postal Code"
                name="postalCode"
                value={formData.address.postalCode}
                onChange={(e) => handleChange("address", e)}
                error={errors.address.postalCode}
              />
            </div>
            <span className="flex flex-row justify-between">
              <button
                className="form-button"
                type="button"
                onClick={handleBack}
              >
                PREV
              </button>
              <button
                className="form-button"
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
            <span className="flex flex-row justify-between">
              <button
                className="form-button"
                type="button"
                onClick={handleBack}
              >
                PREV
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isPending}
                className="form-button"
              >
                {isPending ? <div>loading . . .</div> : "CREATE STORE"}
              </button>
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <SellerLayout
      previewSide={
        <>
          <span className="overflow-hidden w-full justify-center items-center bg-cover flex">
            <span className="absolute inset-0 max-w-screen-xl">
            <StoreImage storeImage={"S2"} />
            </span>
          </span>
        </>
      }
      redirect={{
        to: "/",
        text: "go back to homepage",
        icon: <FaHome />,
      }}
    >
      {renderStep()}
    </SellerLayout>
  );
};

export default CreateSellerFormComponent;
