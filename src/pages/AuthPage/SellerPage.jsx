import React from "react"
import SellerFormComponent from "../../components/Form/SellerForm";
import { useParams } from "react-router-dom";
const CreateStorePage = () => {
  const { ownerId } = useParams;
  
  return (
    <div className="page-section">
      <div className="page-body">

        <SellerFormComponent />
      </div>
      <div className="page-background"></div>
    </div>
  )
};

export default CreateStorePage;
