import { useContext, useState } from "react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Logo2.png";
import { UserContext } from "../../../assets/context/UserContext";
import { InitialisName } from "../../Shared/utils/utils";

export function NavBar() {
  const navigate = useNavigate();
  const { userToken, setUserLogin, userEmail, userName, role, setRole } =
    useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navLinks =
    role === "admin"
      ? [
          { to: "/admin/DashBoard", label: "Dashboard" },
          { to: "/admin/allMessages", label: "Messages" },
          { to: "/admin/Bookings", label: "Bookings" },
          { to: "/admin/MenuAdmin", label: "Menu" },
        ]
      : [
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/menu", label: "Menu" },
          { to: "/blog", label: "Blog" },
          { to: "/contact", label: "Contact" },
        ];
  function closeMenu() {
    setIsOpen(false);
    setAccountOpen(false);
  }

  function logOut() {
    localStorage.clear();
    setUserLogin(null);
    setRole(null);
    closeMenu();
    navigate("/signIn");
  }

  const customTheme = createTheme({
    avatar: {
      root: {
        initials: {
          base: "size-8 flex items-center justify-center overflow-hidden bg-main-500",
          text: "font-medium text-white",
        },
      },
    },
  });

  return (
    <nav className="py-2 px-4 sm:px-8 lg:px-15 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm fixed z-20 top-0 right-0 left-0">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
        {/* Brand */}
        <Link to="/" className="flex items-center order-1">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Bistro Bliss logo" />
        </Link>

        {/* Right side: avatar dropdown (if logged in, md+ only) + hamburger */}
        <div className="flex items-center gap-2 order-2 md:order-3 cusrsor-pointer">
          {userToken && (
            <div className="hidden md:block">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center gap-2 px-1 py-1 rounded-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                    <ThemeProvider theme={customTheme}>
                      <Avatar
                        alt="User settings"
                        placeholderInitials={InitialisName(userName)}
                        rounded
                      />
                    </ThemeProvider>
                    <span className="hidden sm:block text-sm font-medium text-gray-900">
                      {userName}
                    </span>
                    <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
                  </div>
                }
              >
                <DropdownHeader>
                  <div className="flex items-center gap-2">
                    <ThemeProvider theme={customTheme}>
                      <Avatar
                        alt="User settings"
                        placeholderInitials={InitialisName(userName)}
                        rounded
                      />
                    </ThemeProvider>
                    <div>
                      <span className="block text-sm font-semibold">
                        {userName}
                      </span>
                      <span className="block truncate text-xs text-gray-500 capitalize">
                        {role}
                      </span>
                    </div>
                  </div>
                </DropdownHeader>
                <DropdownDivider />
                {role === "user" ? (
                  <>
                    <DropdownItem onClick={closeMenu}>
                      <Link
                        to={"/bookTable"}
                        className="flex items-center gap-2 w-full"
                      >
                        <i className="fa-regular fa-calendar-plus w-4 text-gray-400"></i>
                        Book a table
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={closeMenu}>
                      <Link
                        to={"/bookTable/myBookings"}
                        className="flex items-center gap-2 w-full"
                      >
                        <i className="fa-regular fa-clipboard w-4 text-gray-400"></i>
                        My Bookings
                      </Link>
                    </DropdownItem>
                  </>
                ) : null}
                <DropdownDivider />
                <DropdownItem onClick={logOut} className="text-main-500">
                  <i className="fa-solid fa-arrow-right-from-bracket w-4 mr-2"></i>
                  Sign out
                </DropdownItem>
              </Dropdown>
            </div>
          )}

          {/* Login/Register – visible only on md+ (outside the collapsible bar) */}
          {!userToken && (
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                to={"/signIn"}
                className="border-2 border-[#474747] bg-transparent py-1.5 px-4 text-sm font-semibold rounded-full hover:bg-[#474747] hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to={"/signUp"}
                className="bg-main-500 py-1.5 px-4 text-sm font-semibold rounded-full border-2 border-main-500 text-white hover:bg-white hover:text-main-500 transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger toggle – only visible below md */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
            aria-controls="navbar-collapse"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Collapsible menu – wraps to its own row on mobile (order-3), stays inline on desktop (order-2) */}
        <div
          id="navbar-collapse"
          className={`${
            isOpen ? "block" : "hidden"
          } order-3 md:order-2 w-full md:flex md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-1 py-2 md:py-0">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `relative block w-full text-center py-3 px-4 rounded-full font-medium transition-colors duration-200 md:w-auto md:py-2 md:px-3.5 md:rounded-full ${
                      isActive
                        ? "bg-main-50 text-main-500 md:bg-main-500/10"
                        : "text-gray-700 hover:bg-gray-50 md:hover:bg-gray-50 hover:text-main-500"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Login/Register – visible only below md, inside the collapsible bar */}
            {!userToken && (
              <li className="md:hidden flex flex-col gap-3 pt-3">
                <Link
                  to={"/signIn"}
                  onClick={closeMenu}
                  className="block w-full text-center border-2 border-[#474747] bg-transparent py-3 px-3 rounded-full font-semibold hover:bg-[#474747] hover:text-white transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to={"/signUp"}
                  onClick={closeMenu}
                  className="block w-full text-center bg-main-500 py-3 px-3 rounded-full border-2 border-main-500 text-white font-semibold hover:bg-white hover:text-main-500 transition-colors duration-300"
                >
                  Register
                </Link>
              </li>
            )}

            {/* Account avatar + dropdown card – visible only below md, inside the collapsible bar */}
            {userToken && (
              <li className="md:hidden pt-4 flex flex-col items-center relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="w-12 h-12 rounded-full bg-main-500 text-white flex items-center justify-center font-semibold text-lg shadow-sm"
                >
                  {InitialisName(userName)}
                </button>

                {accountOpen && (
                  <div className="absolute top-full mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-30">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-main-500 text-white flex items-center justify-center font-semibold">
                        {InitialisName(userName)}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {role}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={"/bookTable"}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <i className="fa-regular fa-calendar-plus w-4 text-gray-400"></i>
                      Book a table
                    </Link>
                    <Link
                      to={"/myBookings"}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <i className="fa-regular fa-clipboard w-4 text-gray-400"></i>
                      My bookings
                    </Link>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-main-500 hover:bg-gray-50 w-full text-left transition-colors duration-150"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket w-4"></i>
                      Log out
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
