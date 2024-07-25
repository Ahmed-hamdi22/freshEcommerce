import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { cartCounContext } from "../../Context/CartCountContext"




export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState({})
    let [isLoading,setIsLoading]=useState(true)
    let [isAdding,setIsAdding]=useState(false)
    const {setCartCount}=useContext(cartCounContext)


    const { id } = useParams()
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        arrows:false,
        appendDots: dots => (
            <div
              style={{
                backgroundColor: "",
                borderRadius: "0px",
                padding: "0px",
                margin:"0px",
                

              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
    };
    
    async function addProductTOCard(){
        setIsAdding(true)
        let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId:id},{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        setCartCount(data.numOfCartItems)
        console.log(data);
        setIsAdding(false)
        toast.success('added to card successfully"', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: "Bounce",
    });
      }
    async function getProductDeatails(productId) {
        setIsLoading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId)
        setProductDetails(data.data)
        console.log(data.data);
        setIsLoading(false)
    }
    useEffect(() => {
        getProductDeatails(id)

    }, [])
    if(isLoading){
        return <Loading/>
    }
    return <>
     <div className="grid bg- grid-cols-5 shadow my-10 p-5">
            <div className="col-span-1">
                <div className="slider-container mb-4">
                    <Slider {...settings}>
                        {productDetails?.images?.map((image) => {
                            return <>
                                <div className="text-center mb-4">
                                    <img src={image} className=" m-auto" />
                                </div>
                            </>
                        })}
                    </Slider>
                </div>
            </div>
            <div className=" col-span-4 flex items-center px-4" >
                <div className="w-full">
                    <h2 className=" md:text-4xl mb-3 text-2xl text-black font-bold">{productDetails?.slug}</h2>
                    <h2 className="text-xs mb-3">{productDetails?.description}</h2>
                    <div className="flex justify-between items-center">
                        <h6 className=" text-slate-800">{productDetails.price}LE</h6>
                        <i className="fas fa-star text-yellow-400 text-xs "><span className="text-slate-800 ms-1 ">{productDetails.ratingsAverage}</span></i>
                    </div>
                    <div className="flex mt-8 justify-between items-center" > 
                    <button onClick={addProductTOCard} disabled={isAdding} className="mt-3 lg:px-20 text-center bg-main text-white p-2 hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded">{!isAdding ? "+ Add" : <i className='fas fa-spinner fa-spin mx-4'></i>}</button>
                    <i className="fas fa-heart mt-4 "></i>
                    </div>
                </div>
            </div>
        </div >


    </>
}
