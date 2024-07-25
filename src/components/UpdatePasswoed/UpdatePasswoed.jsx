
import { useContext, useState } from 'react'
import axios from 'axios'
import '../../index.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function UpdatePasswoed() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  let [isloading, setIsloading] = useState(false)
  let [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "enter a valid email").required("Email is required"),
    newPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Minimum eight characters, at least one letter and one number").required("password is required"),
  })
  const formik = useFormik({
    initialValues: {
      "email": "",
      "newPassword": "",
    },
    onSubmit: updatePasswoed,
    validationSchema
  })
  function updatePasswoed() {
    setIsloading(true);
    setErrorMessage("")
    console.log(formik.values);
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', formik.values)
      .then((response) => {
        setIsloading(false);
        navigate("/")
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        setIsloading(false);
        setErrorMessage(error.response.data.message)
      })

  }
  return (
    <>
      <div className='my-10'>
        <h1 className="text-2xl mb-7">Update password :</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" />
            {formik.errors.email && formik.touched.email && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} type="password" id="newPassword" name='newPassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" />
            {formik.errors.newPassword && formik.touched.newPassword && <p className='bg-red-300 text-white p-1 rounded-md my-1 text-sm '>{formik.errors.newPassword}</p>}
          </div>
          {errorMessage ? <p className='bg-red-300  text-white p-1 rounded-md my-4 text-sm '>{errorMessage}</p> : null}
          <button type="submit" disabled={isloading} className="ms-auto block text-white bg-main hover:bg-[#0fc80f] focus: focus:outline-[#0fc80f] focus:bg-[#0fc80f] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{!isloading ? "Login" : <i className='fas fa-spinner fa-spin mx-4'></i>} </button>
        </form>
      </div>

    </>
  )
}
