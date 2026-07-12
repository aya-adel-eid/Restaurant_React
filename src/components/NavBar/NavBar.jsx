import { useContext, useEffect } from "react";
import style from "./NavBar.module.css";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
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
  let navigate = useNavigate();
  let { userToken, setUserLogin } = useContext(UserContext);
  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/signIn");
  }
  const userName = "Bonnie Green";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const customTheme = createTheme({
    avatar: {
      root: {
        initials: {
          base: "relative inline-flex items-center justify-center overflow-hidden bg-main-500",
          text: "font-medium text-white",
        },
      },
    },
  });
  useEffect(() => {}, []);
  return (
    <>
      <Navbar
        rounded
        className="py-2  px-6 sm:px-6 bg-white fixed z-20 top-0 right-0 left-0"
      >
        <NavbarBrand href="https://flowbite-react.com">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </NavbarBrand>

        {userToken ? (
          <>
            <div className="flex md:order-2">
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
                      Bonnie Green
                    </span>
                  </div>
                }
              >
                {/*  */}

                <DropdownHeader>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </DropdownHeader>
                <DropdownItem>
                  <Link to={"/bookTable"}> Book a table</Link>{" "}
                </DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={() => logOut()}>Sign out</DropdownItem>
              </Dropdown>
              <NavbarToggle />
            </div>
            <NavbarCollapse>
              <NavLink to={"/"} className="py-1 px-2 hover:text-main-500">
                Home
              </NavLink>
              <NavLink to={"/about"} className="py-1 px-2 hover:text-main-500">
                About
              </NavLink>
              <NavLink to={"/menu"} className="py-1 px-2 hover:text-main-500">
                Menu
              </NavLink>
              <NavLink to={"/blog"} className="py-1 px-2 hover:text-main-500">
                Blog
              </NavLink>
              <NavLink
                to={"/contact"}
                className="py-1 px-2 hover:text-main-500"
              >
                Contact
              </NavLink>
            </NavbarCollapse>
          </>
        ) : (
          <div className="flex md:order-2 justify-between items-center space-x-2.5">
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
            <NavbarToggle />
          </div>
        )}
      </Navbar>
    </>
  );
}
