import React from "react"
import CreateProductFormComponent from "./components/CreateProductFormComponent";

const AddProductPage = () => {
  return (
    <div className="page-section">
      <div className="page-body">
        <CreateProductFormComponent />
      </div>
      <div className="page-background"></div>    
    </div>
  )
};

export default AddProductPage;