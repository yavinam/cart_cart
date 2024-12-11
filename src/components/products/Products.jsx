import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useStateValue } from "../../context";
import { TiShoppingCart } from "react-icons/ti";
import { toast, Bounce } from "react-toastify";
const Products = ({ data, title }) => {
  const { setWishlist, wishlist, cart, setCart } = useStateValue();

  const handleLike = (product) => {
    const index = wishlist.findIndex((item) => item.id === product.id);
    if (index < 0) {
      setWishlist((prev) => [...prev, product]);
    } else {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const handleAddToCart = (prod) => {
    const index = cart.findIndex((item) => item.id === prod.id);
    if (index < 0) {
      setCart((prev) => [...prev, { ...prod, amount: 1 }]);
    }
    toast.success("Tovar savatga qo'shildi !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const productItems = data?.map((product) => (
    <div key={product.id} className="shadow p-3">
      <div className="w-full h-64 relative">
        <img
          className="w-full h-full object-contain"
          src={product.thumbnail}
          alt=""
        />
        <button
          onClick={() => handleLike(product)}
          className="absolute top-3 right-3 text-2xl text-black"
        >
          {wishlist?.some((item) => item.id === product.id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="absolute top-10  text-2xl text-black"
        >
          <TiShoppingCart />
        </button>
      </div>
      <div className="">
        <h3>{product.title}</h3>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="container">
        <h2 className=" text-2xl">{title}</h2>
      </div>
      <div className="grid container gap-3 grid-cols-4">{productItems}</div>
    </div>
  );
};

export default Products;
