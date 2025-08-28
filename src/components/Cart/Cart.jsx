import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import CartProduct from "../CartProduct/CartProduct";
import { cartCounContext } from "../../Context/CartCountContext";
import { Link } from "react-router-dom";

export default function Cart() {
  let [userCart, setUsearCart] = useState(undefined);
  let [isLoading, setIsLoading] = useState(true);
  const { setCartCount } = useContext(cartCounContext);

  async function getLoggedUserCard() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setUsearCart(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function removeItemFromCart(productId) {
    setIsLoading(true);
    let { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setUsearCart(data);
    setIsLoading(false);
    setCartCount(data.numOfCartItems);
  }

  async function clearCart() {
    setIsLoading(true);
    await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: localStorage.getItem("token") },
    });
    setUsearCart(undefined);
    setIsLoading(false);
    setCartCount(0);
  }

  async function updateProductCount(productId, productCount) {
    if (productCount === 0) {
      removeItemFromCart(productId);
    } else {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        { count: productCount },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setUsearCart(data);
      setCartCount(data.numOfCartItems);
    }
  }

  useEffect(() => {
    getLoggedUserCard();
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading &&
        (userCart == undefined || userCart?.numOfCartItems === 0) && (
          <h1 className="text-center mt-10 font-bold h-screen">
            No product in your cart
          </h1>
        )}

      {!isLoading && userCart?.data?.products?.length > 0 && (
        <div className="my-10">
          <button
            onClick={clearCart}
            className="mt-4 text-red-500 border border-red-500 rounded px-4 py-2"
          >
            Clear Cart
          </button>
          {userCart.data.products.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              removeItemFromCart={removeItemFromCart}
              updateProductCount={updateProductCount}
            />
          ))}

          {/* Check Out */}
          <div className="bg-slate-100 mt-6 p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">
                Total Price:
                <span className="text-green-600 ms-2">
                  {userCart.data.totalCartPrice} EGP
                </span>
              </p>
              <p className="font-bold">
                Total Items:
                <span className="text-green-600 ms-2">
                  {userCart.numOfCartItems}
                </span>
              </p>
            </div>
            <Link
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              to={"/details/" + userCart.data._id}
            >
              Check Out
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
