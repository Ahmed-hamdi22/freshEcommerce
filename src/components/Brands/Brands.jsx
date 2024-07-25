import axios from "axios";
import { useEffect, useState } from "react";
import Brand from "../Brand/Brand";
import Loading from "../Loading/Loading";

export default function Brands() {
  let [isLoading,setIsLoading]=useState(true)
  let [brands,setBrands]=useState([])
  async function getBrand(){
    setIsLoading(true)
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    console.log(data);
    setBrands(data.data)
      setIsLoading(false)
    
  }
  useEffect(()=>{
    getBrand() 
  },[])
  if(isLoading){
    return <Loading/> 
  }
  return (
    <>
    <div className="grid md:grid-cols-4 grid-cols-2 gap-y-5 gap-x-2 mt-10">  
    {brands.map((brand,index)=>{
      return <Brand brand={brand} key={index}/>
    })}
    </div>
    </>
  )
}

