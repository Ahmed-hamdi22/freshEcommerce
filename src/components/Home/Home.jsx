import axios from "axios"
import { useEffect, useState } from "react"
import Product from "../Product/Product";
import Slider from "react-slick";
import Category from "../Category/Category";
import blog from "../../assets/head.jpg"
import blog_2 from "../../assets/shoe.jpg"
import slider_1 from "../../assets/slider-image-1.jpeg"
import slider_2 from "../../assets/slider-image-2.jpeg"
import  slider_3 from "../../assets/slider-image-3.jpeg"
import  girl from "../../assets/girl.jpg"
import Loading from "../Loading/Loading";



 export default function Home() {
  let [products,setProducts]=useState([])
  let [categories,setCategories]=useState([])
  let [isLoading,setIsLoading]=useState(true)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const settingsSlider = {
    arrows:false,
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows:false,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  async function getCategories() {
    setIsLoading(true)
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setCategories(data.data)
    setIsLoading(false)
  }
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
  function filterSearch(e) {
    const val = e.target.value;
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredProducts(filtered);
  }
  useEffect(()=>{
    getProducts() 
    getCategories()
  },[])
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
    <div className="grid grid-cols-12  mt-10">
    <div className="slider-container col-span-9 ">
      <Slider {...settingsSlider}>
        <div>
          <img src={slider_1} className="w-full " />
        </div>
        <div>
          <img src={slider_2} className="w-full"/>
        </div>
        <div>
          <img src={slider_3} className="w-full" />
        </div>
        
      </Slider>
    </div>
    <div className="imagesContainer col-span-3">
      <img src={blog} className="w-full h-[32%] " alt="" />
      <img src={blog_2} className="w-full h-[32%] "  alt="" />
      <img src={girl} className="w-full h-[32%] "  alt="" />
    </div>
    </div>
    <h2 className="text-2xl font-bold mt-5">Store categories </h2>
     <div className="slider-container mb-10 mt-5">
      <Slider {...settings}>
      { categories.map((category,index)=>{
            return <Category category={category} key={index}/>
          })
          }
      </Slider>
    </div>
    <div className="mb-6  mt-16">
        <input
          onChange={filterSearch}
          placeholder="search"
          type="search"
          id="search"
          name="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
      </div>
    <div className="grid md:grid-cols-5 gap-y-5 gap-x-2 mt-10">  
    {filteredProducts.map((product,index)=>{
      return <Product product={product} key={index}/>
    })}
    </div>
    </>
  )
}
