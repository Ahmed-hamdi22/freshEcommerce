import { Link } from "react-router-dom";

export default function Brand({brand}) {
  return (
    <Link>
<div className="shadow-xl hover:shadow-lime-500/50 border py-2">
       <div className="">
        <img src={brand?.image} alt="" className="" />
        <h5 className="font-light my-2 text-sm md:text-2xl text-center">{brand.slug}</h5>
       </div>
    </div>
    </Link>
  )
}
