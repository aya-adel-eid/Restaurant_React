import "./App.css";
import { RouterProvider } from "react-router-dom";

import { ScrollToTop } from "./components/Scrolltotop/Scrolltotop";
import { Bounce, ToastContainer } from "react-toastify";
import { routes } from "./routes/AppRoutes";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <>
      <AppProviders>
        <ScrollToTop router={routes}>
          <RouterProvider router={routes}></RouterProvider>
        </ScrollToTop>
      </AppProviders>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
