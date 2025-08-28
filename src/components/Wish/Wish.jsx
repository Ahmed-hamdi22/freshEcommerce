import axios from "axios";
import ss from "../../assets/head.jpg";
import { cartCounContext } from "../../Context/CartCountContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WishContext } from "../../Context/WishContext";

export default function Wish({ wishData, getAllWish }) {
  const { setCartCount } = useContext(cartCounContext);
  const { wishCount, setWishCount } = useContext(WishContext);
  let [isLoading, setIsloading] = useState(false);
  let [product, setProduct] = useState(false);

  async function removefromwish() {
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + wishData._id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setWishCount(data.data.length);
  }
  useEffect(() => {
    getAllWish();
  }, [wishCount]);
  async function addProductTOCard() {
    setIsloading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: wishData._id },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setIsloading(false);
    setCartCount(data?.numOfCartItems);

    toast.success("added to cart successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  return (
    <>
      <div className="mt-10 bg-slate-100 p-8 rounded-sm ">
        <div className="mb-2">
          <h1 className=" md:text-xl p-2 mt-3 lg:text-2xl font-bold">
            My Wish List
          </h1>
          <div className="grid grid-cols-12  border-b border-slate-500 py-3">
            <div className="col-span-12 md:col-span-2 flex items-center justify-center mb-3 text-center">
              <img src={wishData.imageCover} alt={wishData.title} />
            </div>
            <div className=" col-span-8 md:col-span-7   md:ps-7 text-lg">
              <p className=" font-semibold mb-2">{wishData.title}</p>
              <p className="font-semibold mb-2">{wishData.price} EGB</p>
              <button
                onClick={removefromwish}
                className=" text-center mb-2 text-red-600 font-semibold cursor-pointer hover:border hover:border-red-600 rounded transition-all "
              >
                {" "}
                <li className="fa fa-trash me-1"></li>Remove
              </button>
            </div>
            <div className="  col-span-4 md:col-span-3 flex justify-end items-center mb-3 ">
              <button
                onClick={(addProductTOCard, removefromwish)}
                className=" text-center px-5 py-3 mb-2font-semibold cursor-pointer border border-lime-500 hover:border-black-600 rounded transition-all "
              >
                {" "}
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
