import { useEffect, useState } from "react";
import style from "./AboutUs.module.css";
import { Link } from "react-router-dom";
export function AboutUs() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="py-15 px-15 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* left image */}
        <div className=" relative w-full h-160 lg:px-8">
          <img
            src="/src/assets/aboutImage.png"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="bg-[#474747] rounded-xl p-6 w-fit absolute -right-8 -bottom-10">
            <h3 className="text-lg font-bold text-white pb-2.5">
              Come and visit us!
            </h3>
            <div className="space-x-3 text-[15px] font-medium text-white tracking-widest">
              <span>
                <i className="fa-solid fa-phone"></i>
              </span>
              <span>(414) 857 – 0107</span>
            </div>
            <div className="space-x-3 text-[15px] font-medium text-white ">
              <span>
                <i className="fa-solid fa-envelope"></i>
              </span>
              <span>happytummy@restaurant.com</span>
            </div>
            <div className="space-x-3 text-[15px] font-medium text-white tracking-widest">
              <span>
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <span>837 W. Marshall Lane, Los Angeles</span>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="px-5 flex flex-col justify-center">
          {/* header */}
          <div>
            <h5 className="text-main-500 font-semibold text-[18px] uppercase py-2.5">
              About Us
            </h5>
            <h2 className="text-3xl lg:text-5xl font-bold">
              <span className="text-[#474747]">We Provide Healthy Food</span>
              <br />
              <span className="text-main-500 pt-1.5"> For Your Family.</span>
            </h2>
            <p className="text-gray-500 text-[18px] py-3 pt-12">
              Our story began with a vision to create a unique dining
              experience...
            </p>
            <p className="text-gray-500 text-[18px] py-3">
              At our place, we believe that dining is not just about food...
            </p>
          </div>
          <div className="py-8 flex">
            <div className="text-center  border-e-2 border-e-gray-300 w-fit px-4">
              <h5 className="text-main-500 font-bold text-4xl py-1.5">10+</h5>
              <span className="text-[18px] text-gray-500">
                Years Experience
              </span>
            </div>
            <div className="text-center  border-e-2 border-e-gray-300 w-fit px-4">
              <h5 className="text-main-500 font-bold text-4xl py-1.5">500+</h5>
              <span className="text-[18px] text-gray-500">Menu Items</span>
            </div>
            <div className="text-center  w-fit px-4">
              <h5 className="text-main-500 font-bold text-4xl py-1.5">20K+</h5>
              <span className="text-[18px] text-gray-500">Happy Clients</span>
            </div>
          </div>
          <Link
            to={"/about"}
            className="bg-main-500 text-white py-4 px-6 rounded-full text-lg  border-2 border-main-500 w-fit
            font-semibold hover:border-2 hover:border-main-600 hover:text-main-500
             hover:bg-white cursor-pointer transition-all duration-300"
          >
            More About Us
          </Link>
        </div>
      </div>
    </>
  );
}
