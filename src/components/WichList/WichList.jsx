import { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Context/WishContext";
import Wish from "../Wish/Wish";
import Loading from "../Loading/Loading";

export default function WishList() {
  const { getallwish } = useContext(WishContext);
  const [wishData, setWishData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllWish() {
    const { data } = await getallwish();
    console.log(data);
    setWishData(data);
  }

  useEffect(() => {
    const delay = 4000; // 2 seconds
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    getAllWish();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return wishData?.map((wishData, index) => (
    <Wish key={index} getAllWish={getAllWish} wishData={wishData} />
  ));
}
