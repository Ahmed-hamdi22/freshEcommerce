import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishContext = createContext(false);
export default function WishContextProvider({ children }) {
  let [wishCount, setWishCount] = useState();
  let [wishListData, setWishListData] = useState();
  async function getallwish() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setWishCount(data.count);
    console.log(data);
    return data;
  }
  useEffect(() => {
    getallwish();
  }, []);
  return (
    <WishContext.Provider
      value={{
        wishCount,
        setWishCount,
        wishListData,
        setWishListData,
        getallwish,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}
