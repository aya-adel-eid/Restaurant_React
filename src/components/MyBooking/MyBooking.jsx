import { useState } from "react";
import style from "./MyBooking.module.css";
import Header from "../Shared/header/Header";
import { Alert, TabItem, Tabs } from "flowbite-react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function MyBooking() {
  const STATUS_STYLES = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const Status = ["All", "pending", "confirmed", "cancelled"];
  const token = localStorage.getItem("userToken");
  const [currentStatus, setCurrentStatus] = useState("All");
  const queryClient = useQueryClient();

  const { data: myBookings, isLoading } = useQuery({
    queryKey: ["getAllBookingsUser"],
    queryFn: getAllBookings,
  });

  function getAllBookings() {
    return axios
      .get(`https://restaurant-project-node-js.vercel.app/api/booking/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => resp.data.data);
  }

  const displayMyBookings =
    currentStatus === "All"
      ? (myBookings ?? [])
      : (myBookings ?? []).filter(
          (booking) => booking.status === currentStatus,
        );

  const {
    mutate: cancelBooking,
    isPending: isCancelPending,
    variables: cancellingId,
  } = useMutation({
    mutationFn: (id) =>
      axios.patch(
        `https://restaurant-project-node-js.vercel.app/api/booking/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllBookingsUser"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleCancelBooking(id) {
    cancelBooking(id);
  }

  function formatDate(isoString) {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getMyBookingByStatu(statu = "All") {
    setCurrentStatus(statu);
  }

  function canCancel(booking) {
    const bookingDateTime = new Date(booking.date);
    const [hours, minutes] = booking.time.split(":").map(Number);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const diffInHours = (bookingDateTime - now) / (1000 * 60 * 60);

    return diffInHours >= 24;
  }

  return (
    <>
      <section className="flex flex-col min-h-screen">
        {!isLoading && myBookings ? (
          <div>
            <Header
              hightlight={"Your history"}
              text={"My Bookings "}
              decripOne={
                "View and manage all your table reservations in one place. "
              }
            ></Header>
            <div className="px-4 sm:px-8 lg:px-15 py-8">
              {/* alert */}
              <Alert
                color="warning"
                rounded
                className="border border-[#FFCD55] bg-[#FFFAEA] border-s-6 border-s-[#FFCD55]"
              >
                <div className="flex gap-3 items-center">
                  <span className="size-8 text-white font-bold flex justify-center items-center bg-[#FFB400] rounded-sm shadow">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </span>
                  <div>
                    {" "}
                    <span className="font-bold text-[xs] text-[#B48D40]">
                      Cancellation Policy
                    </span>
                    <p className="text-xs py-1">
                      Reservations can only be cancelled up to{" "}
                      <strong className="text-[#B48D40]">24 hours</strong>{" "}
                      before the scheduled time.
                    </p>
                  </div>
                </div>
              </Alert>

              <div className="flex justify-center py-6 overflow-x-auto ">
                <Tabs
                  aria-label="Pills"
                  variant="pills"
                  onActiveTabChange={(tabIndex) =>
                    getMyBookingByStatu(Status[tabIndex])
                  }
                  theme={{
                    tablist: {
                      base: "flex flex-nowrap sm:flex-wrap sm:justify-center gap-2",
                      tabitem: {
                        base: "shrink-0",
                        variant: {
                          pills: {
                            active: {
                              on: "bg-main-500 text-white px-4 sm:px-8 py-2 rounded-full whitespace-nowrap",
                              off: "bg-gray-100/50  rounded-full  px-4 sm:px-8 py-2  border border-gray-200 text-black whitespace-nowrap",
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {Status?.map((statue) => (
                    <TabItem
                      key={statue}
                      title={statue}
                      className="active:bg-main-600"
                    />
                  ))}
                </Tabs>
              </div>

              {/* Booking Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayMyBookings?.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
                  >
                    {/* Card Header */}
                    <div className="bg-gray-50 px-5 py-4 flex justify-between items-center border-b border-gray-200">
                      <span className="text-gray-400 font-semibold text-sm">
                        #{booking._id.slice(-6)}
                      </span>
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-bold ${
                          STATUS_STYLES[booking.status.toUpperCase()]
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="flex items-center gap-3 text-gray-700">
                        <i className="fa-solid fa-user text-main-600 w-4"></i>
                        {booking.name}
                      </p>
                      <p className="flex items-center gap-3 text-gray-700">
                        <i className="fa-regular fa-calendar text-main-600 w-4"></i>
                        {formatDate(booking.date)}
                      </p>
                      <p className="flex items-center gap-3 text-gray-700">
                        <i className="fa-regular fa-clock text-main-600 w-4"></i>
                        {booking.time}
                      </p>
                      <p className="flex items-center gap-3 text-gray-700">
                        <i className="fa-solid fa-phone text-main-600 w-4"></i>
                        {booking.phone}
                      </p>
                      <p className="flex items-center gap-3 text-gray-700">
                        <i className="fa-solid fa-champagne-glasses text-main-600 w-4"></i>
                        {booking.persons} Guest{booking.persons > 1 ? "s" : ""}
                      </p>
                      <p className="flex items-center gap-3 text-gray-400 text-sm">
                        <i className="fa-solid fa-clock-rotate-left text-main-600 w-4"></i>
                        Booked on {formatDate(booking.updatedAt)}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="px-5 py-4 border-t border-gray-200">
                      {booking.status.toUpperCase() === "CANCELLED" ? (
                        <p className="flex items-center justify-center gap-2 text-gray-400 text-sm py-2">
                          <i className="fa-solid fa-ban"></i>
                          This reservation was cancelled
                        </p>
                      ) : !canCancel(booking) ? (
                        <p className="flex items-center justify-center gap-2 text-amber-600 text-sm py-2 bg-amber-50 rounded-lg">
                          <i className="fa-solid fa-clock"></i>
                          Cannot cancel within 24h of reservation
                        </p>
                      ) : (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={
                            isCancelPending && cancellingId === booking._id
                          }
                          className="w-full border border-red-400 text-red-500 font-semibold py-2.5 rounded-lg
    flex items-center justify-center gap-2 hover:bg-red-50 transition-all duration-300 disabled:opacity-50"
                        >
                          {isCancelPending && cancellingId === booking._id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-xmark"></i>
                          )}
                          {isCancelPending && cancellingId === booking._id
                            ? "Cancelling..."
                            : "Cancel Reservation"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {displayMyBookings?.length === 0 && (
                  <p className="text-gray-400 col-span-full text-center py-10">
                    No bookings found
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <Circles
              height={100}
              width={100}
              radius={5}
              color="#8a2a32"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </section>
    </>
  );
}
