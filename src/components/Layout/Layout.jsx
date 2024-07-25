import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
    <Navbar/>
    <div className="container w-[80%] mx-auto ">
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}
