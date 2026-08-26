import { useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import logo from "../../assets/Logo2.png";
import * as YUp from "yup";
import { Alert, FloatingLabel } from "flowbite-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../assets/context/UserContext";

export function Login() {
  let { setUserLogin, setUserName, setRole, setUserEmail } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loadingSpinner, setLoading] = useState(false);

  function Login(userData) {
    setMessage("");
    setErrorMessage("");
    setLoading(true);
    axios
      .post(
        `https://restaurant-project-node-js.vercel.app/api/auth/login`,
        userData,
      )
      .then((resp) => {
        setLoading(false);
        setMessage(resp.data.message);
        setUserLogin(resp.data.data.token);
        setUserName(resp.data.data.user.name);
        setRole(resp.data.data.user.role);
        setUserEmail(resp.data.data.user.email);

        localStorage.setItem("userToken", resp.data.data.token);
        localStorage.setItem("userName", resp.data.data.user.name);
        localStorage.setItem("userEmail", resp.data.data.user.email);
        localStorage.setItem("role", resp.data.data.user.role);
        if (resp.data.data.user.role === "user") {
          navigate("/");
        } else if (resp.data.data.user.role === "admin") {
          navigate("/admin/DashBoard");
        }
      })
      .catch((apiResponse) => {
        setErrorMessage(apiResponse.response.data.cause);
        setLoading(false);
      });
  }

  const yup = YUp.object().shape({
    email: YUp.string()
      .email("invalid email")
      .required("This field is required."),
    password: YUp.string().required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup,
    onSubmit: Login,
  });

  useEffect(() => {}, []);

  return (
    <>
      <div className="min-h-screen flex bg-[#EEEEED]">
        {/* left branding panel - hidden on small screens */}
        <div
          className="hidden lg:flex lg:w-[45%] bg-main-500 relative overflow-hidden
          flex-col justify-center items-center px-12 text-white"
        >
          {/* decorative circles */}
          <div className="absolute -top-20 -left-20 size-72 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-24 -right-16 size-96 rounded-full bg-white/10"></div>
          <div className="absolute top-1/3 right-10 size-24 rounded-full bg-white/5"></div>

          <div className="relative z-10 text-center max-w-md">
            <img
              src={logo}
              alt="Bistro Bliss"
              className="mx-auto mb-8 brightness-0 invert w-40"
            />
            <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
              Welcome back to Bistro Bliss
            </h2>
            <p className="text-white/85 text-lg leading-relaxed">
              Sign in to book your table, track your orders, and enjoy a
              seamless dining experience crafted just for you.
            </p>
          </div>
        </div>

        {/* right form panel */}
        <div className="w-full lg:w-[55%] flex justify-center items-center px-5 sm:px-10 py-10">
          <div className="w-full max-w-md">
            {/* header - logo shown only on mobile since left panel is hidden */}
            <div className="flex flex-col items-center lg:items-start mb-8">
              <img src={logo} alt="" className="lg:hidden mb-4 w-28" />
              <h3 className="font-bold text-mainText text-2xl sm:text-3xl text-center lg:text-left">
                Welcome Back
              </h3>
              <span className="text-gray-500 mt-1.5 text-center lg:text-left">
                Sign in to your Bistro Bliss account
              </span>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200/70 border border-gray-100">
              <form className="space-y-5" onSubmit={formik.handleSubmit}>
                {/* email */}
                <div>
                  <FloatingLabel
                    variant="outlined"
                    label="Email Address"
                    type="email"
                    className="text-[15px]"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {(formik.touched.email || formik.values.email) &&
                  formik.errors.email ? (
                    <Alert color="failure" className="mt-2 py-2">
                      <span className="font-medium text-sm space-x-1.5">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{formik.errors.email}</span>
                      </span>
                    </Alert>
                  ) : null}
                </div>

                {/* password */}
                <div>
                  <div className="relative">
                    <FloatingLabel
                      variant="outlined"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      className="text-[15px]"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-400
                      hover:text-main-500 cursor-pointer transition-colors duration-200"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  {(formik.touched.password || formik.values.password) &&
                  formik.errors.password ? (
                    <Alert color="failure" className="mt-2 py-2">
                      <span className="font-medium text-sm space-x-1.5">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{formik.errors.password}</span>
                      </span>
                    </Alert>
                  ) : null}
                </div>

                {/* forgot password link */}
                <div className="flex justify-end -mt-1">
                  <Link
                    to={"/forgotPassword"}
                    className="text-sm text-main-500 font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="disabled:bg-main-300 disabled:cursor-not-allowed bg-main-500 w-full py-3.5 px-2
                    rounded-full text-white font-semibold cursor-pointer shadow-lg shadow-main-500/30
                    hover:bg-main-600 active:scale-[0.98] transition-all duration-200"
                    disabled={loadingSpinner}
                  >
                    {loadingSpinner ? (
                      <i className="fa-solid fa-spinner fa-spin-pulse me-2"></i>
                    ) : null}
                    Log In
                  </button>

                  {successMessage ? (
                    <Alert color="success" className="mt-3">
                      <span className="font-medium">{successMessage}</span>
                    </Alert>
                  ) : null}
                  {errorMessage ? (
                    <Alert color="failure" className="mt-3">
                      <span className="font-medium">{errorMessage}</span>
                    </Alert>
                  ) : null}
                </div>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="font-medium text-gray-600">
                Don't have an account?{" "}
                <Link
                  to={"/signUp"}
                  className="text-main-500 font-bold hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
