import { useEffect } from "react";
import style from "./Home.module.css";
import Header from "../Shared/header/Header";
import { Link } from "react-router-dom";
import { AboutUs } from "../AboutUs/AboutUs";

export default function Home() {
  useEffect(() => {}, []);
  //
  const SERVICES = [
    {
      id: 1,
      image: "/src/assets/kebab-set-table 1.png",
      title: "Caterings",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 2,
      image: "/src/assets/charming-female-blowing-candles-birthday-.png",
      title: "Birthdays",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 3,
      image: "/src/assets/happy-man-wife-sunny-day 1.png",
      title: "Weddings",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 4,
      image: "/src/assets/group.png",
      title: "Events",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
  ];
  const MENU_CATEGORIES = [
    {
      id: 1,
      icon: "fa-solid fa-mug-saucer",
      title: "Breakfast",
      description: "In the new era of technology...",
      buttonText: "Explore Menu",
      link: "/menu/breakfast",
    },
    {
      id: 2,
      icon: "fa-solid fa-bowl-food",
      title: "Main Dishes",
      description: "In the new era of technology...",
      buttonText: "Explore Menu",
      link: "/menu/main-dishes",
    },
    {
      id: 3,
      icon: "fa-solid fa-champagne-glasses",
      title: "Drinks",
      description: "In the new era of technology...",
      buttonText: "Explore Menu",
      link: "/menu/drinks",
    },
    {
      id: 4,
      icon: "fa-solid fa-cookie-bite",
      title: "Desserts",
      description: "In the new era of technology...",
      buttonText: "Explore Menu",
      link: "/menu/desserts",
    },
  ];
  return (
    <>
      <section>
        {/* home */}
        <div
          className={`${style.image} min-h-screen flex justify-center items-center`}
        >
          {/* header */}
          <div className="text-center">
            <h4 className="text-main-600 text-xl font-semibold tracking-widest leading-3.5 py-4">
              It's Not Fast Food, It's
            </h4>
            <h2 className="text-[#474747] text-4xl lg:text-7xl font-bold tracking-wide ">
              <span>Best Food</span>
              <br />
              <span>For Your Taste</span>
            </h2>
            <p className=" py-4 text-xl">
              <span>Discover delectable cuisine and unforgettable moments</span>
              <br />
              <span>in our welcoming, culinary haven.</span>
            </p>
            {/* buttons */}
            <div className=" py-5 space-x-5">
              <Link
                to={"/bookTable"}
                className="bg-main-500 text-white py-4 px-6 rounded-full text-lg  border-2 border-main-500
            font-semibold hover:border-2 hover:border-main-600 hover:text-main-500
             hover:bg-white cursor-pointer transition-all duration-300"
              >
                Book A Table
              </Link>
              <Link
                to={"/menu"}
                className="text-[#474747] border-2
               border-[#474747] py-4 px-6 rounded-full text-lg hover:bg-main-500
               hover:border-main-500 cursor-pointer transition-all duration-300
               hover:text-white"
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
        {/* offer */}
        <div className="bg-white">
          <div className=" py-10 px-15 ">
            {/* header */}
            <div className="flex flex-col justify-center items-center">
              <h4 className="text-main-500 text-xl font-semibold tracking-wide py-2 ">
                What We Offer
              </h4>
              <h2 className=" space-x-1.5  text-4xl lg:text-6xl font-bold py-2">
                <span className="text-[#474747] ">Browse Our</span>
                <span className="text-main-500">Menu</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 py-10">
              {MENU_CATEGORIES
                ? MENU_CATEGORIES.map((cat) => (
                    <div
                      className="p-8 group bg-white rounded-xl shadow-xl shadow-gray-200 flex 
                  flex-col justify-center items-center hover:-translate-y-3.5 transation-all duration-300 cursor-pointer"
                    >
                      {/* icon */}
                      <div
                        className="size-14 rounded-full cursor-pointer border-2 border-[#474747] group-hover:bg-[#474747] text-[#474747] text-lg
     group-hover:text-white flex justify-center items-center transition-all duration-300"
                      >
                        <i className={cat.icon}></i>
                      </div>
                      {/* title */}
                      <h2 className="text-2xl font-semibold py-2.5">
                        {cat.title}
                      </h2>
                      <p className="text-[18px] text-gray-500">
                        {cat.description}
                      </p>
                      <Link
                        to={"/menu"}
                        className="text-main-500 text-lg py-3 font-semibold space-x-2"
                      >
                        {cat.buttonText}
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  ))
                : "Not Found"}
            </div>
          </div>
        </div>
        {/* about us */}
        <AboutUs></AboutUs>
        {/* services */}
        <div className="bg-white py-10 px-15">
          {/* header */}
          <div className="flex flex-col justify-center items-center py-4">
            <h4 className="text-main-500 text-xl font-semibold tracking-wide py-2 ">
              What We Provide
            </h4>
            <h2 className=" space-x-1.5  text-2xl lg:text-4xl font-bold py-2">
              <span className="text-[#474747] ">Unique Services For</span>
              <span className="text-main-500">Your Events</span>
            </h2>
          </div>
          {/* cards */}
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            {SERVICES
              ? SERVICES.map((service) => (
                  <div className="bg-white shadow-xl rounded-2xl hover:-translate-y-3.5 transation-all duration-300">
                    {/* image */}
                    <div>
                      <img
                        src={service.image}
                        className="w-full h-80 object-cove rounded-t-2xl"
                      />
                    </div>
                    <div className="py-8 text-center px-3">
                      <h3 className="text-main-500 text-2xl py-1.5 font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 text-[18px]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))
              : "Not Found"}
          </div>
        </div>
      </section>
    </>
  );
}
