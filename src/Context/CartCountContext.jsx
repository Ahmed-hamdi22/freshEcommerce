import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const cartCounContext = createContext(0);

export default function CartCounContextProvider({ children }) {
  let [cartCount, setCartCount] = useState();
  async function getLoggedUserCard() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartCount(data.numOfCartItems);
      console.log(data.numOfCartItems);
    } catch (error) {}
  }
  useEffect(() => {
    getLoggedUserCard();
  }, []);
  return (
    <>
      <cartCounContext.Provider value={{ cartCount, setCartCount }}>
        {children}
      </cartCounContext.Provider>
    </>
  );
}
