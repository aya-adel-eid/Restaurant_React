import { useState } from "react";
import style from "./MenuAdmin.module.css";
import { LoaderSpinner } from "../Shared/LoaderSpinner/LoaderSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import axios from "axios";
import { FormAddMeal } from "./FormAddMeal/FormAddMeal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { formatDate } from "../Shared/utils/utils";

import { ManageCategories } from "../MangeCategories/ManageCategories";
export function MenuAdmin() {
  const token = localStorage.getItem("userToken");
  const [selectedItem, setSelectedItem] = useState(null);
  const [flag, setFlag] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const colArr = [
    "#",
    "Image",
    "Title",
    "date",
    "Price",
    "Category",
    "actions",
  ];
  const { data: allMeals, isLoading } = useQuery({
    queryKey: ["getAllMeals"],
    queryFn: getAllMeals,
  });
  function getAllMeals() {
    return axios.get(`https://restaurant-project-node-js.vercel.app/api/menu`);
  }

  const displayMeals =
    activeCategory === "all"
      ? (allMeals?.data.data ?? [])
      : (allMeals?.data.data ?? []).filter(
          (meal) => meal.productCategory?.name === activeCategory,
        );

  const query = useQueryClient();
  const {
    isPending: isDeletePending,
    variables: deletingId,
    mutate: deleteMealMutate,
  } = useMutation({
    mutationFn: deleteMeal,

    onSuccess: (resp) => {
      toast.success(resp.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      query.invalidateQueries({ queryKey: ["getAllMeals"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message ?? "Something went wrong.";
      console.log(message);
      toast.error(message, {
        closeOnClick: true,
        autoClose: 3000,
        position: "top-right",
      });
    },
  });

  function deleteMeal(id) {
    return axios.delete(
      `https://restaurant-project-node-js.vercel.app/api/menu/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  function editItem(item) {
    setSelectedItem(item);
    open();
  }
  function open() {
    setFlag(true);
  }
  function close() {
    setFlag(false);
    setSelectedItem(null);
  }

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center ">
          <LoaderSpinner></LoaderSpinner>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menu Admin</title>
      </Helmet>
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen flex flex-col bg-[#FBF7F2]">
        <div className="flex flex-col justify-center items-between  lg:flex-row lg:justify-between lg:items-center">
          {/* headers */}
          <div className="pt-2 pb-6 flex justify-between items-center w-full">
            <h2 className="font-bold text-2xl text-main-500">Menu</h2>
            <div>
              <button
                onClick={open}
                className="px-5 py-2 text-sm font-semibold bg-main-500 hover:bg-main-600 rounded-2xl text-white flex justify-center items-center gap-2 transition-colors duration-300"
              >
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <span>Create item</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pb-6 overflow-x-auto">
          <ManageCategories
            activeCategory={activeCategory}
            onActiveChange={setActiveCategory}
          />
        </div>

        {/* table card — keeps the table visually grounded against the
            page's warm background instead of floating directly on it */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto overflow-y-visible">
            <Table striped className="text-sm">
              <TableHead>
                <TableRow>
                  {colArr.map((col) => (
                    <TableHeadCell
                      key={col}
                      className="bg-gray-400 text-white text-xs font-medium py-3"
                    >
                      {col}
                    </TableHeadCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-gray-200">
                {displayMeals.length > 0 ? (
                  displayMeals.map((meal, index) => (
                    <TableRow
                      key={meal._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="py-3 text-gray-600">
                        {index + 1}
                      </TableCell>

                      <TableCell className="py-3 text-gray-600">
                        <img
                          src={meal.imageUrl}
                          alt={meal.productName}
                          className="size-10 rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="py-3 text-gray-600">
                        {meal.productName}
                      </TableCell>

                      <TableCell className="py-3 text-gray-600 whitespace-nowrap">
                        {formatDate(meal.createdAt)}
                      </TableCell>

                      <TableCell className="py-3 text-main-500 font-bold">
                        {meal.productPrice}$
                      </TableCell>

                      <TableCell className="py-3 text-gray-600">
                        {meal.productCategory.displayName}
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => editItem(meal)}
                            aria-label="View"
                            title="View"
                            className="size-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-main-500 transition-colors duration-200 cursor-pointer"
                          >
                            <i className="fa-regular fa-eye"></i>
                          </button>
                          <button
                            onClick={() => deleteMealMutate(meal._id)}
                            disabled={
                              isDeletePending && deletingId === meal._id
                            }
                            aria-label="Delete"
                            title="Delete"
                            className="size-8 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
                          >
                            {isDeletePending && deletingId === meal._id ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa-regular fa-trash-can"></i>
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={colArr.length}
                      className="py-10 text-center"
                    >
                      <p className="text-lg font-bold text-gray-400">
                        No meals found.
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
      {flag && (
        <FormAddMeal
          openFun={open}
          onClose={close}
          selectedMeal={selectedItem}
        ></FormAddMeal>
      )}
    </>
  );
}
