import style from "./BookingTable.module.css";
import Header from "../../../components/Shared/header/Header";
import { useFormik } from "formik";
import * as YUp from "yup";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useMyBookings } from "../Hook/useMyBookings";
const yup = YUp.object().shape({
  name: YUp.string().required().min(3, "Minimum 3 characters."),
  date: YUp.date()
    .required("Date is required")
    .min(new Date(new Date().toDateString()), "Date cannot be before today"),
  time: YUp.string().required("Time is required"),
  phone: YUp.string().required("Phone is required"),
  persons: YUp.string().required("number of persons "),
});
export function BookingTable() {
  const { bookingTable, isBookingPending } = useMyBookings();
  // form
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      date: "",
      persons: "",
      time: "",
    },
    validationSchema: yup,
    onSubmit: handleBooking,
  });

  //

  function handleBooking(values) {
    bookingTable(values, {
      onSuccess: () => {
        toast.success("Your table is reserved! We'll see you soon.", {
          closeOnClick: true,
          autoClose: 3000,
        });
        formik.resetForm();
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.", {
          closeOnClick: true,
          autoClose: 3000,
        });
      },
    });
  }

  return (
    <>
      <Helmet>
        <title>Booking Table</title>
      </Helmet>
      <section id="Booktable" className="bg-[#FBF7F2]">
        {/* header */}
        <Header
          hightlight={"Reserve your seat"}
          text={"Book A Table"}
          decripOne={`Reserve your table in just a 
              few clicks and enjoy a memorable dining experience`}
          decripTwo={
            " with fresh flavors, exceptional service, and a warm atmosphere."
          }
        ></Header>

        <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl mx-auto relative bg-white shadow-xl shadow-black/5 rounded-3xl sm:rounded-4xl overflow-hidden">
            <div className="h-2 bg-linear-to-r from-main-500 to-main-600"></div>

            <form
              className="w-full p-5 sm:p-8 lg:p-12"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className="flex items-center gap-2 pb-6 sm:pb-8">
                <span className="size-10 shrink-0 rounded-full bg-main-500/10 text-main-500 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-utensils"></i>
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg leading-tight">
                    Reservation Details
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Fill in your details to hold your table
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* date */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <i className="fa-regular fa-calendar absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="booking-date"
                      type="date"
                      name="date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100"
                    />
                  </div>
                  {(formik.touched.date || formik.values.date) &&
                  formik.errors.date ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.date}
                    </p>
                  ) : null}
                </div>
                {/* time */}
                <div>
                  <label
                    htmlFor="booking-time"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <i className="fa-regular fa-clock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="booking-time"
                      type="time"
                      name="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100"
                    />
                  </div>
                  {(formik.touched.time || formik.values.time) &&
                  formik.errors.time ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.time}
                    </p>
                  ) : null}
                </div>
                {/* name */}
                <div>
                  <label
                    htmlFor="booking-name"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="booking-name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100"
                    />
                  </div>
                  {(formik.touched.name || formik.values.name) &&
                  formik.errors.name ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                {/* phone */}
                <div>
                  <label
                    htmlFor="booking-phone"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="Enter your number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100"
                    />
                  </div>
                  {(formik.touched.phone || formik.values.phone) &&
                  formik.errors.phone ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div>

                {/* persons */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="booking-persons"
                    className="font-semibold text-gray-700 text-sm sm:text-base block mb-2"
                  >
                    Number of Guests
                  </label>
                  <div className="relative">
                    <i className="fa-solid fa-champagne-glasses absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <select
                      id="booking-persons"
                      name="persons"
                      value={formik.values.persons}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-13 sm:h-14 rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm sm:text-base text-gray-700 shadow-sm outline-none transition-all duration-300 focus:border-main-500 focus:ring-4 focus:ring-main-100 appearance-none"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                    <i className="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
                  </div>
                  {(formik.touched.persons || formik.values.persons) &&
                  formik.errors.persons ? (
                    <p className="mt-1.5 px-1 text-red-500 font-medium text-xs sm:text-sm">
                      {formik.errors.persons}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isBookingPending}
                  className="py-3.5 cursor-pointer px-6 w-full text-center
           bg-main-500 text-base sm:text-lg tracking-wide font-bold text-white rounded-full
           hover:bg-main-600 disabled:bg-main-300 flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {isBookingPending ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      <i className="fa-solid fa-check"></i>
                      <span>Confirm Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
