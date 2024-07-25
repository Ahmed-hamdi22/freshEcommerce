import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function filterSearch(e) {
    const val = e.target.value;
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-6 mt-10">
        <input
          onChange={filterSearch}
          type="search"
          id="search"
          name="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
      <div className="grid md:grid-cols-5 gap-y-5 gap-x-2 mt-10">
        {filteredProducts.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </>
  );
}
