import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductLayout from "./ProductFormLayout";
import ProductInput from "./ProductFormInput";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

const CreateProductFormComponent = () => {
  const { token, isPending } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CLEAN_TEXT = /^[^&<>"'/]*$/;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      description: "",
      brand: "",
    },
    inventory: {
      sku: "",
      price: 0,
      stock: 0,
      category: "",
    },
    displays: {
      productImage: "A1",
      images: ["B1", "B2"],
      attributes: { color: "Red", size: "M" },
    },
  });

  const [errors, setErrors] = useState({
    basicInfo: {},
    inventory: {},
    displays: {},
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
    const section = step === 1 ? "basicInfo" : step === 2 ? "inventory" : "displays";
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

  {
    /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("A");
    if (validateStep()) {
      const { store, address } = formData;
      
      const resultAction = await dispatch(
        createPro({ ...store, ...address })
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
*/
  }

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
              <h2 className="form-title">Product Informations</h2>
              <ProductInput
                label="product name"
                name="name"
                value={formData.basicInfo.name}
                onChange={(e) => handleChange("basicInfo", e)}
                error={errors.basicInfo.name}
              />
              <ProductInput
                label="product description"
                name="description"
                value={formData.basicInfo.description}
                onChange={(e) => handleChange("basicInfo", e)}
                error={errors.basicInfo.description}
              />
              <ProductInput
                label="product brand"
                name="brand"
                value={formData.basicInfo.brand}
                onChange={(e) => handleChange("basicInfo", e)}
                error={errors.basicInfo.brand}
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
              <h2 className="form-title">Product Inventory</h2>
              <ProductInput
                label="serial code unit"
                name="sku"
                value={formData.inventory.sku}
                onChange={(e) => handleChange("inventory", e)}
                error={errors.inventory.sku}
              />
              <ProductInput
                label="Product price"
                name="price"
                type="number"
                value={formData.inventory.price}
                onChange={(e) => handleChange("inventory", e)}
                error={errors.inventory.price}
              />
              <ProductInput
                label="Product Stocks"
                name="stock"
                type="number"
                value={formData.inventory.stock}
                onChange={(e) => handleChange("inventory", e)}
                error={errors.inventory.stock}
              />
              <ProductInput
                label="Category"
                name="category"
                value={formData.inventory.category}
                onChange={(e) => handleChange("inventory", e)}
                error={errors.inventory.category}
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
      </>
    );
  };

  return (
    <ProductLayout
      redirect={{
        to: "/home",
        text: "go back to homepage",
        icon: <FaHome />,
      }}
    >
      {renderStep()}
    </ProductLayout>
  );
};

export default CreateProductFormComponent;
