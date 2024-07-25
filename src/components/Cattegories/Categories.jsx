import axios from "axios"
import { useEffect, useState } from "react"
import Category from "../Category/Category";
import Loading from "../Loading/Loading";
// import Loading from "../Loading/Loading";

export default function Categories() {
  let [categories,setCategories]=useState([])
  let [isLoading,setIsLoading]=useState(true)
  async function getCategories() {
    setIsLoading(true)
    let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    console.log(data.data);
    setCategories(data.data)
    setIsLoading(false)
  }
  useEffect(()=>{ 
    getCategories()
  },[])
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-y-5 gap-x-4 mt-10 ">
          { categories.map((category,index)=>{
            return <Category category={category} key={index}/>
          })
          
          }

        </div>

    </>
  )
}
