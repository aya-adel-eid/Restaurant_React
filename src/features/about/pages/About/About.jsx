import style from "./About.module.css";
import { motion } from "framer-motion";
import Header from "../../../../components/Shared/header/Header";
import { Link } from "react-router-dom";
import aboutImage from "../../../../assets/images/aboutImage.png";
import { Helmet } from "react-helmet";

import {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  stagger,
  viewportSettings,
} from "../../../../lib/motionVariants";

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

  return (
    <>
      <Helmet>
        <title>About page</title>
      </Helmet>

      <section>
        {/* ================= HEADER ================= */}

        <Header
          hightlight={"What We Serve"}
          text={"our Story & Mission"}
          decripOne={
            " From a humble kitchen dream to a culinary landmark — discover the passion"
          }
          decripTwo={"behind every plate."}
        />

        {/* ================= INTRO ================= */}

        <div className="py-10 sm:py-14 lg:py-16 px-4 sm:px-8 lg:px-15 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 bg-bgMain">
          {/* IMAGE */}

          <motion.div
            className="relative w-full h-64 sm:h-96 lg:h-160"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeLeft}
          >
            <motion.img
              src={aboutImage}
              alt="Bistro Bliss interior"
              className="w-full h-full object-cover rounded-2xl"
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            />

            {/* CONTACT CARD */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#2b2b2b]/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 w-[calc(100%-1.5rem)] sm:w-fit absolute left-3 right-3 bottom-3 sm:left-auto sm:right-6 sm:-bottom-8 shadow-xl"
            >
              <h3 className="text-base sm:text-lg font-bold text-white pb-2.5">
                Come and visit us!
              </h3>

              <div className="flex items-center gap-3 text-sm font-medium text-white py-1">
                <i className="fa-solid fa-phone text-main-500 w-4"></i>
                <span>(414) 857 – 0107</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-white py-1">
                <i className="fa-solid fa-envelope text-main-500 w-4"></i>
                <span>happytummy@restaurant.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-medium text-white py-1">
                <i className="fa-solid fa-location-dot text-main-500 w-4"></i>
                <span>837 W. Marshall Lane, Los Angeles</span>
              </div>
            </motion.div>
          </motion.div>

          {/* CONTENT */}

          <motion.div
            className="px-1 sm:px-5 flex flex-col justify-center pt-6 lg:pt-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeRight}
          >
            <motion.h5
              variants={fadeUp}
              className="text-main-500 font-semibold text-sm sm:text-[18px] uppercase tracking-widest py-2 sm:py-2.5"
            >
              About Us
            </motion.h5>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight"
            >
              <span className="text-[#474747] block sm:inline">
                We Provide Healthy Food
              </span>{" "}
              <span className="text-main-500">For Your Family.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-500 py-2 pt-6 sm:pt-10 text-sm sm:text-base lg:text-lg"
            >
              Our story began with a vision to create a unique dining
              experience...
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-500 py-2 text-sm sm:text-base lg:text-lg"
            >
              At our place, we believe that dining is not just about food...
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-500 py-2 text-sm sm:text-base lg:text-lg"
            >
              Every ingredient we use is carefully sourced from local farmers
              and trusted suppliers. We are committed to serving food that is
              not only delicious but also nutritious and prepared with love —
              because your family deserves nothing less.
            </motion.p>

            {/* BUTTONS */}

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/menu"
                className="border-2 border-main-500 px-5 py-2 rounded-full capitalize text-sm sm:text-base
                text-main-500 hover:bg-main-500 hover:text-white font-medium
                cursor-pointer transition-all duration-500"
              >
                Explore our menu
              </Link>

              <Link
                to="/contact"
                className="border-2 border-main-500 px-5 py-2 rounded-full capitalize text-sm sm:text-base
                hover:text-main-500 hover:bg-white bg-main-500 text-white
                font-medium cursor-pointer transition-all duration-500"
              >
                Get in touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= CORE VALUES ================= */}

        <div className="py-12 sm:py-16 px-4 sm:px-8 lg:px-15 bg-white">
          {/* SECTION TITLE */}

          <motion.div
            className="flex flex-col justify-center items-center py-2 sm:py-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
          >
            <h4 className="text-main-500 text-base sm:text-xl font-semibold tracking-wide py-2">
              What Drives Us
            </h4>

            <h2 className="space-x-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold py-2">
              <span className="text-[#474747]">Our Core</span>
              <span className="text-main-500">Values</span>
            </h2>
          </motion.div>

          {/* CARDS */}

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 py-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={stagger}
          >
            {CORE_VALUES.map((valu) => (
              <motion.div
                key={valu.id}
                variants={scaleIn}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="group text-center bg-white border border-gray-100 shadow-sm p-5 sm:p-6 rounded-2xl hover:shadow-lg transition-shadow duration-500"
              >
                {/* ICON */}

                <div className="flex justify-center items-center py-2 sm:py-3">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 4,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="size-14 sm:size-15 rounded-full text-[#474747] text-lg sm:text-xl flex justify-center items-center
                    border-2 border-[#474747] group-hover:bg-main-500 group-hover:border-main-500
                    group-hover:text-white transition-all duration-500"
                  >
                    <i className={valu.icon}></i>
                  </motion.div>
                </div>

                <div className="py-2 sm:py-3">
                  <h3 className="font-bold text-base sm:text-[18px] py-1.5">
                    {valu.title}
                  </h3>

                  <p className="text-gray-400 text-sm">{valu.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= TESTIMONIALS ================= */}

        <div className="py-12 sm:py-16 px-4 sm:px-8 lg:px-15 bg-bgMain">
          {/* SECTION TITLE */}

          <motion.div
            className="flex flex-col justify-center items-center py-2 sm:py-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUp}
          >
            <h4 className="text-main-500 text-base sm:text-xl font-semibold tracking-wide py-2">
              Happy Guests
            </h4>

            <h2 className="space-x-1.5 text-2xl sm:text-3xl lg:text-4xl font-bold py-2">
              <span className="text-[#474747]">What Our </span>
              <span className="text-main-500">Customers Say</span>
            </h2>
          </motion.div>

          {/* TESTIMONIAL CARDS */}

          <motion.div
            className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={stagger}
          >
            {TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* RATING */}

                <div className="flex gap-1 py-1.5">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, index) => (
                      <motion.i
                        key={index}
                        className="fa-solid fa-star text-yellow-400 text-sm"
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.06,
                        }}
                      ></motion.i>
                    ),
                  )}
                </div>

                <h2 className="text-main-500 text-base sm:text-lg font-medium py-2">
                  {testimonial.title}
                </h2>

                <p className="py-1 text-gray-400 text-sm sm:text-base">
                  {testimonial.review}
                </p>

                {/* USER */}

                <div className="flex gap-3.5 py-4 items-center">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="size-10 shrink-0 rounded-full flex justify-center items-center bg-main-500 text-white font-semibold"
                  >
                    {testimonial.avatarLetter}
                  </motion.div>

                  <div>
                    <h4 className="text-sm font-bold">{testimonial.name}</h4>

                    <span className="text-xs text-gray-500">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
