import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { About } from "./components/About/About";
import { Blog } from "./components/Blog/Blog";
import { Contact } from "./components/Contact/Contact";
import { Login } from "./components/Login/Login";
import { Logup } from "./components/Logup/Logup";
import { ProtectRoute } from "./components/Protect-route/Protect-route";
import { ProtectRoteLogged } from "./components/ProtectRoteLogged/ProtectRoteLogged";

import UserContextProvider from "./assets/context/UserContext";
import { Menu } from "./components/menu/menu";
import { CardDetails } from "./components/CardDetails/CardDetails";
import { BookingTable } from "./components/BookingTable/BookingTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MyBooking } from "./components/MyBooking/MyBooking";
import { AdminProtectRoute } from "./components/AdminProtectRoute/AdminProtectRoute";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { LayoutAdmin } from "./components/LayoutAdmin/LayoutAdmin";

import { ProtectRouteFromAdmin } from "./components/ProtectRouteFromAdmin/ProtectRouteFromAdmin";
import { Messages } from "./components/Messages/Messages";
import { BookingsAdmin } from "./components/BookingsAdmin/BookingsAdmin";
import { MenuAdmin } from "./components/MenuAdmin/MenuAdmin";

function App() {
  const routes = createBrowserRouter([
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
          <LayoutAdmin />
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
  // Create a client
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={routes}></RouterProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
