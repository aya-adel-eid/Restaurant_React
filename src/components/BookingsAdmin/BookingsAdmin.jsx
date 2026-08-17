import { useEffect, useState } from "react";
import style from "./BookingsAdmin.module.css";
import {
  TabItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tabs,
  Pagination,
} from "flowbite-react";
import { Dropdown, DropdownItem } from "flowbite-react";
import axios from "axios";
import { Circles, TailSpin } from "react-loader-spinner";
import { LoaderSpinner } from "../Shared/LoaderSpinner/LoaderSpinner";
import { BookingDetailsModel } from "../BookingDetailsModel/BookingDetailsModel";

export function BookingsAdmin() {
  const [allBookings, setAllBookings] = useState([]);
  const [bookingsByStatus, setBookingsByStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const colArr = [
    "#",
    "Name",
    "phone",
    "date",
    "time",
    "persons",
    "status",
    "actions",
  ];
  const statusArr = ["All", "pending", "confirmed", "cancelled"];
  const token = localStorage.getItem("userToken");
  const STATUS_STYLES = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };
  function openModel() {
    setFlag(true);
  }
  function closeModel() {
    setFlag(false);
  }

  function getAllBookings() {
    axios
      .get(`https://restaurant-project-node-js.vercel.app/api/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log(resp.data.data);
        setAllBookings(resp.data.data);
        setBookingsByStatus(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function getBookingDetails(bookingId) {
    axios
      .get(
        `https://restaurant-project-node-js.vercel.app/api/booking/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        console.log(resp.data.data);
        setBookingDetails(resp.data.data);
        openModel();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getBookingByStatus(statu) {
    const bookings = structuredClone(allBookings);
    setCurrentPage(1);
    if (statu === "All") {
      setBookingsByStatus(bookings);
      return;
    }
    const fillterByStatu = bookings.filter(
      (booking) => booking.status === statu,
    );
    setBookingsByStatus(fillterByStatu);
  }

  // search &pagination
  // search &pagination
  const filteredBookings = bookingsByStatus.filter((msg) => {
    const term = searchInput.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term)
    );
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredBookings.length / itemsPerPage),
  );
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  }

  function onPageChange(page) {
    setCurrentPage(page);
  }
  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function deleteBooking(booking) {
    console.log("delete", booking);
    axios
      .delete(
        `https://restaurant-project-node-js.vercel.app/api/booking/${booking._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        console.log();
        getAllBookings();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function bookingConfirm(bookingId) {
    axios
      .patch(
        `https://restaurant-project-node-js.vercel.app/api/booking/${bookingId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        console.log();
        setBookingDetails((prev) => ({
          ...prev,
          status: resp.data.data.status,
        }));
        getAllBookings();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function bookingCancel(bookingId) {
    axios
      .patch(
        `https://restaurant-project-node-js.vercel.app/api/booking/${bookingId}/cancel/admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((resp) => {
        console.log();
        setBookingDetails((prev) => ({
          ...prev,
          status: resp.data.data.status,
        }));
        getAllBookings();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllBookings();
  }, []);
  return (
    <>
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen flex flex-col">
        {allBookings.length > 0 ? (
          <>
            <div className="flex flex-col justify-center items-between  lg:flex-row lg:justify-between lg:items-center">
              {/* headers */}
              <div className="pt-2 pb-6">
                <h2 className="font-bold text-2xl text-main-500">Messages</h2>
                <p className="text-gray-500 font-meduim">
                  Showing {paginatedBookings.length} of{" "}
                  {filteredBookings.length}
                  {filteredBookings.length !== allBookings.length &&
                    ` (filtered from ${allBookings.length})`}
                </p>
              </div>
              {/* input Search */}
              <div className="sm:pb-4 py-0">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Search by name, email..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AD343E]/30 focus:border-[#AD343E]"
                />
              </div>
            </div>
            {/* status */}
            <div className="py-1">
              <div className="flex justify-center py-1.5 overflow-x-auto">
                <Tabs
                  aria-label="Pills"
                  variant="pills"
                  onActiveTabChange={(tabIndex) =>
                    getBookingByStatus(statusArr[tabIndex])
                  }
                  theme={{
                    tablist: {
                      base: "flex flex-nowrap sm:flex-wrap sm:justify-center gap-2",
                      tabitem: {
                        base: "shrink-0",
                        variant: {
                          pills: {
                            active: {
                              on: "bg-main-500 text-white px-4 sm:px-8 py-1 rounded-2xl whitespace-nowrap",
                              off: "bg-gray-100/50  rounded-2xl  px-4 sm:px-8 py-1  border border-gray-200 text-black whitespace-nowrap",
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {statusArr?.map((statu) => (
                    <TabItem
                      key={statu}
                      title={statu}
                      className="active:bg-main-600 "
                    />
                  ))}
                </Tabs>
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
                  {paginatedBookings.length > 0 ? (
                    paginatedBookings.map((booking, index) => (
                      <TableRow
                        key={booking._id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell className="py-3 text-gray-600">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>

                        <TableCell className="font-medium text-gray-900 dark:text-white py-3">
                          <div className="flex items-center gap-3">
                            <span className="size-8 flex justify-center items-center bg-main-500 text-white rounded-full font-bold text-xs shrink-0">
                              {initials(booking.name)}
                            </span>
                            <div>
                              <h3 className="text-sm font-medium leading-tight">
                                {booking.user.name}
                              </h3>
                              <span className="text-xs text-gray-400">
                                {booking.user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-3 text-gray-600">
                          {booking.phone}
                        </TableCell>

                        <TableCell className="py-3 text-gray-600">
                          {formatDate(booking.date)}
                        </TableCell>

                        <TableCell className="py-3 text-gray-600">
                          {booking.time}
                        </TableCell>

                        <TableCell className="py-3 text-gray-600">
                          {booking.persons}
                        </TableCell>

                        <TableCell className="py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              STATUS_STYLES[booking.status.toUpperCase()]
                            }`}
                          >
                            {booking.status.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell className="py-3 ">
                          <Dropdown
                            label=""
                            dismissOnClick={true}
                            renderTrigger={() => (
                              <button
                                aria-label="Actions"
                                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                              >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                              </button>
                            )}
                          >
                            <DropdownItem
                              onClick={() => getBookingDetails(booking._id)}
                            >
                              <i className="fa-regular fa-eye mr-2"></i>
                              View
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => deleteBooking(booking)}
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

            {/* Pagination */}
            {filteredBookings.length > itemsPerPage && (
              <div className="flex justify-center py-6">
                <Pagination
                  className=""
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  showIcons
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <LoaderSpinner></LoaderSpinner>
          </div>
        )}
      </section>
      {/* model */}
      {flag ? (
        <BookingDetailsModel
          booking={bookingDetails}
          onClose={closeModel}
          onConfirm={bookingConfirm}
          onCancel={bookingCancel}
          statusStyles={STATUS_STYLES}
          flag={flag}
          formatDate={formatDate}
        ></BookingDetailsModel>
      ) : null}
    </>
  );
}
