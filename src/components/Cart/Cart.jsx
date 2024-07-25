import axios from "axios"
import { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import CartProduct from "../CartProduct/CartProduct";
import { cartCounContext } from "../../Context/CartCountContext"




export default function Cart() {
  let [userCart,setUsearCart]=useState(undefined)
 let [isLoading,setIsLoading]= useState(true)
 const {setCartCount}=useContext(cartCounContext)

  async function getLoggedUserCard(){
    setIsLoading(true)
  try {
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
      headers :{
        token:localStorage.getItem("token")
      }
    })
    setUsearCart(data)
    console.log(data);
    setIsLoading(false)
  } 
  catch (error) {
    setIsLoading(false)
  }
  }
  async function removeItemFromCart(productId){
    setIsLoading(true)
  let {data}= await axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId,{
      headers :{
        token:localStorage.getItem("token")
      }
    })
    setUsearCart(data)
    console.log(data);
    setIsLoading(false)
    setCartCount(data.numOfCartItems)

  }
  async function clearCart(){
    setIsLoading(true)
    let {data}= await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
      headers :{
        token:localStorage.getItem("token")
      }
    })
    setUsearCart(undefined)
    console.log(data);
    setIsLoading(false)
    setCartCount(0)

  }
  async function updateProductCount(productId,productCount){
    if (productCount==0) {
        removeItemFromCart(productId)
    }
    else{
      let {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId,{count:productCount},{
        
        headers :{
          token:localStorage.getItem("token")
        }
      })

    setUsearCart(data)
    setCartCount(data.numOfCartItems)

    }
  
    
  }
  useEffect(()=>{
    getLoggedUserCard()
  },[])

  
  return (<>  
   {isLoading && <Loading/> }
      {!isLoading && (userCart == undefined||userCart?.numOfCartItems==0) && <h1  className="text-center mt-10 font-bold h-screen"> No product in your cart</h1> }
      {!isLoading && userCart?.data.products.length && <button onClick={clearCart} className="ms-auto mt-10 block text-red-500 border-red-500 rounded border fw-semibold px-3 py-1">Clear cart</button>}
       {!isLoading && userCart?.data?.products?.map((product,index)=>{
        return <CartProduct key={index} product={product} removeItemFromCart={removeItemFromCart} userCart={userCart} updateProductCount={updateProductCount} />
   
      
      })}
  </>)
}
