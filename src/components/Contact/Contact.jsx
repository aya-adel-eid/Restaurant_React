import style from "./Contact.module.css";
import Header from "../Shared/header/Header";
import { useFormik } from "formik";
import * as YUP from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
// validation
const yup = YUP.object().shape({
  name: YUP.string().required("This field is required!"),
  email: YUP.string()
    .required("This field is required!")
    .email("invalid email"),
  subject: YUP.string().required("This field is required!"),
  message: YUP.string().required("This field is required!"),
});
export function Contact() {
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

  // form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: yup,
    onSubmit: handleContact,
  });

  // call api
  function contactUs(values) {
    return axios.post(
      `https://restaurant-project-node-js.vercel.app/api/contact`,
      values,
    );
  }
  const { mutate, isPending } = useMutation({
    mutationFn: contactUs,
    onSuccess: () => {
      toast.success("Message sent — we'll get back to you soon", {
        closeOnClick: true,
        autoClose: 3000,
      });
    },
    onError: () => {
      toast.error(" Something went wrong. Please try again.", {
        closeOnClick: true,
        autoClose: 3000,
      });
    },
  });
  function handleContact(val) {
    mutate(val);
  }

  return (
    <>
      <Helmet>
        <title>Contact page</title>
      </Helmet>
      <section className="bg-bgMain">
        <Header
          hightlight={"Get In Touch"}
          text={"Contact Us"}
          decripOne={
            " We would love to hear from you. Whether it is a reservation, "
          }
          decripTwo={" feedback, or just a hello — we are here."}
        ></Header>

        <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* left: form */}
          <div className="lg:col-span-7">
            {/* header */}
            <div className="pb-6 sm:pb-8">
              <h4 className="flex items-center gap-2 text-[#bb2d2d] text-sm sm:text-base font-semibold tracking-[0.2em] uppercase">
                <span className="w-6 h-px bg-[#bb2d2d]"></span>
                What We Provide
              </h4>
              <h2 className="font-serif text-[26px] sm:text-[32px] lg:text-[40px] leading-tight font-bold pt-3">
                We'd Love To{" "}
                <span className="text-[#bb2d2d]">Hear From You!</span>
              </h2>
            </div>

            {/* form card, styled like a reservation ticket */}
            <div className="relative bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden">
              <div className="h-2 bg-linear-to-r from-[#bb2d2d] to-[#e0674a]"></div>

              <form
                className="flex flex-col gap-5 p-5 sm:p-8 lg:p-10"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                {/* name & email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-[#bb2d2d] focus:ring-4 focus:ring-[#bb2d2d]/10"
                      />
                    </div>
                    {(formik.touched.name || formik.values.name) &&
                    formik.errors.name ? (
                      <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                        {formik.errors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Enter email address"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-[#bb2d2d] focus:ring-4 focus:ring-[#bb2d2d]/10"
                      />
                    </div>
                    {(formik.touched.email || formik.values.email) &&
                    formik.errors.email ? (
                      <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <i className="fa-regular fa-comment-dots absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="Write a subject"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.subject}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-[#bb2d2d] focus:ring-4 focus:ring-[#bb2d2d]/10"
                    />
                  </div>
                  {(formik.touched.subject || formik.values.subject) &&
                  formik.errors.subject ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.subject}
                    </p>
                  ) : null}
                </div>

                {/* message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    placeholder="Write your message..."
                    className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none resize-none transition-all duration-300 focus:border-[#bb2d2d] focus:ring-4 focus:ring-[#bb2d2d]/10"
                  />
                  {(formik.touched.message || formik.values.message) &&
                  formik.errors.message ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="disabled:bg-[#bb2d2d]/40 bg-[#bb2d2d] hover:bg-[#a12626] w-full py-3.5 rounded-full text-white cursor-pointer text-base sm:text-lg font-semibold flex items-center justify-center gap-2.5 transition-all duration-300"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* right: info */}
          <div className="lg:col-span-5">
            {/* header */}
            <div className="pb-6 sm:pb-8">
              <h4 className="flex items-center gap-2 text-[#bb2d2d] text-sm sm:text-base font-semibold tracking-[0.2em] uppercase">
                <span className="w-6 h-px bg-[#bb2d2d]"></span>
                Find Us
              </h4>
              <h2 className="font-serif text-[26px] sm:text-[32px] lg:text-[40px] leading-tight font-bold pt-3">
                Our <span className="text-[#bb2d2d]">Information</span>
              </h2>
            </div>

            {/* data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {CONTACT_INFO.map((item) => (
                <div
                  className="group bg-white rounded-2xl p-4 sm:p-5 flex gap-4 items-center shadow-sm border border-transparent hover:border-[#bb2d2d]/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  key={item.title}
                >
                  <div className="size-12 sm:size-14 shrink-0 text-lg sm:text-xl bg-[#bb2d2d]/10 text-[#bb2d2d] rounded-full flex justify-center items-center border-2 border-transparent transition-all duration-300 group-hover:bg-[#bb2d2d] group-hover:text-white">
                    <i className={item.icon}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold mb-1 text-sm sm:text-base">
                      {item.title}
                    </h3>
                    {item.details.map((detail) => (
                      <p
                        className="text-gray-500 text-xs sm:text-sm leading-snug"
                        key={detail}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* map */}
            <div className="mt-4 sm:mt-6 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <iframe
                title="Bistro Bliss location"
                src="https://maps.google.com/maps?q=837%20W.%20Marshall%20Lane%2C%20Los%20Angeles%2C%20CA%2090001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-48 sm:h-56 lg:h-64 border-0 grayscale-30"
                loading="lazy"
              ></iframe>
              <div className="bg-[#2b2b2b] px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-3">
                <i className="fa-solid fa-map-location-dot text-[#e0674a] text-lg sm:text-xl shrink-0"></i>
                <div>
                  <h3 className="text-sm sm:text-base text-white font-bold leading-tight">
                    837 W. Marshall Lane
                  </h3>
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Los Angeles, CA 90001
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
