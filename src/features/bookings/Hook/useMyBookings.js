import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import {
  bookingsTable,
  cancelBookingTable,
  getAllBookings,
} from "../services/bookingsServices";
import { toast } from "react-toastify";

export function useMyBookings() {
  const Status = ["All", "pending", "confirmed", "cancelled"];

  const [currentStatus, setCurrentStatus] = useState("All");
  const queryClient = useQueryClient();
  // all Bookings
  const {
    data: myBookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllBookingsUser"],
    queryFn: getAllBookings,
  });

  const displayMyBookings =
    currentStatus === "All"
      ? (myBookings?.data.data ?? [])
      : (myBookings?.data.data ?? []).filter(
          (booking) => booking.status === currentStatus,
        );
  // cancel Bookings
  const {
    mutate: cancelBooking,
    isPending: isCancelPending,
    variables: cancellingId,
  } = useMutation({
    mutationFn: (id) => cancelBookingTable(id),
    onSuccess: (resp) => {
      console.log(resp.data.data.message);

      toast.success(resp.data.message, {
        closeOnClick: true,
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["getAllBookingsUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.errorMessage);
    },
  });
  const { mutate: bookingTable, isPending: isBookingPending } = useMutation({
    mutationKey: ["BookingTable"],
    mutationFn: bookingsTable,
  });

  function handleCancelBooking(id) {
    cancelBooking(id);
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
  return {
    Status,
    currentStatus,
    displayMyBookings,
    isLoading,
    isError,
    isCancelPending,
    cancellingId,
    handleCancelBooking,
    getMyBookingByStatu,
    canCancel,
    bookingTable,
    isBookingPending,
  };
}
