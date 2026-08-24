import { useEffect, useState } from "react";
import style from "./MenuAdmin.module.css";
import { LoaderSpinner } from "../Shared/LoaderSpinner/LoaderSpinner";
import {
  Dropdown,
  DropdownItem,
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
export function MenuAdmin() {
  const token = localStorage.getItem("userToken");
  const [selectedItem, setSelectedItem] = useState(null);
  const [flag, setFlag] = useState(false);
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
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
  const query = useQueryClient();
  const {
    data,
    isError,
    isPending,
    mutate: deleteMealMuatate,
  } = useMutation({
    mutationFn: deleteMeal,

    onSuccess: () => query.invalidateQueries(["getAllMeals"]),
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
    console.log(item);
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

  useEffect(() => {}, []);
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
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen flex flex-col">
        <div className="flex flex-col justify-center items-between  lg:flex-row lg:justify-between lg:items-center">
          {/* headers */}
          <div className="pt-2 pb-6 flex justify-between items-center w-full">
            <h2 className="font-bold text-2xl text-main-500">Menu</h2>
            <div>
              <button
                onClick={open}
                className="px-5 py-2 text-sm font-semibold bg-main-500 rounded-2xl text-white flex justify-center items-center"
              >
                <span>
                  <i className="fa-solid fa-plus"></i>
                </span>
                <span> Create item</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
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
            <TableBody className="divide-y divide-gray-200 border border-gray-200 rounded-b-4xl">
              {allMeals?.data.data.length > 0 ? (
                allMeals.data.data.map((meal, index) => (
                  <TableRow
                    key={meal._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="py-3 text-gray-600">
                      {/* {(currentPage - 1) * itemsPerPage + index + 1} */}
                      {index + 1}
                    </TableCell>

                    <TableCell className="py-3 text-gray-600">
                      <img
                        src={meal.imageUrl}
                        alt={meal.productName}
                        className="size-10"
                      />
                    </TableCell>
                    <TableCell className="py-3 text-gray-600">
                      {meal.productName}
                    </TableCell>

                    <TableCell className="py-3 text-gray-600">
                      {formatDate(meal.createdAt)}
                    </TableCell>

                    <TableCell className="py-3 text-main-500 font-bold">
                      {meal.productPrice}$
                    </TableCell>

                    <TableCell className="py-3 text-gray-600">
                      {meal.productCategory.displayName}
                    </TableCell>

                    <TableCell className="py-3  ">
                      <Dropdown
                        label=""
                        dismissOnClick={true}
                        renderTrigger={() => (
                          <button
                            aria-label="Actions"
                            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
                          >
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                        )}
                      >
                        <DropdownItem onClick={() => editItem(meal)}>
                          <i className="fa-regular fa-eye mr-2"></i>
                          View
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => deleteMealMuatate(meal._id)}
                          className="text-red-600"
                        >
                          <i className="fa-regular fa-trash-can mr-2"></i>
                          Delete
                        </DropdownItem>
                      </Dropdown>
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
                      No bookings found.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
