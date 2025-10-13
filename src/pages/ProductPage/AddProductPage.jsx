import React from "react"
import CreateProductFormComponent from "./components/CreateProductFormComponent";
import { useParams } from "react-router-dom";

const AddProductPage = () => {
  const storeId = useParams();
  return (
    <div className="page-section">
      <div className="page-body">
        <CreateProductFormComponent storeId={storeId} />
      </div>
      <div className="page-background"></div>    
    </div>
  )
};

export default AddProductPage;