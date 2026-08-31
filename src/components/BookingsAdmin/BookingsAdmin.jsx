import { useState } from "react";
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
import { LoaderSpinner } from "../Shared/LoaderSpinner/LoaderSpinner";
import { BookingDetailsModel } from "../BookingDetailsModel/BookingDetailsModel";
import { formatDate, InitialisName } from "../Shared/utils/utils";
import { Helmet } from "react-helmet";
import { useBookingsAdmin } from "./Hook/useBookingsAdmin";

export function BookingsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [activeStatus, setActiveStatus] = useState("All");

  const [selectedBookingId, setSelectedBookingId] = useState(null);

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
    setSelectedBookingId(null);
  }

  const {
    allBookings,
    isLoading,
    isError,
    bookingDetails,
    isBookingDetailsLoading,
    deleteBooking,
    isDeletePending,
    deletingBookingId,
    bookingConfirm,
    isConfirmPending,
    confirmingBookingId,
    bookingCancel,
    isCancelPending,
    cancellingBookingId,
  } = useBookingsAdmin(selectedBookingId);

  function handleViewBooking(bookingId) {
    setSelectedBookingId(bookingId);
    openModel();
  }

  function getBookingByStatus(statu) {
    setCurrentPage(1);
    setActiveStatus(statu);
  }

  const bookingsByStatus =
    activeStatus === "All"
      ? allBookings
      : allBookings.filter((booking) => booking.status === activeStatus);

  // search & pagination
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

  function handleDeleteBooking(bookingId) {
    deleteBooking(bookingId, {
      onSuccess: () => {
        if (selectedBookingId === bookingId) {
          closeModel();
        }
      },
    });
  }

  function handleConfirmBooking(bookingId) {
    bookingConfirm(bookingId, {
      onSuccess: () => closeModel(),
    });
  }

  function handleCancelBooking(bookingId) {
    bookingCancel(bookingId, {
      onSuccess: () => closeModel(),
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner></LoaderSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-bold text-gray-400">
          Something went wrong while loading bookings.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Bookings Admin</title>
      </Helmet>
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen flex flex-col bg-bgMain ">
        <div className="flex flex-col justify-center items-between  lg:flex-row lg:justify-between lg:items-center">
          {/* headers */}
          <div className="pt-2 pb-6">
            <h2 className="font-bold text-2xl text-main-500">Bookings</h2>
            <p className="text-gray-500 font-meduim">
              Showing {paginatedBookings.length} of {filteredBookings.length}
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
                          {InitialisName(booking.name)}
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

                    <TableCell className="py-3 text-gray-600 whitespace-nowrap">
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
                          onClick={() => handleViewBooking(booking._id)}
                        >
                          <i className="fa-regular fa-eye mr-2"></i>
                          View
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleDeleteBooking(booking._id)}
                          disabled={
                            isDeletePending && deletingBookingId === booking._id
                          }
                          className="text-red-600"
                        >
                          {isDeletePending &&
                          deletingBookingId === booking._id ? (
                            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          ) : (
                            <i className="fa-regular fa-trash-can mr-2"></i>
                          )}
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
      </section>
      {/* model */}
      {flag && bookingDetails ? (
        <BookingDetailsModel
          booking={bookingDetails}
          onClose={closeModel}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelBooking}
          isConfirmPending={
            isConfirmPending && confirmingBookingId === bookingDetails._id
          }
          isCancelPending={
            isCancelPending && cancellingBookingId === bookingDetails._id
          }
          statusStyles={STATUS_STYLES}
          flag={flag}
          formatDate={formatDate}
        ></BookingDetailsModel>
      ) : null}
    </>
  );
}
