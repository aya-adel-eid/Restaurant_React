import { useEffect, useState } from "react";
import style from "./Contact.module.css";
import Header from "../Shared/header/Header";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
export function Contact() {
  const [loading, setLoading] = useState(false);
  const CONTACT_INFO = [
    {
      icon: "fa-solid fa-phone",
      title: "Call Us",
      details: ["+1-234-567-8900", "+1-414-857-0107"],
    },
    {
      icon: "fa-solid fa-envelope",
      title: "Email Us",
      details: ["yummy@bistrobliss.com", "support@bistrobliss.com"],
    },
    {
      icon: "fa-regular fa-clock",
      title: "Opening Hours",
      details: ["Mon – Fri: 11am – 8pm", "Sat & Sun: 9am – 10pm"],
    },
    {
      icon: "fa-solid fa-location-dot",
      title: "Our Location",
      details: [
        "837 W. Marshall Lane",
        "Los Angeles, CA 90001",
        "United States",
      ],
    },
  ];
  // validation
  const yup = YUP.object().shape({
    name: YUP.string().required("This field is required!"),
    email: YUP.string()
      .required("This field is required!")
      .email("invalid email"),
    subject: YUP.string().required("This field is required!"),
    message: YUP.string().required("This field is required!"),
  });
  // form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: yup,
    onSubmit: contactUs,
  });
  // call api
  function contactUs(values) {
    console.log(values);
    setLoading(true);
    axios
      .post(`https://restaurant-project-node-js.vercel.app/api/contact`, values)
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data.error);
        setLoading(false);
      });
  }

  return (
    <>
      <section>
        <Header
          hightlight={"Get In Touch"}
          text={"Contact Us"}
          decripOne={
            " We would love to hear from you. Whether it is a reservation, "
          }
          decripTwo={" feedback, or just a hello — we are here."}
        ></Header>
        <div className="px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 p-12">
          {/* left */}
          <div>
            {/* headers */}
            <div className="py-6">
              <h4 className="text-[#bb2d2d] text-lg font-semibold leading-5 ">
                What We Provide
              </h4>
              <h2 className="text-[20px] lg:text-[32px] leading-9.5 font-bold space-x-1 py-3">
                <span>We'd Love To</span>
                <span className="text-[#bb2d2d]">Hear From You!</span>
              </h2>
            </div>
            {/* form */}
            <div className="bg-white p-6 lg:p-20 rounded-3xl shadow-2xl">
              <form
                action=""
                className=" flex flex-col gap-5"
                onSubmit={formik.handleSubmit}
              >
                {/* name&email */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
                    />
                    {(formik.touched.name || formik.values.name) &&
                    formik.errors.name ? (
                      <p className="py-3 px-1.5s text-red-500 font-medium">
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="Enter email address"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className=" w-full h-14 rounded-2xl border border-gray-200
                       bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
                    />
                    {(formik.touched.email || formik.values.email) &&
                    formik.errors.email ? (
                      <p className="py-3 px-1.5s text-red-500 font-medium">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                {/* subject */}

                <div>
                  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Write a Subject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.subject}
                    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
                  />
                  {(formik.touched.subject || formik.values.subject) &&
                  formik.errors.subject ? (
                    <p className="py-3 px-1.5s text-red-500 font-medium">
                      {formik.errors.subject}
                    </p>
                  ) : null}
                </div>
                {/* message */}
                <div>
                  <label className="font-semibold text-gray-700 text-lg px-1.5 py-5">
                    Message
                  </label>

                  <input
                    type="text"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    placeholder="Write your message..."
                    className=" w-full h-14 rounded-2xl border border-gray-200 bg-white px-5 text-gray-700 shadow-sm outline-none transition-all
      duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 "
                  />
                  {(formik.touched.message || formik.values.message) &&
                  formik.errors.message ? (
                    <p className="py-3 px-1.5s text-red-500 font-medium">
                      {formik.errors.message}
                    </p>
                  ) : null}
                </div>
                <div className="py-4">
                  <button
                    type="submit"
                    className="disabled:bg-main-300 bg-main-500 w-full mb-1.5 block py-3 px-2 rounded-4xl
                 text-white cursor-pointer  space-x-2.5 text-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse me-1"></i>
                    ) : (
                      <span>
                        {" "}
                        <span>
                          <i className="fa-solid fa-paper-plane"></i>
                        </span>
                        <span>Send Message</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* right */}
          <div>
            {/* header */}
            <div className="py-6">
              <h4 className="text-[#bb2d2d] text-lg font-semibold leading-5 ">
                Find Us
              </h4>
              <h2 className=" text-[20px] lg:text-[32px] leading-9.5 font-bold space-x-1 py-3">
                <span>Our</span>
                <span className="text-[#bb2d2d]">Information</span>
              </h2>
            </div>
            {/* data */}
            <div className="">
              {/* card */}
              {CONTACT_INFO
                ? CONTACT_INFO.map((item) => (
                    <div
                      className="bg-white rounded-3xl p-5 flex gap-4 items-center shadow w-full mb-3 group
                      hover:border  hover:border-main-500 hover:translate-x-3 transition-all duration-300"
                      key={item.title}
                    >
                      <div
                        className="size-15 text-xl bg-main-500 rounded-full flex justify-center
                       items-center text-white group group-hover:bg-white group-hover:border-2 cursor-pointer
                        group-hover:text-main-600 group-hover:border-dashed group-hover:border-main-600"
                      >
                        <i className={item.icon}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>

                        {item.details.map((detail) => (
                          <p className="text-gray-600" key={detail}>
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className="bg-[#484848] p-6 rounded-2xl text-center space-y-3 ">
              <div className="text-white text-2xl">
                <i className="fa-solid fa-map-location-dot"></i>
              </div>
              <h2 className="text-lg text-white leading-3.5 tracking-wide font-bold">
                837 W. Marshall Lane
              </h2>
              <span className="text-gray-200">Los Angeles, CA 90001</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
