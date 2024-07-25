import { useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let [isloading,setIsloading]=useState(false)
  let [errorMessage,setErrorMessage]=useState("")
  const navigate=useNavigate()
  const validationSchema=Yup.object({
    name:Yup.string().min(3,"Name lengh must be greater than or equal 3").max(20,"Name length must be less than or equal 20").required("name is required"),
    phone:Yup.string().matches(/^(002)?01[0125][0-9]{8}/,"enter a valid egyptian number").required("phone is required"),
    email:Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"enter a valid email").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Minimum eight characters, at least one letter and one number").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref('password')],"password and repassword not matched").required("re password is required"),
  })
  const formik = useFormik({
    initialValues: {
      "name": "",
      "email": "",
      "password": "",
      "rePassword": "",
      "phone": ""
    },
    onSubmit: register,
    validationSchema
  })

  function register() {
    setIsloading(true);
    setErrorMessage("")
    console.log(formik.values);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formik.values)
    .then((response)=>{
      console.log(response.data.message);
      setIsloading(false);
      navigate("/login")
    })
    .catch((error)=>{
      console.log(error.response.data.message);
      setIsloading(false);
      setErrorMessage(error.response.data.message)
    })
    
  }
  return (
    <>
      <div className='my-10'>
        <h1 className="text-2xl mb-7">Register Now :</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
            {formik.errors.name && formik.touched.name && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.name}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  />
            {formik.errors.phone && formik.touched.phone && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.phone}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
            {formik.errors.email && formik.touched.email && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
            {formik.errors.password && formik.touched.password && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.password}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id="confirm_password" name='rePassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
            {formik.errors.rePassword && formik.touched.rePassword && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.rePassword}</p>}
          </div>
          {errorMessage?<p className='bg-red-300  text-white p-1 rounded-md my-4 text-sm '>{errorMessage}</p>:null}
          {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div> */}
          <button type="submit" disabled={isloading} className="ms-auto block text-white bg-main hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{!isloading?"Submit":<i className='fas fa-spinner fa-spin mx-4'></i>}</button>
        </form>
      </div>

    </>
  )
}
