import { useState } from "react"
import { Link } from "react-router-dom"

export default function CartProduct({product,removeItemFromCart,userCart,updateProductCount}) {
    let [count,setCount]=useState(product.count)
  return (
    <>
      <div className="mt-10 bg-slate-100 p-8 rounded-sm ">
      <div className="flex justify-between items-center mb-2">
        <h1 className=" md:text-xl p-2 mt-3 lg:text-2xl font-bold">Cart Shop</h1>
        <Link to={"/details/"+userCart.data._id}  className="mt-3 text-center bg-main text-white p-2 hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg">Check Out</Link>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div><p className="font-bold md: text-xs">Total Price :<span className="text-[#0fc80f] ms-1">{userCart?.data.totalCartPrice}</span></p></div>
        <div><p className="font-bold md: text-xs">Total number of items :<span className="text-[#0fc80f] ms-1">{userCart?.numOfCartItems}</span></p></div>
      </div>
     
        <div className="grid grid-cols-12  border-b border-slate-500 py-3">
        <div className="col-span-12 md:col-span-1 text-center">
          <img src={product.product.imageCover} alt="" />
        </div>
        <div className=" col-span-8 md:col-span-8  md:ps-7 text-lg">
        <p className=" font-semibold mb-2">{product.product.category.name}</p>
        <p className="font-semibold mb-2">{product.price} EGB</p>
        <button onClick={()=>(removeItemFromCart(product.product._id))} className=" text-center mb-2 text-red-600 font-semibold cursor-pointer hover:border hover:border-red-600 rounded transition-all "> <li className="fa fa-trash me-1"></li>Remove</button>
        </div>
        <div className="  col-span-4 md:col-span-3 flex justify-end items-center mb-3 ">
          <button onClick={()=>{updateProductCount(product.product._id,product.count -1),setCount(product.count-1)}} className="text-center border border-[#0fc80f] p-2 px-3 rounded mx-4">-</button>
          <p>{count}</p>
          <button  onClick={()=>{setCount(product.count+1),updateProductCount(product.product._id,product.count +1)}} className="text-center border border-[#0fc80f] p-2 px-3 rounded mx-4">+</button>
        </div>
      </div>
    </div> 
    </>
  )
} 
