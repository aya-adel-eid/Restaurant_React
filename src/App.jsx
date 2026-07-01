
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { About } from "./components/About/About";
import { Blog } from "./components/Blog/Blog";
import { Contact } from "./components/Contact/Contact";
import { Login } from "./components/Login/Login";
import { Logup } from "./components/Logup/Logup";
import { ProtectRoute } from "./components/Protect-route/Protect-route";
import { ProtectRoteLogged } from './components/ProtectRoteLogged/ProtectRoteLogged';
import CounterContextProvider from './assets/context/UserContext';
import UserContextProvider from './assets/context/UserContext';
import { Menu } from './components/menu/menu';
import { CardDetails } from './components/CardDetails/CardDetails';
import { BookingTable } from './components/BookingTable/BookingTable';

function App() {
  const routes=createBrowserRouter([
    {
      path:'',element:<Layout/>,children:[
        {
          index:true,element:<ProtectRoute><Home/></ProtectRoute>
        },
        {
          path:'about',element:<ProtectRoute><About/></ProtectRoute>
        },{
          path:'menu',element:<ProtectRoute><Menu/></ProtectRoute>
        },
        {
          path:'blog',element:<ProtectRoute><Blog/> </ProtectRoute>
        },
        {
          path:'bookTable',element:<ProtectRoute><BookingTable></BookingTable></ProtectRoute>
        },
        {
          path:'mealDetails/:id/:category',element:<ProtectRoute><CardDetails></CardDetails> </ProtectRoute>
        },
        {
          path:'contact',element:<ProtectRoute> <Contact/></ProtectRoute>
          },
        {
          path:'signIn',element:<ProtectRoteLogged><Login/></ProtectRoteLogged>
        },
        {
          path:'signUp',element:<ProtectRoteLogged><Logup/></ProtectRoteLogged>
        }
      ]
      
    }
  ])

  return (
    <>
    <UserContextProvider>

   <RouterProvider router={routes}></RouterProvider>
    </UserContextProvider>
    </>
  )
}

export default App
