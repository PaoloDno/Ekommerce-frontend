import { useEffect, useState } from "react";

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
    <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-skin-colorContent text-skin-colorContent w-[90%] md:w-[400px] shadow-lg relative p-5">

        {/* CLOSE BUTTON */}
        {!processingOrder && (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-xl text-red-600"
          >
            ✕
          </button>
        )}

        {/* ====================================== */}
        {/* IF PROCESSING → SHOW ONLY THIS SCREEN */}
        {/* ====================================== */}
        {processingOrder ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full"></div>
            <p className="text-lg font-semibold">Processing your order...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex flex-col gap-3 text-stylep1">
              {order?.items?.length > 0 ? (
                <>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between border-b pb-2">
                      <span>{item.name}</span>
                      <span>₱ {item.price} × {item.quantity}</span>
                    </div>
                  ))}

                  <div className="flex justify-between font-bold text-lg pt-3">
                    <span>Total:</span>
                    <span>₱ {total.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <span>No items loaded...</span>
              )}
            </div>

            <div className="p-3 flex flex-col justify-center items-center bg-gray-400 mt-5 hover:bg-white">
              <button
                onClick={handleProceed}
                className="hover:bg-green-500 hover:text-white p-5 items-center justify-center rounded-2xl"
              >
                PROCEED TO ORDER
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShowOrderFormComponent;
