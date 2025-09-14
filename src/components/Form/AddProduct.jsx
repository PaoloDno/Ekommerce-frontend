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

  return <div></div>;
};

export default AddProductFormComponent;
