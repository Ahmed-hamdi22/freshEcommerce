import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import Loading from "../Loading/Loading"

export default function AllOrder() {
    const { userData } = useContext(AuthContext)
    // console.log(userData.id);
    let [orders, setOrders] = useState()
    let [isLoading, setIsloading] = useState(true)
    async function getOrder() {
        setIsloading(true)
        let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/" + userData.id)
        setOrders(data)
        console.log(data)
        setIsloading(false)
    }
    useEffect(()=>{
        getOrder()
    
    },[])
    if (isLoading){
        return <Loading/>
    }
    return (
        <div className="bg-slate-100 rounded p-4 mt-20 ">
            {!orders?.length==0 || <h2 className="text-center">No Orders yet</h2> }
            {orders?.map((order)=>{
                return  <> <div className="flex justify-between items-center border-b border-gray-700">
                <div>
                    <span className=" text-slate-800 font-semibold">Date : {order.updatedAt}</span>
                    <p className="my-2 font-semibold">Paymen:{order.paymentMethodType} </p>
                </div>
                <div><span className="text-[#0fc80f] font-semibold">{order.totalOrderPrice}</span> LE</div>
            </div>
            </>
            })}
          
        </div>
    )
}

// const navigate = useNavigate()

// useEffect(()=>{
//     navigate("/")

// },[])