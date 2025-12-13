import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateOrdersPage = () => {

  const navigate = useNavigate();

  const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border p-2 mb-2 rounded">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center cursor-pointer font-semibold"
        >
          <span>{title}</span>
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </div>

        {isOpen && <div className="mt-2">{content}</div>}
      </div>
    );
  };

  const BasicInfo = () => {
    return <div>Basic info content goes here...</div>;
  };

  const ShippingAddress = () => {
    return <div>Shipping address form goes here...</div>;
  };

  const ReceiptItemSumTotal = () => {
    return <div>Receipt summary goes here...</div>;
  };

  const orderSections = [
    {
      title: "Basic Information",
      content: <BasicInfo />,
    },
    {
      title: "Shipping Address",
      content: <ShippingAddress />,
    },
    {
      title: "Receipt Items & Total",
      content: <ReceiptItemSumTotal />,
    },
  ];

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="p-4">
          {orderSections.map((item, index) => (
            <AccordionItem key={index} {...item} />
          ))}
        </div>
        <div>
          <button className="bg-white text-black p-5 rounded-b-lg"
            onClick={()=> {navigate("/")}}
          >
            go to Order ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrdersPage;
