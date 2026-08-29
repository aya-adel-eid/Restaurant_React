import { useEffect, useRef, useState } from "react";
import style from "./FormAddMeal.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import image from "../../../assets/pancake (2).png";
import { toast } from "react-toastify";

// validuation for form
const validtion = Yup.object().shape({
  productName: Yup.string().required("this filed is required "),

  productPrice: Yup.number().required("this filed is required "),
  productCategory: Yup.string().required("this filed is required "),
  productDescription: Yup.string().required("this filed is required "),
  image: Yup.string().required("this filed is required "),
});
export function FormAddMeal({ onClose, selectedMeal }) {
  const [isUploaded, setIsUpladed] = useState(selectedMeal?.imageUrl || null);
  const imageValue = useRef(null);
  const textInput = useRef(null);
  const token = localStorage.getItem("userToken");

  const formData = new FormData();
  // form
  const formMeal = useFormik({
    enableReinitialize: true,

    initialValues: {
      productName: selectedMeal?.productName || "",
      productPrice: selectedMeal?.productPrice || "",
      productCategory: selectedMeal?.productCategory?._id || "",
      productDescription: selectedMeal?.productDescription || "",
      image: selectedMeal?.imageUrl || "",
    },

    validationSchema: validtion,

    onSubmit: handleCreateNewMeal,
  });
  function handelImagePreview(e) {
    const path = URL.createObjectURL(e.target.files[0]);
    setIsUpladed(path);
  }
  function handleRemoveImage() {
    setIsUpladed(null);
    // imageValue.current.value = "";
    formMeal.setFieldValue("image", "");
  }
  const queryClient = useQueryClient();
  const { isPending: addNewItemIsPending, mutate: createNewItemMuatate } =
    useMutation({
      mutationFn: addNewMeal,
      onSuccess: (resp) => {
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });
        formMeal.resetForm();
        queryClient.invalidateQueries(["getAllMeals"]);
        onClose();
      },
      onError: (error) => {
        console.log(error.errorMessage);
        toast.error(error.errorMessage, {
          closeOnClick: true,
          autoClose: 3000,
          position: "top-right",
        });
      },
    });
  function handleSubmit() {
    if (selectedMeal) {
      editItemMuatate();
    } else createNewItemMuatate();
  }

  function handleCreateNewMeal(values) {
    formData.append("productName", values.productName);
    formData.append("productPrice", values.productPrice);
    formData.append("productCategory", values.productCategory);
    formData.append("productDescription", values.productDescription);
    formData.append("image", values.image);
    handleSubmit();
  }
  function addNewMeal() {
    return axios.post(
      `https://restaurant-project-node-js.vercel.app/api/menu`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  const { isPending: editItemIsPending, mutate: editItemMuatate } = useMutation(
    {
      mutationFn: editMeal,
      onSuccess: (resp) => {
        console.log(resp);

        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        });

        formMeal.resetForm();
        queryClient.invalidateQueries(["getAllMeals"]);
        onClose();
      },
      onError: (error) => {
        console.log(error.errorMessage);
        toast.error(error.errorMessage, {
          closeOnClick: true,
          autoClose: 3000,
          position: "top-right",
        });
      },
    },
  );
  function editMeal() {
    return axios.put(
      `https://restaurant-project-node-js.vercel.app/api/menu/${selectedMeal._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  const { data: allCategories } = useQuery({
    queryKey: ["AllCategories"],
    queryFn: getAllCategories,
  });
  function getAllCategories() {
    return axios.get(
      `https://restaurant-project-node-js.vercel.app/api/category`,
    );
  }

  useEffect(() => {}, []);
  return (
    <>
      <div className="w-full px-2 bg-black/50 flex justify-center items-center fixed inset-0 z-50">
        <div className="bg-white p-8 rounded-2xl  lg:w-2/4 w-full max-h-[90vh] overflow-y-auto">
          {/* header */}
          <div className="px-4 flex justify-between items-center">
            <h2 className="text-main-500 text-center text-2xl font-semibold">
              Create Menu Item
            </h2>
            <button className="cursor-pointer" onClick={onClose}>
              <i className="fa-solid fa-xmark text-xl text-gray-500"></i>
            </button>
          </div>
          {/* Form */}
          <div className="py-6">
            <form
              action=""
              className="flex flex-col gap-4"
              onSubmit={formMeal.handleSubmit}
            >
              <div className="flex flex-col justify-center">
                <label
                  htmlFor="image"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="border-2 border-dashed border-gray-400 bg-gray-200 size-14 flex justify-center items-center rounded-xs">
                    <i className="fa-solid fa-image text-gray-500"></i>
                  </div>
                  <span className="text-lg font-bold py-1 block">
                    Upload Image
                  </span>
                </label>
                <input
                  type="file"
                  id="image"
                  hidden
                  ref={textInput}
                  name="image"
                  onChange={(e) => {
                    formMeal.setFieldValue("image", e.currentTarget.files[0]);
                    handelImagePreview(e);
                  }}
                  onBlur={formMeal.handleBlur}
                />
                {formMeal.touched.image && formMeal.errors.image && (
                  <p className="text-red-500 text-sm px-1.5 pt-1">
                    {formMeal.errors.image}
                  </p>
                )}
                {isUploaded && (
                  <div className="flex justify-center ">
                    <div className="relative">
                      <img
                        src={isUploaded}
                        alt=""
                        className="size-40"
                        ref={imageValue}
                      />
                      <button
                        onClick={handleRemoveImage}
                        type="button"
                        className="absolute top-2 right-1 cursor-pointer"
                      >
                        <i className="fa-solid fa-xmark text-white"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="text-lg font-semibold text-main-500 px-1.5 py-1.5 block"
                >
                  <span className="font-bold">
                    <i className="fa-solid fa-utensils"></i>
                  </span>{" "}
                  ProductName
                </label>
                <input
                  name="productName"
                  value={formMeal.values.productName}
                  onChange={formMeal.handleChange}
                  onBlur={formMeal.handleBlur}
                  id="productName"
                  type="text"
                  placeholder="please enter product Name."
                  className="w-full border py-2 px-4 rounded-2xl border-gray-400 focus:border-main-600 outline-none"
                />
                {formMeal.touched.productName &&
                  formMeal.errors.productName && (
                    <p className="text-red-500 text-sm px-1.5 pt-1">
                      {formMeal.errors.productName}
                    </p>
                  )}
              </div>
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="text-lg font-semibold text-main-500 px-1.5 py-1.5 block"
                >
                  <span className="font-bold">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </span>
                  Price{" "}
                </label>
                <input
                  id="price"
                  type="number"
                  name="productPrice"
                  value={formMeal.values.productPrice}
                  onChange={formMeal.handleChange}
                  onBlur={formMeal.handleBlur}
                  placeholder="please enter price"
                  className="w-full border py-2 px-4 rounded-2xl border-gray-400 focus:border-main-600 outline-none"
                />
                {formMeal.touched.productPrice &&
                  formMeal.errors.productPrice && (
                    <p className="text-red-500 text-sm px-1.5 pt-1">
                      {formMeal.errors.productPrice}
                    </p>
                  )}
              </div>
              {/* category */}
              <div>
                <label
                  htmlFor="category"
                  className="text-lg font-semibold text-main-500 px-1.5 py-1.5 block"
                >
                  <span className="font-bold">
                    <i className="fa-solid fa-layer-group"></i>
                  </span>
                  Select Category{" "}
                </label>
                <select
                  name="productCategory"
                  value={formMeal.values.productCategory}
                  onChange={formMeal.handleChange}
                  onBlur={formMeal.handleBlur}
                  id="category"
                  className="w-full border py-2 px-4 rounded-2xl border-gray-400 focus:border-main-600 outline-none"
                >
                  <option value="">select Category...</option>
                  {allCategories?.data.data.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.displayName}
                    </option>
                  ))}
                </select>
                {formMeal.touched.productCategory &&
                  formMeal.errors.productCategory && (
                    <p className="text-red-500 text-sm px-1.5 pt-1">
                      {formMeal.errors.productCategory}
                    </p>
                  )}
              </div>
              {/* description */}
              <div>
                <label
                  htmlFor="description"
                  className="text-lg font-semibold text-main-500 px-1.5 py-1.5 block"
                >
                  <span className="font-bold">
                    <i className="fa-solid fa-align-left"></i>
                  </span>{" "}
                  Description
                </label>
                <textarea
                  name="productDescription"
                  value={formMeal.values.productDescription}
                  onChange={formMeal.handleChange}
                  onBlur={formMeal.handleBlur}
                  id="description"
                  rows={4}
                  placeholder="please enter a short description..."
                  className="w-full border py-2 px-4 rounded-2xl border-gray-400 focus:border-main-600 outline-none resize-none"
                />
                {formMeal.touched.productDescription &&
                  formMeal.errors.productDescription && (
                    <p className="text-red-500 text-sm px-1.5 pt-1">
                      {formMeal.errors.productDescription}
                    </p>
                  )}
              </div>
              {/* actions  */}
              <div className="pb-3">
                <button
                  disabled={addNewItemIsPending || editItemIsPending}
                  type="submit"
                  className=" px-5 py-2 bg-main-600 text-white rounded-2xl disabled:bg-gray-400 font-semibold w-full  cursor-pointer"
                >
                  {addNewItemIsPending || editItemIsPending ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : selectedMeal ? (
                    "Save Item"
                  ) : (
                    " Create Item"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
