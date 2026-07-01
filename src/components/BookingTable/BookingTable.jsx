import { useEffect} from "react";
import style from "./BookingTable.module.css";
import Header from "../Shared/header/Header";
import { useFormik } from "formik";
import * as YUp from 'yup'
export function BookingTable() {
  const  yup=YUp.object().shape({
  name:YUp.string().required().min(3,'Minimum 3 characters.'),
  date:YUp.string().required("Date is required").min(new Date(), "Date cannot be before today"),
  time:YUp.string().required('Time is required'),
  phone:YUp.string().required('Phone is required'),
  persons:YUp.string().required('number of persons ')


})
  
  // form
const formik=useFormik({
  initialValues:{
    name:'',
    phone:'',
    date:'',
   persons:'',
   time:''
  },validationSchema:yup
  ,onSubmit:bookingTable
})

// 
function bookingTable(value){
console.log(value);

}


  useEffect(() => {}, []);
  return (
    <>
     <section id="Booktable" className="">
      {/* header */}
       <Header hightlight={'Reserve your seat'} 
            text={"Book A Table"} 
            decripOne={`Reserve your table in just a 
              few clicks and enjoy a memorable dining experience`}
            decripTwo={" with fresh flavors, exceptional service, and a warm atmosphere."}
            ></Header>
            <div className="py-8 px-8">

     <div className=" p-12 bg-white shadow-lg rounded-4xl">
    
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <div className="space-y-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* date */}
        <div>
  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
    Date
  </label>

  <input
    type="date" name="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date}
    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
  />
  {
    (formik.touched.date||formik.values.date)&&formik.errors.date?<p className="py-3 px-1.5s text-red-500 font-medium">{formik.errors.date}</p>:null
  }
  

        </div>
        {/* time */}
          <div>
  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
    Date
  </label>

  <input
    type="time" name="time" value={formik.values.time} onChange={formik.handleChange} onBlur={formik.handleBlur}
    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
  />
   {
    (formik.touched.time||formik.values.time)&&formik.errors.time?<p className="py-3 px-1.5s text-red-500 font-medium">{formik.errors.time}</p>:null
  }
  

        </div>
        {/* name */}
          <div>
  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
    Name
  </label>
 
  <input name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
    type="text" placeholder="Enter your name "
    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
  />
 {
    (formik.touched.name||formik.values.name)&&formik.errors.name?<p className="py-3 px-1.5s text-red-500 font-medium">{formik.errors.name}</p>:null
  }
  
        </div>
        {/* phone */}
         <div>
  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
    Phone
  </label>

  <input
    type="tel" placeholder="Enter your number " 
    name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
  />
   {
    (formik.touched.phone||formik.values.phone)&&formik.errors.phone?<p className="py-3 px-1.5s text-red-500 font-medium">{formik.errors.phone}</p>:null
  }
  

        </div>

   
  <div>
  <label className="font-semibold text-gray-700 text-lg px-1.5 pb-3 block">
       Select number of gust
  </label>

  <select  name="persons " value={formik.values.persons} onChange={formik.handleChange} onBlur={formik.handleBlur}
    type="tel" placeholder="Enter your number "
    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
  >
       <option value="" disabled>
      Select an option
    </option>
    <option value="1">1 Guest</option>
    <option value="2">2 Guests</option>
    <option value="3">3 Guests</option>
    <option value="4">4 Guests</option>
  </select>
   {
    (formik.touched.persons||formik.values.persons)&&formik.errors.persons?<p className="py-3 px-1.5s text-red-500 font-medium">{formik.errors.persons}</p>:null
  }
  

        
        </div>

        </div>


        <div className="p-4">
          <button className="py-3 cursor-pointer px-6 w-full text-center
           bg-main-500 text-lg tracking-widest lg:text-xl font-bold text-white rounded-4xl">Confirm reservation</button>
        </div>
</form>
    
     </div>
            </div>


     </section>
    </>
  );
}
