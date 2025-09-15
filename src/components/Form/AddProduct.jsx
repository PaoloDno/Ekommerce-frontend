import React, { useState } from "react";

const AddProductFormComponent = () => {
  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    productImage: "",
    images: "",
    attributes: "",
    seller: "",
  });

  const [errors, setErrors] = useState({});

  sanitizeInput = (input) => {
    return input.trim().replace(/[\/<>#]/g, "");
  };
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This dield is required.";
    }
    return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid Character";
  };

  const validateFields = () => {
    let newErrors = {};

    Object.keys(productData).forEach((key) => {
      const error = validateField(key, productData[key]);
      if (error) newErrors[key] = error;
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
    setErrors("");

    if (validateFields) {
      const sanitizedData = {
        name: sanitizeInput(productData.name),
        sku: sanitizeInput(productData.sku),
        description: sanitizeInput(productData.description),
        price: sanitizeInput(productData.price),
        stock: sanitizeInput(productData.stock),
        category: sanitizeInput(productData.category),
        brand: sanitizeInput(productData.brand),
        productImage: sanitizeInput(productData.productImage),
        images: sanitizeInput(productData.images),
        attributes: sanitizeInput(productData.attributes),
        seller: sanitizeInput(productData.seller),
      };

      try {
        // const resultAction = await dispatchEvent()
      } catch (error) {

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
      <form action="auth-form-content">
        {["name", ""].map((field) => (
        <div className="auth-field" key={field}>
          <input
            type="text"
            name={field}
            placeholder={field}
            value={productData.field}
            onChange={handleChange}
            className={inputClasses}
          />
          <label className={tailwindPeerLabel}>Product{field}</label>
          {errors[field] && <p className="error-p">{errors[field]}</p>}
        </div>
        ))};
      </form>
    </div>
  )
};

export default AddProductFormComponent;
