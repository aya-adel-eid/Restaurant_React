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
import logo from "../../assets/Logo2.png";
import { UserContext } from "../../assets/context/UserContext";

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

  const initials = (userName || "Guest")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
    <nav className="py-2 px-4 sm:px-8 lg:px-15 bg-white fixed z-20 top-0 right-0 left-0 ">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-2">
        {/* Brand */}
        <Link to="/" className="flex items-center order-1">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Link>

        {/* Right side: avatar dropdown (if logged in, md+ only) + hamburger */}
        <div className="flex items-center gap-2 order-2 md:order-3">
          {userToken && (
            <div className="hidden md:block">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center gap-2">
                    <ThemeProvider theme={customTheme}>
                      <Avatar
                        alt="User settings"
                        placeholderInitials={initials}
                        rounded
                      />
                    </ThemeProvider>
                    <span className="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
                      {userName}
                    </span>
                  </div>
                }
              >
                <DropdownHeader>
                  <div className="flex items-center gap-2">
                    <ThemeProvider theme={customTheme}>
                      <Avatar
                        alt="User settings"
                        placeholderInitials={initials}
                        rounded
                      />
                    </ThemeProvider>
                    <div>
                      <span className="block text-sm">{userName}</span>
                      <span className="block truncate text-sm font-medium">
                        {role}
                      </span>
                    </div>
                  </div>
                </DropdownHeader>
                <DropdownDivider />
                {role === "user" ? (
                  <>
                    <DropdownItem onClick={closeMenu}>
                      <Link to={"/bookTable"}>Book a table</Link>
                    </DropdownItem>
                    <DropdownItem onClick={closeMenu}>
                      <Link to={"/bookTable/myBookings"}>My Bookings</Link>
                    </DropdownItem>
                  </>
                ) : null}
                <DropdownDivider />
                <DropdownItem onClick={logOut}>Sign out</DropdownItem>
              </Dropdown>
            </div>
          )}

          {/* Login/Register – visible only on md+ (outside the collapsible bar) */}
          {!userToken && (
            <div className="hidden md:flex items-center space-x-2.5">
              <Link
                to={"/signIn"}
                className="border-2 border-[#474747] bg-transparent py-1.5 px-3 rounded-full hover:bg-[#474747] hover:text-white"
              >
                Login
              </Link>
              <Link
                to={"/signUp"}
                className="bg-[#AD343E] py-1.5 px-3 rounded-full border-[#AD343E] border-2 text-white hover:bg-white hover:text-[#AD343E]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger toggle – only visible below md */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
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
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block w-full text-center py-3 px-4 rounded-full transition-colors md:w-auto md:py-1 md:px-2 md:rounded-none ${
                      isActive
                        ? "bg-gray-200 text-[#AD343E] font-semibold md:bg-transparent"
                        : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-main-500"
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
                  className="block w-full text-center border-2 border-[#474747] bg-transparent py-3 px-3 rounded-full hover:bg-[#474747] hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to={"/signUp"}
                  onClick={closeMenu}
                  className="block w-full text-center bg-[#AD343E] py-3 px-3 rounded-full border-[#AD343E] border-2 text-white hover:bg-white hover:text-[#AD343E]"
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
                  className="w-12 h-12 rounded-full bg-[#AD343E] text-white flex items-center justify-center font-semibold text-lg"
                >
                  {initials}
                </button>

                {accountOpen && (
                  <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                      <div className="w-10 h-10 shrink-0 rounded-full bg-[#AD343E] text-white flex items-center justify-center font-semibold">
                        {initials}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500">Member</p>
                      </div>
                    </div>

                    <Link
                      to={"/bookTable"}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                        />
                      </svg>
                      Book a table
                    </Link>
                    <Link
                      to={"/myBookings"}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                      My bookings
                    </Link>
                    <button
                      onClick={logOut}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#AD343E] hover:bg-gray-50 w-full text-left"
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
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
