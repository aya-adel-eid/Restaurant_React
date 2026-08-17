import { useEffect, useState } from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
export function Footer() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <footer className="bg-[#2b2b2b] text-white pt-16 pb-6 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/src/assets/Logo-footer.png"
                alt="Bistro Bliss"
                className="w-60 h-20"
              />
              {/* <h2 className="text-2xl font-bold">Bistro Bliss</h2> */}
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              In the new era of technology we look into the future with
              certainty and pride for our company and.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-main-600 hover:border-main-600 transition-all duration-300"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-main-600 hover:border-main-600 transition-all duration-300"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-400 hover:bg-main-600 hover:border-main-600 transition-all duration-300"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-6">Pages</h3>
            <ul className="space-y-3 text-gray-300 text-center">
              <li>
                <Link
                  to={"/"}
                  className="hover:text-main-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="hover:text-main-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/menu"}
                  className="hover:text-main-600 transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className="hover:text-main-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="hover:text-main-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to={"/bookTable"}
                  className="hover:text-main-600 transition-colors"
                >
                  Book a Table
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-main-600 transition-colors">
                  My Booking
                </a>
              </li>
            </ul>
          </div>

          {/* images */}
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Us On Instagram</h3>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/src/assets/pasta.png"
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
              <img
                src="/src/assets/potato.png"
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
              <img
                src="/src/assets/pancake.png"
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
              <img
                src="/src/assets/5ltbeta.png"
                alt=""
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-400">
          Copyright © 2023 Hashtag Developer. All Rights Reserved
        </div>
      </footer>
    </>
  );
}
