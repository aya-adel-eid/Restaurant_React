import { useContext, useEffect, useState } from "react";
import style from "./Footer.module.css";
import pasta from "../../assets/pasta.png";
import potato from "../../assets/potato.png";
import pancake from "../../assets/pancake.png";
import ltbeta from "../../assets/5ltbeta.png";
import LogoFooter from "../../assets/Logo-footer.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../assets/context/UserContext";

export function Footer() {
  const { role } = useContext(UserContext);

  const PAGES =
    role === "admin"
      ? [
          { to: "/admin/DashBoard", label: "Dashboard" },
          { to: "/admin/allMessages", label: "Messages" },
          { to: "/admin/Bookings", label: "Bookings" },
          { to: "/admin/MenuAdmin", label: "Menu" },
        ]
      : [
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Menu", to: "/menu" },
          { label: "Blog", to: "/" },
          { label: "Contact", to: "/contact" },
          { label: "Book a Table", to: "/bookTable" },
          { label: "My Booking", to: "#" },
        ];

  const CONTACT_INFO = [
    { icon: "fa-solid fa-phone", text: "(414) 857 – 0107" },
    { icon: "fa-solid fa-envelope", text: "happytummy@restaurant.com" },
    {
      icon: "fa-solid fa-location-dot",
      text: "837 W. Marshall Lane, Los Angeles",
    },
  ];

  const INSTAGRAM_IMAGES = [pasta, potato, pancake, ltbeta];

  return (
    <>
      <footer className="bg-[#1f1f1f] text-white pt-10 sm:pt-16 pb-6 px-5 sm:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-10">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={LogoFooter}
              alt="Bistro Bliss"
              className="w-36 sm:w-56 h-auto mb-3 sm:mb-4 -ml-1.5 sm:-ml-2"
            />
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-sm text-xs sm:text-[15px] leading-relaxed">
              In the new era of technology we look into the future with
              certainty and pride for our company and.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              <a
                href="#"
                aria-label="X (Twitter)"
                className="size-8 sm:size-10 flex items-center justify-center rounded-full border border-gray-600
                text-gray-300 text-sm sm:text-base hover:bg-main-500 hover:border-main-500 hover:text-white
                hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="size-8 sm:size-10 flex items-center justify-center rounded-full border border-gray-600
                text-gray-300 text-sm sm:text-base hover:bg-main-500 hover:border-main-500 hover:text-white
                hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="size-8 sm:size-10 flex items-center justify-center rounded-full border border-gray-600
                text-gray-300 text-sm sm:text-base hover:bg-main-500 hover:border-main-500 hover:text-white
                hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Pages - split into two columns */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-5 relative inline-block pb-1.5 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-main-500">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-y-3 text-gray-400 text-xs sm:text-[15px]">
              {PAGES.map((page) => (
                <li key={page.label}>
                  {page.to === "#" ? (
                    <a
                      href="#"
                      className="hover:text-main-500 hover:pl-1.5 transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2"
                    >
                      <i className="fa-solid fa-angle-right text-[10px] sm:text-xs text-main-500"></i>
                      {page.label}
                    </a>
                  ) : (
                    <Link
                      to={page.to}
                      className="hover:text-main-500 hover:pl-1.5 transition-all duration-300 inline-flex items-center gap-1.5 sm:gap-2"
                    >
                      <i className="fa-solid fa-angle-right text-[10px] sm:text-xs text-main-500"></i>
                      {page.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-5 relative inline-block pb-1.5 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-main-500">
              Get In Touch
            </h3>
            <ul className="space-y-2.5 sm:space-y-4 text-gray-400 text-xs sm:text-[15px]">
              {CONTACT_INFO.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                  <span className="size-6 sm:size-8 shrink-0 flex items-center justify-center rounded-full bg-white/5 text-main-500 text-xs sm:text-sm">
                    <i className={item.icon}></i>
                  </span>
                  <span className="pt-0.5 sm:pt-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram images */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-5 relative inline-block pb-1.5 sm:pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-main-500">
              Follow Us
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5 sm:gap-2.5">
              {INSTAGRAM_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-md sm:rounded-lg cursor-pointer"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-14 sm:h-28 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-main-500/0 group-hover:bg-main-500/60
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <i className="fa-brands fa-instagram text-white text-sm sm:text-lg"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 text-center text-gray-500 text-[11px] sm:text-sm">
          <span>Copyright © 2023 Hashtag Developer. All Rights Reserved</span>
          <div className="flex gap-3 sm:gap-4">
            <a href="#" className="hover:text-main-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-main-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
