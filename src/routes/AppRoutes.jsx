import { createBrowserRouter } from "react-router-dom";
import { ProtectRouteFromAdmin } from "./guards/ProtectRouteFromAdmin/ProtectRouteFromAdmin";
import { Layout } from "../layouts/Layout/Layout";
import Home from "../features/Home/Home";
import { About } from "../features/about/pages/About/About";
import { Menu } from "../features/meals/pages/menu/Menu";
import { MenuAdmin } from "../features/meals/pages/MenuAdmin/MenuAdmin";
import { Messages } from "../features/Messages/Messages";
import { Dashboard } from "../features/Dashboard/Dashboard";
import { Blog } from "../features/Blog/pages/BlogPage/Blog";
import { Contact } from "../features/Contact/Contact";
import { CardDetails } from "../features/meals/components/CardDetails/CardDetails";
import { Login } from "../features/auth/pages/Login/Login";
import { Logup } from "../features/auth/pages/Logup/Logup";
import { ProtectRoteLogged } from "./guards/ProtectRoteLogged/ProtectRoteLogged";
import { ProtectRoute } from "./guards/Protect-route/Protect-route";
import { AdminProtectRoute } from "./guards/AdminProtectRoute/AdminProtectRoute";
import { BookingTable } from "../features/bookings/BookingTable/BookingTable";
import { MyBooking } from "../features/bookings/MyBooking/MyBooking";
import { BookingsAdmin } from "../features/bookings/BookingsAdmin/BookingsAdmin";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <ProtectRouteFromAdmin></ProtectRouteFromAdmin>,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "menu",
            element: <Menu />,
          },
          {
            path: "blog",
            element: <Blog />,
          },
          {
            path: "mealDetails/:id/:category",
            element: <CardDetails></CardDetails>,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "signIn",
            element: (
              <ProtectRoteLogged>
                <Login />
              </ProtectRoteLogged>
            ),
          },
          {
            path: "signUp",
            element: (
              <ProtectRoteLogged>
                <Logup />
              </ProtectRoteLogged>
            ),
          },
          {
            path: "bookTable",
            element: (
              <ProtectRoute>
                {" "}
                <BookingTable />
              </ProtectRoute>
            ),
          },
          {
            path: "bookTable/myBookings",
            element: (
              <ProtectRoute>
                {" "}
                <MyBooking />
              </ProtectRoute>
            ),
          },
        ],
      },
    ],
  },

  // admin
  {
    path: "admin",
    element: (
      <AdminProtectRoute>
        <Layout />
      </AdminProtectRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "DashBoard",
        element: <Dashboard />,
      },
      {
        path: "allMessages",
        element: <Messages />,
      },
      {
        path: "Bookings",
        element: <BookingsAdmin />,
      },
      {
        path: "MenuAdmin",
        element: <MenuAdmin />,
      },
    ],
  },
]);
