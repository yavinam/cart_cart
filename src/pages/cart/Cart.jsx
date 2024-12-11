import React, { useEffect, useState } from "react";
import Empty from "../../components/empty/Empty";
import { useStateValue } from "../../context";
import { useNavigate } from "react-router-dom";
import Promocode from "../../components/promocode/Promocode";

const Cart = () => {
  const [promoStatus, setPromoStatus] = useState({
    msg: "",
    error: false,
    success: false,
  });
  const { cart, setCart } = useStateValue();
  const navigate = useNavigate();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncrement = (prod) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === prod.id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const handleDecrement = (prod) => {
    if (prod.amount < 2) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === prod.id ? { ...item, amount: item.amount - 1 } : item
      )
    );
  };

  const handleDelete = (prod) => {
    setCart((prev) => prev.filter(({ id }) => id !== prod.id));
  };

  const totalPrice = cart?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  useEffect(() => {
    if (promoStatus.success) {
      setCart((prev) =>
        prev.map((item) => ({ ...item, price: item.price * .8 }))
      );
    }
  }, [promoStatus.success]);
  return (
    <div className="min-h-[80vh] p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Basket</h2>

      {cart?.length ? (
        <div className="container flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={item.thumbnail}
                  width={100}
                  alt={item.title}
                  className="rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-green-600 font-bold">
                    {(item.amount * item.price).toLocaleString()} so'm
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span>{item.amount}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-3 py-1 border rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-96 p-4 bg-white shadow-md rounded-lg sticky top-20 self-start flex flex-col gap-2">
            <h3 className="text-lg font-semibold mb-4">Your order</h3>
            <p className="text-gray-700">
              Total Price:
              {totalPrice.brm()}
              <span className="font-bold text-green-600"> so'm</span>
            </p>
            <Promocode promoCodeStatus={setPromoStatus} />
            {promoStatus.error && (
              <p className="text-red-500">{promoStatus.msg}</p>
            )}
            {promoStatus.success && (
              <p className="text-green-500">{promoStatus.msg}</p>
            )}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Clearance
            </button>
          </div>
        </div>
      ) : (
        <Empty
          title="Savatingiz hozircha bo‘sh"
          url="https://uzum.uz/static/img/shopocat.490a4a1.png"
        />
      )}
    </div>
  );
};

export default Cart;
