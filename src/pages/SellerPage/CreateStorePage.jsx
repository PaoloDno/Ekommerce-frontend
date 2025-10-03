import React from "react"
import { useParams } from "react-router-dom";
import CreateSellerFormComponent from "./components/CreateSellerFormComponent";


const CreateStorePage = () => {
  const { ownerId } = useParams();
  
  return (
    <div className="page-section">
      <div className="page-body">
        <CreateSellerFormComponent />
      </div>
      <div className="page-background"></div>
    </div>
  )
};

export default CreateStorePage;
