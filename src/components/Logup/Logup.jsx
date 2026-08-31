import { useEffect, useRef, useState } from "react";
import style from "./Logup.module.css";
import { Alert, FloatingLabel } from "flowbite-react";

import logo from "../../assets/Logo2.png";
import { useFormik } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
// handle error
const yup = Yup.object().shape({
  name: Yup.string()
    .required("This field is required.")
    .min(3, "Minimum 3 characters.")
    .max(28),
  email: Yup.string()
    .email("invalid email")
    .required("This field is required."),
  password: Yup.string()
    .required("This field is required.")
    .matches(/^[a-zA-Z0-9_-]{8,}$/, "8+ characters, mixed case & numbers."),
  phoneNumber: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
    .required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
export function Logup() {
  const timeRef = useRef(null);
  const [showpassword, setShowPassword] = useState(false);
  const [showConfirmPasssword, setConfirmPassword] = useState(false);
  const [errorMessage, setError] = useState("");
  const [successMessage, setMessage] = useState("");

  const navigate = useNavigate();

  function registerForm(values) {
    setMessage("");
    setError("");
    const { confirmPassword, ...dataToSend } = values;

    return axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      dataToSend,
    );
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    validationSchema: yup,
    onSubmit: handleregister,
  });
  const { isPending, isSuccess, isError, mutate } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: registerForm,
    onSuccess: (resp) => {
      timeRef.current = setTimeout(() => {
        navigate("/signIn");
      }, 2000);
      setMessage(resp.data.message);
    },
    onError: (error) => {
      setError(error.response?.data?.cause ?? "Something went wrong.");
    },
  });
  function handleregister(values) {
    mutate(values);
  }
  useEffect(() => {
    return () => clearTimeout(timeRef.current);
  }, []);
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="min-h-screen flex justify-center items-center py-10 px-4 sm:px-6 bg-[#EEEEED]">
        <div className="w-full max-w-2xl">
          {/* header */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Bistro Bliss" className="w-24 mb-4" />
            <h3 className="font-bold text-mainText text-2xl text-center">
              Create Account
            </h3>
            <span className="text-gray-500 mt-1.5 text-center text-sm">
              Join the Bistro Bliss family today
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-6 sm:px-10 py-8 sm:py-10">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              {/* name + phone side by side on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FloatingLabel
                    variant="outlined"
                    label="Full Name"
                    type="text"
                    className="text-[15px]"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {(formik.touched.name || formik.values.name) &&
                  formik.errors.name ? (
                    <Alert color="failure" className="mt-2 py-2">
                      <span className="font-medium text-sm space-x-1.5">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{formik.errors.name}</span>
                      </span>
                    </Alert>
                  ) : null}
                </div>

                <div>
                  <FloatingLabel
                    variant="outlined"
                    label="Phone"
                    type="tel"
                    className="text-[15px]"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {(formik.touched.phoneNumber || formik.values.phoneNumber) &&
                  formik.errors.phoneNumber ? (
                    <Alert color="failure" className="mt-2 py-2">
                      <span className="font-medium text-sm space-x-1.5">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{formik.errors.phoneNumber}</span>
                      </span>
                    </Alert>
                  ) : null}
                </div>
              </div>

              {/* email full width */}
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

              {/* password + confirm side by side on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <FloatingLabel
                      variant="outlined"
                      label="Password"
                      type={showpassword ? "text" : "password"}
                      className="text-[15px]"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400
                        hover:text-main-500 cursor-pointer transition-colors duration-200"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showpassword ? (
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

                <div>
                  <div className="relative">
                    <FloatingLabel
                      variant="outlined"
                      label="Confirm Password"
                      type={showConfirmPasssword ? "text" : "password"}
                      className="text-[15px]"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className="absolute top-1/2 right-3.5 -translate-y-1/2 text-gray-400
                        hover:text-main-500 cursor-pointer transition-colors duration-200"
                      onClick={() => setConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPasssword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </span>
                  </div>
                  {(formik.touched.confirmPassword ||
                    formik.values.confirmPassword) &&
                  formik.errors.confirmPassword ? (
                    <Alert color="failure" className="mt-2 py-2">
                      <span className="font-medium text-sm space-x-1.5">
                        <i className="fa-solid fa-circle-info"></i>
                        <span>{formik.errors.confirmPassword}</span>
                      </span>
                    </Alert>
                  ) : null}
                </div>
              </div>

              <div className="pt-2">
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
                  Create Account
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
              Already have an account?{" "}
              <Link
                to={"/signIn"}
                className="text-main-500 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
