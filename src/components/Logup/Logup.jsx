import { useEffect, useState } from "react";
import style from "./Logup.module.css";
import { Alert, FloatingLabel } from "flowbite-react";

import logo from '../../assets/Logo2.png';
import { useFormik } from "formik";

import * as Yup from 'yup'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export function Logup() {
  let time;
  const [showpassword,setShowPassword]=useState(false)
    const [showConfirmPasssword,setConfirmPassword]=useState(false)
  const [ errorMessage,setError]=useState('')
   const [ successMessage,setMessage]=useState('')
   const [loadingSpinner,setLoading]=useState(false)
   const navigate=useNavigate()
  // handle error
  const yup=Yup.object().shape({
    name:Yup.string().required('This field is required.').min(3,'Minimum 3 characters.').max(28),
    email:Yup.string().email('invalid email').required('This field is required.'),
     password:Yup.string().required('This field is required.').matches(/^[a-zA-Z0-9_-]{8,}$/,'8+ characters, mixed case & numbers.'),
    phoneNumber:Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid Egyptian phone number").required('This field is required'),
   confirmPassword:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Confirm password is required')
  })
 function registerForm(values){
  setMessage('');
  setError('')
     const { confirmPassword, ...dataToSend } = values;
     setLoading(true)
   axios.post(`https://restaurant-project-node-js.vercel.app/api/auth/register`,dataToSend).then((resp)=>{
    
  setLoading(false)
 time=setTimeout( () => {
    navigate('/signIn');
  },5000)
      
   setMessage(resp.data.message)
     

    }).catch((resp)=>{
      setLoading(false)
       setError(resp.response?.data.cause)
     
    })


  }
const formik=useFormik({initialValues:{
  name:'',
  email:'',
  password:'',
 phoneNumber:'',
  confirmPassword:''
},validationSchema:yup,onSubmit:registerForm})
  useEffect(() => {
    return clearTimeout(time)
  }, []);
  return (
    <>
 <div className="flex justify-center py-10 px-6 sm:px-1 min-h-screen bg-[#EEEEED]">
  <div className="w-full lg:w-[50%] bg-white p-9 rounded-3xl">
    {/* headet */}
    <div className="flex flex-col justify-center items-center py-1.5">
      <img src={logo} alt=""  className="py-2.5"/>
      <h3 className="py-1 font-semibold  text-mainText lg:font-bold text-lg lg:text-3xl">Create Account</h3>
      <span className="text-gray-500">Join the Bistro Bliss family today</span>
    </div>
      <form className="py-3" onSubmit={formik.handleSubmit}>
        {/* name */}
        <div className="mb-4">
          <FloatingLabel
            variant="outlined"
            label="Full Name"
            type="text"
               className="text-[15px]"
                  name="name"
               value={formik.values.name}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
         
          />
          {(formik.touched.name|| formik.values.name)&&formik.errors.name? <Alert color="failure" className="mt-1" >
      <span className="font-medium space-x-1.5"><i className="fa-solid fa-circle-info"></i><span>{formik.errors.name}</span> </span>
    </Alert>:null}
          
        </div>
{/* email */}
        <div className="mb-4">
          <FloatingLabel
            variant="outlined"
            label="Email Address"
            type="email"
           className="text-[15px]"
            name="email"
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />
           {(formik.touched.email||formik.values.email)&&formik.errors.email? <Alert color="failure" className="mt-1">
      <span className="font-medium space-x-1.5"><i className="fa-solid fa-circle-info"></i><span>{formik.errors.email}</span></span>
    </Alert>:null}
        </div>
{/* password */}
        <div className="mb-4">
          <div className="relative">
          <FloatingLabel
            variant="outlined"
            label="password"
            type={showpassword?"text":"password"}
            className="text-[15px]"
               name="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={()=>setShowPassword((prev)=>!prev)}>{showpassword?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}</span>

          </div>
          {(formik.touched.password|| formik.values.password)&&formik.errors.password?  <Alert color="failure"  className="mt-1">
      <span className="font-medium space-x-1.5"><i className="fa-solid fa-circle-info"></i><span>{formik.errors.password}</span></span>
    </Alert>:null}
          
        </div>
{/* input confirm password */}
        <div className="mb-4 ">
       <div className="relative">
          <FloatingLabel
            variant="outlined"
            label="Confirm Password"
            type={showConfirmPasssword?"text":"password"}
               className="text-[15px]"
               
               name="confirmPassword"
               value={formik.values.confirmPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />

 <span className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" onClick={()=>setConfirmPassword((prev)=>!prev)}>
 {showConfirmPasssword?<i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i>}
 
 </span>

       </div>
          {(formik.touched.confirmPassword|| formik.values.confirmPassword)&&formik.errors.confirmPassword? <Alert color="failure" className="mt-1">
      <span className="font-medium space-x-1.5"><i className="fa-solid fa-circle-info"></i><span>{formik.errors.confirmPassword}</span></span>
    </Alert>:null}
           
        </div>
{/* input phone */}
        <div className="mb-4">
          <FloatingLabel
            variant="outlined"
            label="Phone"
            type="tel"
               className="text-[15px]"
               name="phoneNumber"
               value={formik.values.phoneNumber}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
          />
              {(formik.touched.phoneNumber||formik.values.phoneNumber)&&formik.errors.phoneNumber?  <Alert color="failure" className="mt-1">
      <span className="font-medium space-x-1.5"><i className="fa-solid fa-circle-info"></i><span>{formik.errors.phoneNumber}</span></span>
    </Alert>:null}
          
        </div>
        <div className="mb-3">

        <button type="submit" className="disabled:bg-main-300 bg-main-500 w-full mb-1.5 block py-3 px-2 rounded-4xl text-white cursor-pointer " disabled={loadingSpinner}> 
          {loadingSpinner?<i className="fa-solid fa-spinner fa-spin-pulse me-1"></i>:null}
          Create Acount</button>
          {successMessage? <Alert color="success">
      <span className="font-medium">{successMessage}</span> 
    </Alert>:null}
       {errorMessage? <Alert color="failure">
      <span className="font-medium">{errorMessage}</span> 
    </Alert>:null}
        </div>
      </form>
      <div className="text-center">
        <p className="font-semibold">Already have an account?<Link to={'/signIn'} className="ms-1 font-bold text-main-500">
        Sign In</Link></p>
      </div>
  </div>
    </div>
    </>
  );
}
