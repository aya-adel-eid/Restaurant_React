import { useEffect } from "react";
import style from "./Home.module.css";
import Header from "../Shared/header/Header";
import { Link } from "react-router-dom";
import { AboutUs } from "../AboutUs/AboutUs";

export default function Home() {
  useEffect(() => {}, []);
  //
  const DELIVERY_FEATURES = [
    {
      id: 1,
      icon: "fa-regular fa-clock",
      title: "Delivery within 30 minutes",
    },
    {
      id: 2,
      icon: "fa-solid fa-tag",
      title: "Best Offer & Prices",
    },
    {
      id: 3,
      icon: "fa-solid fa-headset",
      title: "Online Services Available",
    },
  ];
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
  const DELIVERY_APPS = [
    {
      id: 1,
      name: "Uber Eats",
      logo: "/src/assets/Group1.png",
    },
    {
      id: 2,
      name: "Grubhub",
      logo: "/src/assets/grubhub.png",
    },
    {
      id: 3,
      name: "Postmates",
      logo: "/src/assets/postmates.png",
    },
    {
      id: 4,
      name: "DoorDash",
      logo: "/src/assets/doordash.png",
    },
    {
      id: 5,
      name: "Foodpanda",
      logo: "/src/assets/foodpanda.png",
    },
    {
      id: 6,
      name: "Deliveroo",
      logo: "/src/assets/deliveroo.png",
    },
    {
      id: 7,
      name: "Instacart",
      logo: "/src/assets/instacar.png",
    },
    {
      id: 8,
      name: "Just Eat",
      logo: "/src/assets/justeat.png",
    },
    {
      id: 9,
      name: "DiDi Food",
      logo: "/src/assets/didifood.png",
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
            <div className="py-5 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
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
          <div className="py-10 px-4 sm:px-8 lg:px-15">
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
                      key={cat.id}
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
        <div className="bg-white py-10 px-4 sm:px-8 lg:px-15">
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
                  <div
                    className="bg-white shadow-xl rounded-2xl hover:-translate-y-3.5 transation-all duration-300"
                    key={service.id}
                  >
                    {/* image */}
                    <div>
                      <img
                        src={service.image}
                        className="w-full h-56 sm:h-64 lg:h-80 object-cove rounded-t-2xl"
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
        {/* Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 py-10 px-4 sm:px-8 lg:px-12 justify-between space-x-6">
          {/* left */}
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-3.5">
            <div className="w-full sm:w-1/2">
              <img
                src="/src/assets/chef.png"
                alt="chef"
                className="w-full h-80 sm:h-120 lg:h-163 object-cover rounded-xl"
              />
            </div>

            <div className="w-full sm:w-1/2 space-y-6 py-2 flex flex-col justify-center">
              <img
                src="/src/assets/hot-pot-thai-food 1.png"
                alt=""
                className="w-full h-79.5 lg:h-60 object-cover rounded-xl hover:scale-110 transition duration-300"
              />
              <img
                src="/src/assets/kebab-set-table 1.png"
                alt=""
                className="w-full h-79.5 lg:h-60 object-cover rounded-xl hover:scale-110 transition duration-300"
              />
            </div>
          </div>
          {/* right */}
          <div className=" lg:px-8 flex flex-col items-center">
            <div>
              <div>
                <h5 className="text-main-500 font-semibold text-[18px] uppercase py-2.5">
                  Lightning Fast Delivery
                </h5>
                <h2 className="text-3xl lg:text-5xl font-bold">
                  <span className="text-[#474747]">Fastest </span>

                  <span className="text-main-500 pt-1.5">
                    Food Delivery in City
                  </span>
                </h2>
                <p className="text-gray-500 text-[20px] py-3 pt-12 w-full lg:w-137.5">
                  Our visual designer lets you quickly and drag your way to
                  custom apps for both desktop and mobile, keeping you fed in
                  record time.
                </p>
              </div>
              <div className="py-5 flex flex-col gap-6">
                {DELIVERY_FEATURES.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 py-6 group border-4 border-transparent
   hover:border-main-600 hover:bg-gray-200 px-6 rounded-3xl hover:translate-x-3.5 transition-all duration-300"
                  >
                    {/* icon */}
                    <div
                      className="size-12 flex justify-center items-center rounded-full
                   bg-main-500 text-white text-[20px] group-hover:text-main-500
                    group-hover:border-4 group-hover:border-dashed group-hover:border-main-500
                     transation-all duration-300 group-hover:bg-white"
                    >
                      <i className={item.icon}></i>
                    </div>
                    <h2 className="text-xl font-medium ">{item.title}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* order online */}
        <div className="py-20 px-4 lg:px-15 bg-white flex flex-col lg:flex-row gap-5">
          {/* left */}
          <div className="w-full lg:w-[30%] flex flex-col justify-center gap-4">
            {/* header */}
            <div>
              <h5 className="text-main-500 font-semibold text-[14px]  lg:text-[18px] uppercase py-2.5">
                Order Online
              </h5>
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-[#474747]">Order Through </span>

                <span className="text-main-500 pt-1.5">Your App</span>
              </h2>
              <p className="text-gray-500 text-sm lg:text-[14px] py-3 pt-12 lg:w-100">
                Can't make it in? No problem. Order your favourite dishes
                through your preferred delivery app and enjoy restaurant-quality
                food from the comfort of home.
              </p>
            </div>
          </div>
          <div className="lg:w-[70%] lg:px-10">
            <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              {DELIVERY_APPS.map((item) => (
                <div
                  className="bg-white p-8 shadow-sm rounded-2xl text-center border-2 border-transparent
                   hover:border-2 hover:border-main-500 hover:-translate-y-3 transation-all duration-300 cursor-pointer"
                  key={item.id}
                >
                  <div className="flex justify-center">
                    <img src={item.logo} alt={item.name} className=" w-1/2" />
                  </div>
                  <h3 className="text-xl font-semibold py-4">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
