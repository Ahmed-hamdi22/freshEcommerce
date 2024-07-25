import { Link } from "react-router-dom";

export default function Category({category}) {
    console.log(category);
  return (
    <>
    <Link>
    <div className="shadow-lg hover:shadow-lime-500/50">
       <div className="">
        <img src={category?.image} alt="" className=" md:h-80 h-48 object-fill w-full" />
        <h5 className=" font-medium pb-3 my-2 text-slate-900 text-xs md:text-2xl text-center">{category.slug}</h5>
       </div>
    </div>
    </Link>

    </>
  )
}
