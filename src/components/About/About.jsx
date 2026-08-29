import { useEffect } from "react";
import style from "./About.module.css";
import Header from "../Shared/header/Header";

import { Link } from "react-router-dom";
import aboutImage from "../../assets/aboutImage.png";
import { Helmet } from "react-helmet";

export function About() {
  const CORE_VALUES = [
    {
      id: 1,
      icon: "fa-solid fa-leaf",
      title: "Fresh Ingredients",
      description:
        "We source only the finest local and seasonal ingredients, ensuring every dish is packed with flavor and nutrition.",
    },
    {
      id: 2,
      icon: "fa-solid fa-heart",
      title: "Made With Love",
      description:
        "Every plate that leaves our kitchen carries the passion and care of our dedicated culinary team.",
    },
    {
      id: 3,
      icon: "fa-solid fa-users",
      title: "Family Friendly",
      description:
        "We welcome guests of all ages, creating a warm and inclusive environment where everyone feels at home.",
    },
    {
      id: 4,
      icon: "fa-solid fa-award",
      title: "Award Winning",
      description:
        "Recognized by top culinary guides for excellence in taste, service, and dining experience since 2005.",
    },
  ];
  const TESTIMONIALS = [
    {
      id: 1,
      rating: 5,
      title: "The best restaurant",
      review:
        "Last night, we dined at Bistro Bliss and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles. The food was extraordinary.",
      name: "Sophie Robson",
      location: "Los Angeles, CA",
      avatarLetter: "S",
    },
    {
      id: 2,
      rating: 5,
      title: "Simply delicious",
      review:
        "Bistro Bliss exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was beautifully presented and full of flavor.",
      name: "Matt Cannon",
      location: "San Diego, CA",
      avatarLetter: "M",
    },
    {
      id: 3,
      rating: 5,
      title: "One of a kind restaurant",
      review:
        "The culinary experience at Bistro Bliss is second to none. The atmosphere is vibrant and the food is nothing short of extraordinary. The highlight of our evening — highly recommended to everyone.",
      name: "Andy Smith",
      location: "San Francisco, CA",
      avatarLetter: "A",
    },
  ];

  useEffect(() => {}, []);
  return (
    <>
      <Helmet>
        <title>About page</title>
      </Helmet>
      <section>
        <Header
          hightlight={"What We Serve"}
          text={"our Story & Mission"}
          decripOne={
            " From a humble kitchen dream to a culinary landmark — discover the passion"
          }
          decripTwo={"behind every plate."}
        ></Header>
        <div className="py-15 px-4 sm:px-8 lg:px-15 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-[#F8F9FA]">
          {/* left image */}
          <div className=" relative w-full h-160 lg:px-8">
            <img
              src={aboutImage}
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

                <span className="text-main-500 pt-1.5">For Your Family.</span>
              </h2>
              <p className="text-gray-500  py-3 pt-12 text-[14px] lg:text-[18px]">
                Our story began with a vision to create a unique dining
                experience...
              </p>
              <p className="text-gray-500  py-3 text-[14px] lg:text-[18px]">
                At our place, we believe that dining is not just about food...
              </p>
              <p className="text-gray-500 text-[14px] lg:text-[18px] py-4">
                Every ingredient we use is carefully sourced from local farmers
                and trusted suppliers. We are committed to serving food that is
                not only delicious but also nutritious and prepared with love —
                because your family deserves nothing less.
              </p>
              <div className="flex gap-2">
                <Link
                  to={"/menu"}
                  className="border-2 border-main-500 px-4 py-1.5 rounded-full capitalize
                 text-main-500 hover:bg-main-500 hover:text-white font-medium cursor-pointer transition-all duration-500"
                >
                  Explore our menu
                </Link>
                <Link
                  to={"/contact"}
                  className="border-2 hover:border-main-500 px-4 py-1.5 rounded-full capitalize
                 hover:text-main-500 hover:bg-white bg-main-500 text-white font-medium cursor-pointer transition-all duration-800"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Values */}
        <div className="py-15 px-4 sm:px-8 lg:px-15  bg-white">
          {/* header */}
          <div className="flex flex-col justify-center items-center py-4">
            <h4 className="text-main-500 text-xl font-semibold tracking-wide py-2 ">
              What Drives Us
            </h4>
            <h2 className=" space-x-1.5  text-2xl lg:text-4xl font-bold py-2">
              <span className="text-[#474747] ">Our Core</span>
              <span className="text-main-500">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-3">
            {CORE_VALUES.map((valu) => {
              return (
                <div
                  key={valu.id}
                  className="group text-center bg-white shadow shadow-gray-200 p-4 rounded-xl hover:-translate-y-3 transition-all duration-500"
                >
                  {/* icon */}
                  <div className="flex justify-center items-center py-3">
                    <div
                      className="size-15 rounded-full text-[#474747] text-xl flex justify-center items-center
   border-2 border-[#474747]  group-hover:bg-[#474747] group-hover:text-white transition-all duration-700"
                    >
                      <i className={valu.icon}></i>
                    </div>
                  </div>
                  <div className="py-3">
                    <h3 className="font-bold text-xs text-[18px] py-1.5">
                      {valu.title}
                    </h3>
                    <p className="text-gray-400  text-[14px]">
                      {valu.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* testimonial */}
        <div className="py-15 px-4 sm:px-8 lg:px-15 ">
          {/* header */}
          <div className="flex flex-col justify-center items-center py-4">
            <h4 className="text-main-500 text-xl font-semibold tracking-wide py-2 ">
              Happy Guests
            </h4>
            <h2 className=" space-x-1.5  text-2xl lg:text-4xl font-bold py-2">
              <span className="text-[#474747] ">What Our </span>
              <span className="text-main-500">Customers Say</span>
            </h2>
          </div>
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => {
              return (
                <div className="bg-white p-6 rounded-2xl " key={testimonial.id}>
                  {/* icons */}
                  <div className="flex gap-1 py-1.5">
                    {Array.from({ length: testimonial.rating }).map(
                      (_, index) => (
                        <i
                          key={index}
                          className="fa-solid fa-star text-yellow-400"
                        ></i>
                      ),
                    )}
                  </div>
                  <h2 className="text-main-500 text-lg font-medium py-2">
                    {testimonial.title}
                  </h2>
                  <p className="py-1 text-gray-400 ">{testimonial.review}</p>
                  <div className="flex gap-3.5 py-4 items-center">
                    {/* avater */}
                    <div className="size-10 rounded-full flex justify-center items-center bg-main-500 text-white">
                      {testimonial.avatarLetter}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold ">{testimonial.name}</h4>
                      <span className="text-xs text-gray-500">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
