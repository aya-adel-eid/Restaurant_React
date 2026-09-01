import { useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import logo from "../../../../assets/images/Logo2.png";
import * as YUp from "yup";
import { Alert, FloatingLabel } from "flowbite-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../assets/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const yup = YUp.object().shape({
  email: YUp.string()
    .email("invalid email")
    .required("This field is required."),
  password: YUp.string().required("This field is required."),
});
export function Login() {
  let { setUserLogin, setUserName, setRole, setUserEmail } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function Login(userData) {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, userData);
  }
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: Login,
    mutationKey: ["Sign In"],
    onSuccess: (resp) => {
      setUserLogin(resp.data.data.token);
      setUserName(resp.data.data.user.name);
      setRole(resp.data.data.user.role);
      setUserEmail(resp.data.data.user.email);
      setMessage(resp.data.message);
      localStorage.setItem("userToken", resp.data.data.token);
      localStorage.setItem("userName", resp.data.data.user.name);
      localStorage.setItem("userEmail", resp.data.data.user.email);
      localStorage.setItem("role", resp.data.data.user.role);
      if (resp.data.data.user.role === "user") {
        navigate("/");
      } else if (resp.data.data.user.role === "admin") {
        navigate("/admin/DashBoard");
      }
    },
    onError: (apiResponse) => {
      setErrorMessage(apiResponse.response.data.cause);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup,
    onSubmit: handleLogIn,
  });

  function handleLogIn(values) {
    mutate(values);
  }

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center bg-[#EEEEED] px-4 py-10">
        <div className="w-full max-w-md">
          {/* header */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Bistro Bliss" className="w-24 mb-4" />
            <h3 className="font-bold text-mainText text-2xl text-center">
              Welcome Back
            </h3>
            <span className="text-gray-500 mt-1.5 text-center text-sm">
              Sign in to your Bistro Bliss account
            </span>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100">
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

              {/* forgot password  */}
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
                  className="disabled:bg-main-300 disabled:cursor-not-allowed bg-main-500 w-full py-3 px-2
                    rounded-full text-white font-semibold cursor-pointer
                    hover:bg-main-600 transition-colors duration-200"
                  disabled={isPending}
                >
                  {isPending ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse me-2"></i>
                  ) : null}
                  Log In
                </button>

                {isSuccess ? (
                  <Alert color="success" className="mt-3">
                    <span className="font-medium">{successMessage}</span>
                  </Alert>
                ) : null}
                {isError ? (
                  <Alert color="failure" className="mt-3">
                    <span className="font-medium">{errorMessage}</span>
                  </Alert>
                ) : null}
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="font-medium text-gray-600 text-sm">
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
    </>
  );
}
