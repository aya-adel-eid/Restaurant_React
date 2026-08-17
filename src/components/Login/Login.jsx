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
      <div className="flex justify-center py-10 px-6 sm:px-1   bg-[#EEEEED] min-h-screen items-center">
        <div className="w-full lg:w-[50%] bg-white p-9 rounded-3xl">
          {/* headet */}
          <div className="flex flex-col justify-center items-center py-1.5">
            <img src={logo} alt="" className="py-2.5" />
            <h3 className="py-1 font-semibold  text-mainText lg:font-bold text-lg lg:text-3xl">
              Welcome Back
            </h3>
            <span className="text-gray-500">
              Sign in to your Bistro Bliss account
            </span>
          </div>
          <form className="py-3" onSubmit={formik.handleSubmit}>
            {/* email */}
            <div className="mb-4">
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
                <Alert color="failure" className="mt-1">
                  <span className="font-medium space-x-1.5">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>{formik.errors.email}</span>
                  </span>
                </Alert>
              ) : null}
            </div>
            {/* password */}
            <div className="mb-4">
              <div className="relative">
                <FloatingLabel
                  variant="outlined"
                  label="password"
                  type={showPassword ? "text" : "password"}
                  className="text-[15px]"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-3"
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
                <Alert color="failure" className="mt-1">
                  <span className="font-medium space-x-1.5">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>{formik.errors.password}</span>
                  </span>
                </Alert>
              ) : null}
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="disabled:bg-main-300 bg-main-500 w-full mb-1.5 block py-3 px-2 rounded-4xl text-white cursor-pointer "
                disabled={loadingSpinner}
              >
                {loadingSpinner ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse me-1"></i>
                ) : null}
                LogIn
              </button>
              {successMessage ? (
                <Alert color="success">
                  <span className="font-medium">{successMessage}</span>
                </Alert>
              ) : null}
              {errorMessage ? (
                <Alert color="failure">
                  <span className="font-medium">{errorMessage}</span>
                </Alert>
              ) : null}
            </div>
          </form>
          <div className="text-center">
            <p className="font-semibold">
              Don't have an account?{" "}
              <Link to={"/signUp"} className="text-main-500 font-bold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
