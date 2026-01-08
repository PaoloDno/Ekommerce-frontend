import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

const ShowOrderFormComponent = ({ onClose, onInitFetchCart, cartId, onSubmitOrder }) => {
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState(0);
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    const init = async () => {
      const data = await onInitFetchCart();
      setOrder(data);

      const computedTotal = data?.items?.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setTotal(computedTotal || 0);
    };

    init();
  }, [onInitFetchCart]);

  const handleClose = () => {
    setOrder({});
    setTotal(0);
    setProcessingOrder(false);
    onClose();
  };

  const handleProceed = async () => {
    setProcessingOrder(true); // swap UI instantly

    try {
      await onSubmitOrder(cartId);  // dispatch or API call
      
      handleClose();               // close modal after success
    } catch (err) {
      console.error(err);
      setProcessingOrder(false);   // go back to normal UI on error
    }
  };

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="flex flex-col h-[70vh] bg-skin-colorContent text-skin-colorContent w-[90%] md:w-[400px] shadow-lg relative p-5">

        {/* CLOSE BUTTON */}
        {!processingOrder && (
          <button
            onClick={handleClose}
            className="absolute flex top-2 text-skin-color1 right-2 t p-2 w-[30px] h-[30px] bg-skin-red in-center rounded-full overflow-hidden z-20"
          >
            <FaXmark size={15} />
          </button>
        )}

        {processingOrder ? (
          <div className="flex flex-col w-full h-full items-center justify-center py-10 gap-3 z-10">
            <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full font-Receipt">
            <h2 className="text-styleh4 font-semibold mb-2">ORDER SUMMARY</h2>

            <div className="flex flex-col w-full h-[65%] text-stylep3">
              {order?.items?.length > 0 ? (
                <div className="flex flex-col gap-1 w-full h-[90%] overflow-x-hidden overflow-y-auto">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex flex-row items-center justify-between border-b border-skin-colorBorder1 
                    pb-2 border-opacity-15 text-stylep2">
                      <span>{item.name}</span>
                      <span>₱ {item.price} × {item.quantity}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span>No items loaded...</span>
              )}
              

                  <div className="flex justify-between h-[15%] font-bold text-lg pt-3">
                    <span>Total:</span>
                    <span>₱ {total.toFixed(2)}</span>
                  </div>
            </div>

            <div className="p-3 flex flex-col justify-center items-center bg-gray-400 mt-5 hover:bg-white">
              <button
                onClick={handleProceed}
                className="hover:bg-green-500 hover:text-white p-5 items-center justify-center rounded-2xl"
              >
                PROCEED TO ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowOrderFormComponent;
