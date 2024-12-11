import React, { useRef, memo } from "react";
import { Navigate } from "react-router-dom";
import { useStateValue } from "../../context";

const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const KANALID = "-1002414202491";
const USERID = "6453501842";
const Checkout = () => {
  const { cart,setCart } = useStateValue();

  if (!cart.length) {
    return <Navigate replace to={"/cart"} />;
  }

  const fname = useRef(null);
  const lname = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = fname.current.value;
    const lastName = lname.current.value;

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.amount * item.price,
      0
    ).brm();
    const productList = cart
      .map(
        (product, index) =>
          `${index + 1}. ${product.title}\nPrice: $${(product.price).brm()}\n`
      )
      .join("\n");

    const message = `
          🛒 **New Order** 🛒
          👤 Name: ${firstName} ${lastName}

          🛍️ Products:
          ${productList}
          Total price: ${totalPrice}
              `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${USERID}&parse_mode=Markdown&text=${encodeURIComponent(
      message
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCart([])
    } catch (error) {
      console.error("Error:", error);
    }

    fname.current.value = "";
    lname.current.value = "";
  };

  return (
    <div className="container mx-auto min-h-[80vh] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              First Name
            </label>
            <input
              ref={fname}
              required
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Last Name
            </label>
            <input
              ref={lname}
              required
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your last name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(Checkout);
