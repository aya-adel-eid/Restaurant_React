import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useMyBookings() {
  const Status = ["All", "pending", "confirmed", "cancelled"];
  const token = localStorage.getItem("userToken");
  const [currentStatus, setCurrentStatus] = useState("All");
  const queryClient = useQueryClient();

  const {
    data: myBookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllBookingsUser"],
    queryFn: getAllBookings,
  });

  function getAllBookings() {
    return axios.get(`${import.meta.env.VITE_API_URL}/booking/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const displayMyBookings =
    currentStatus === "All"
      ? (myBookings?.data.data ?? [])
      : (myBookings?.data.data ?? []).filter(
          (booking) => booking.status === currentStatus,
        );

  const {
    mutate: cancelBooking,
    isPending: isCancelPending,
    variables: cancellingId,
  } = useMutation({
    mutationFn: (id) =>
      axios.patch(
        `${import.meta.env.VITE_API_URL}/booking/${id}/cancel`,
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
  };
}
