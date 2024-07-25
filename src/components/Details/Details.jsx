
import { useContext, useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function Details() {
  let { cartId } = useParams()
  let [isLoading, setIsLoading] = useState(false)
  const validationSchema = Yup.object({
    city: Yup.string().min(3, "Name lengh must be greater than or equal 3").max(20, "Name length must be less than or equal 20").required("name is required"),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}/, "enter egyption phone number").required("phone is required"),
    details: Yup.string().min(3, "details lengh must be greater than or equal 3").max(100, "Name length must be less than or equal 50").required("details is required"),
  })
  const formik = useFormik({
    initialValues: {
      "details": "",
      "phone": "",
      "city": "",
    },
    onSubmit: payOnline,
    validationSchema
  })

  async function payOnline() {
    setIsLoading(true)
    let res = await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId, {
      "shippingAddress": formik.values,

    }, {
      params: {
        url: "http://localhost:5173"
      },
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(res.data.session.url);
    setIsLoading(true)
    toast.success('Redirecting to pay', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setIsLoading(false)
      open(res.data.session.url, "_self")

  }

  return (
    <>
      <div className='my-10'>
        <h1 className="text-2xl mb-7">Shipping address</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" id="city" name='city' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cairo" />
            {formik.errors.city && formik.touched.city && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.city}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01012345678" />
            {formik.errors.phone && formik.touched.phone && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.phone}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details </label>
            <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} id="details" name='details' className="bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details" />
            {formik.errors.details && formik.touched.details && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.details}</p>}
          </div>

          <button type="submit" className="  text-white bg-main me-4 hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "pay Now"}</button>
        </form>
      </div>

    </>
  )
}

