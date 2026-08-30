import style from "./Home.module.css";

import { Link } from "react-router-dom";
import { AboutUs } from "../AboutUs/AboutUs";

// Services images
import kebabSetTable from "../../assets/kebab-set-table 1.png";
import birthdayImg from "../../assets/charming-female-blowing-candles-birthday-.png";
import weddingImg from "../../assets/happy-man-wife-sunny-day 1.png";
import eventsImg from "../../assets/group.png";

// Delivery section images
import chefImg from "../../assets/chef.png";
import hotPotImg from "../../assets/hot-pot-thai-food 1.png";

// Delivery apps logos
import uberEatsLogo from "../../assets/Group1.png";
import grubhubLogo from "../../assets/grubhub.png";
import postmatesLogo from "../../assets/postmates.png";
import doordashLogo from "../../assets/doordash.png";
import foodpandaLogo from "../../assets/foodpanda.png";
import deliverooLogo from "../../assets/deliveroo.png";
import instacartLogo from "../../assets/instacar.png";
import justeatLogo from "../../assets/justeat.png";
import didifoodLogo from "../../assets/didifood.png";
import { Helmet } from "react-helmet";

export default function Home() {
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
      image: kebabSetTable,
      title: "Caterings",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 2,
      image: birthdayImg,
      title: "Birthdays",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 3,
      image: weddingImg,
      title: "Weddings",
      description:
        "In the new era of technology we look in the future with certainty for life.",
    },
    {
      id: 4,
      image: eventsImg,
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
    { id: 1, name: "Uber Eats", logo: uberEatsLogo },
    { id: 2, name: "Grubhub", logo: grubhubLogo },
    { id: 3, name: "Postmates", logo: postmatesLogo },
    { id: 4, name: "DoorDash", logo: doordashLogo },
    { id: 5, name: "Foodpanda", logo: foodpandaLogo },
    { id: 6, name: "Deliveroo", logo: deliverooLogo },
    { id: 7, name: "Instacart", logo: instacartLogo },
    { id: 8, name: "Just Eat", logo: justeatLogo },
    { id: 9, name: "DiDi Food", logo: didifoodLogo },
  ];

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <section className="overflow-x-hidden">
        {/* hero */}
        <div
          className={`${style.image} min-h-screen flex justify-center items-center px-4`}
        >
          <div className="text-center">
            <h4 className="text-main-600 text-sm sm:text-lg lg:text-xl font-semibold tracking-wide sm:tracking-widest leading-3.5 py-4">
              It's Not Fast Food, It's
            </h4>
            <h2 className="text-[#474747] text-3xl sm:text-5xl lg:text-7xl font-bold tracking-wide">
              <span>Best Food</span>
              <br />
              <span>For Your Taste</span>
            </h2>
            <p className="py-4 text-sm sm:text-lg lg:text-xl">
              <span>Discover delectable cuisine and unforgettable moments</span>
              <br />
              <span>in our welcoming, culinary haven.</span>
            </p>
            <div className="py-5 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
              <Link
                to={"/bookTable"}
                className="bg-main-500 text-white py-3 px-5 text-sm sm:py-3.5 sm:px-6 sm:text-base lg:py-4 lg:px-6 lg:text-lg rounded-full border-2 border-main-500
            font-semibold hover:border-2 hover:border-main-600 hover:text-main-500
             hover:bg-white cursor-pointer transition-all duration-300"
              >
                Book A Table
              </Link>
              <Link
                to={"/menu"}
                className="text-[#474747] border-2 border-[#474747] py-3 px-5 text-sm sm:py-3.5 sm:px-6 sm:text-base lg:py-4 lg:px-6 lg:text-lg
               rounded-full hover:bg-main-500
               hover:border-main-500 cursor-pointer transition-all duration-300
               hover:text-white"
              >
                Explore Menu
              </Link>
            </div>
          </div>
        </div>

        {/* offer / menu categories */}
        <div className="bg-white">
          <div className="py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-15">
            <div className="flex flex-col justify-center items-center">
              <h4 className="text-main-500 text-sm sm:text-lg lg:text-xl font-semibold tracking-wide py-2">
                What We Offer
              </h4>
              <h2 className="space-x-1.5 text-2xl sm:text-4xl lg:text-6xl font-bold py-2 text-center">
                <span className="text-[#474747]">Browse Our</span>
                <span className="text-main-500">Menu</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-8 sm:py-10">
              {MENU_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-6 sm:p-8 group bg-white border border-gray-100 rounded-2xl shadow-sm flex
                  flex-col justify-center items-center hover:-translate-y-2 hover:shadow-md hover:border-main-200 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="size-12 sm:size-14 rounded-full cursor-pointer border-2 border-[#474747] group-hover:bg-main-500 group-hover:border-main-500 text-[#474747] text-base sm:text-lg
     group-hover:text-white flex justify-center items-center transition-all duration-300"
                  >
                    <i className={cat.icon}></i>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-semibold py-2.5">
                    {cat.title}
                  </h2>
                  <p className="text-sm sm:text-base lg:text-[18px] text-gray-500 text-center">
                    {cat.description}
                  </p>
                  <Link
                    to={"/menu"}
                    className="text-main-500 text-sm sm:text-lg py-3 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  >
                    {cat.buttonText}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* about us */}
        <AboutUs></AboutUs>

        {/* services */}
        <div className="bg-bgMain py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-15">
          <div className="flex flex-col justify-center items-center py-2 sm:py-4 text-center">
            <h4 className="text-main-500 text-sm sm:text-lg lg:text-xl font-semibold tracking-wide py-2">
              What We Provide
            </h4>
            <h2 className="space-x-1.5 text-xl sm:text-2xl lg:text-4xl font-bold py-2 text-center">
              <span className="text-[#474747]">Unique Services For</span>
              <span className="text-main-500">Your Events</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-6">
            {SERVICES.map((service) => (
              <div
                className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-md transition-all duration-300"
                key={service.id}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover"
                />
                <div className="py-6 sm:py-8 text-center px-3">
                  <h3 className="text-main-500 text-lg sm:text-2xl py-1.5 font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base lg:text-[18px]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white grid grid-cols-1 lg:grid-cols-2 py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-12 gap-8 lg:gap-10">
          {/* left */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <img
                src={chefImg}
                alt="chef"
                className="w-full h-64 sm:h-120 lg:h-163 object-cover rounded-2xl"
              />
            </div>

            <div className="w-full sm:w-1/2 space-y-4 sm:space-y-6 py-2 flex flex-col justify-center">
              <img
                src={hotPotImg}
                alt=""
                className="w-full h-48 sm:h-79.5 lg:h-60 object-cover rounded-2xl hover:scale-105 transition-all duration-300"
              />
              <img
                src={kebabSetTable}
                alt=""
                className="w-full h-48 sm:h-79.5 lg:h-60 object-cover rounded-2xl hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
          {/* right */}
          <div className="lg:px-8 flex flex-col items-center">
            <div className="w-full">
              <div>
                <h5 className="text-main-500 font-semibold text-sm sm:text-base lg:text-[18px] uppercase py-2.5">
                  Lightning Fast Delivery
                </h5>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
                  <span className="text-[#474747]">Fastest </span>
                  <span className="text-main-500 pt-1.5">
                    Food Delivery in City
                  </span>
                </h2>
                <p className="text-gray-500 text-sm sm:text-base lg:text-[20px] py-3 pt-6 lg:pt-12 w-full lg:w-137.5">
                  Our visual designer lets you quickly and drag your way to
                  custom apps for both desktop and mobile, keeping you fed in
                  record time.
                </p>
              </div>
              <div className="py-5 flex flex-col gap-3 sm:gap-4">
                {DELIVERY_FEATURES.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4 group border border-transparent
   hover:border-main-200 hover:bg-main-500/5 px-4 sm:px-6 rounded-2xl lg:hover:translate-x-2 transition-all duration-300"
                  >
                    <div
                      className="size-10 sm:size-12 shrink-0 flex justify-center items-center rounded-full
                   bg-main-500 text-white text-base sm:text-[20px] group-hover:text-main-500
                    group-hover:border-2 group-hover:border-dashed group-hover:border-main-500
                     transition-all duration-300 group-hover:bg-white"
                    >
                      <i className={item.icon}></i>
                    </div>
                    <h2 className="text-base sm:text-xl font-medium">
                      {item.title}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* order online */}
        <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-15 bg-bgMain flex flex-col lg:flex-row gap-6 lg:gap-5">
          {/* left */}
          <div className="w-full lg:w-[30%] flex flex-col justify-center gap-4">
            <div>
              <h5 className="text-main-500 font-semibold text-sm sm:text-[14px] lg:text-[18px] uppercase py-2.5">
                Order Online
              </h5>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
                <span className="text-[#474747]">Order Through </span>
                <span className="text-main-500 pt-1.5">Your App</span>
              </h2>
              <p className="text-gray-500 text-sm lg:text-[14px] py-3 pt-6 lg:pt-12 lg:w-100">
                Can't make it in? No problem. Order your favourite dishes
                through your preferred delivery app and enjoy restaurant-quality
                food from the comfort of home.
              </p>
            </div>
          </div>
          <div className="lg:w-[70%] lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 justify-center">
              {DELIVERY_APPS.map((item) => (
                <div
                  className="bg-white p-5 sm:p-8 border border-gray-100 shadow-sm rounded-2xl text-center
                   hover:border-main-300 hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                  key={item.id}
                >
                  <div className="flex justify-center">
                    <img src={item.logo} alt={item.name} className="w-1/2" />
                  </div>
                  <h3 className="text-sm sm:text-lg lg:text-xl font-semibold py-2 sm:py-4">
                    {item.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
