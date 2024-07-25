import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { cartCounContext } from "../../Context/CartCountContext"
import { WishContext } from "../../Context/WishContext";


export default function Product({product}) {
  let [isLoading,setIsloading]=useState(false)
  const {setCartCount}=useContext(cartCounContext)
  const {wishCount,setWishCount}=useContext(WishContext)
  let [wishIds,setWishIds]=useState(null)
  let [isAddedToWish,setAddedToWish]=useState(wishIds?.includes(product.id))
  const {getallwish }= useContext(WishContext)
  let [wishData,setWishData]=useState()
 useEffect(()=>{
  getAllWish()
 },[])
 useEffect(()=>{
  setAddedToWish(wishIds?.includes(product.id))
},[wishIds])
  async function getAllWish(){
    const {data}= await getallwish();
    let wish=data.map((item)=>item.id);
    // console.log(wish);
    setWishIds(wish);
    setAddedToWish(wish?.includes(product.Id))
  }
  async function addToWish(){
    
    let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId:product._id},{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    console.log(data);
    
    setWishCount(data.data.length)

    toast.success('added to wishList"', {
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
  async function removefromwish(){
    let {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+product._id,{
        headers:{
          token:localStorage.getItem("token")
 } })
 console.log(data);
 setWishCount(data.data.length)

 
}
  async function addProductTOCard(){
    setIsloading(true)
    let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId:product._id},{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    console.log(data);
    setIsloading(false)
    setCartCount(data.numOfCartItems)

    toast.success('added to card successfully"', {
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
function addOrRemoveWish(){
  if(isAddedToWish){
    removefromwish()
  }else{
    addToWish()
  }
}
return (
    <div className="shadow border hover:border-lime-400">
       <div className="p-3">
      <Link to={"/productDetails/"+product._id}>
        <img src={product.imageCover} alt="" className="w-full" />
        <h5 className="font-light text-[#0fc80f] ">{product.category.name}</h5>
        <h4 className="font-bold">{product.title.split(" ").slice(0,2).join(" ")}</h4>
        <div className="flex justify-between">
            <h6 className="text-xs">{product.price}LE</h6>
            <i className="fas fa-star text-yellow-400 text-xs">{product.ratingsAverage}</i>
        </div>
    </Link>
    <div className="flex items-center justify-center">
        <button disabled={isLoading} onClick={addProductTOCard} className="mt-3 w-full text-center bg-main text-white p-2 hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg">{!isLoading ? "add to card" : <i className='fas fa-spinner fa-spin mx-4'></i>}</button>
    <i onClick={()=>{addOrRemoveWish(),setAddedToWish(!isAddedToWish)}} className={`${isAddedToWish ? 'text-red-500':'text-gray-600'} fas fa-heart   mt-4 ms-4 fa-xl `}></i>

    </div>
       </div>
    </div>
  )
}
