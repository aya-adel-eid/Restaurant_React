import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useBookingsAdmin(selectedBookingId) {
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();

  const {
    data: allBookingsResp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllBookings"],
    queryFn: getAllBookings,
  });

  const allBookings = allBookingsResp?.data.data ?? [];

  function getAllBookings() {
    return axios.get(`${import.meta.env.VITE_API_URL}/booking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const { data: bookingDetailsResp, isLoading: isBookingDetailsLoading } =
    useQuery({
      queryKey: ["getBookingDetails", selectedBookingId],
      queryFn: () => getBookingDetails(selectedBookingId),
      enabled: !!selectedBookingId,
    });

  const bookingDetails = bookingDetailsResp?.data.data;

  function getBookingDetails(bookingId) {
    return axios.get(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function refreshBooking(bookingId) {
    queryClient.invalidateQueries({ queryKey: ["getAllBookings"] });
    queryClient.invalidateQueries({
      queryKey: ["getBookingDetails", bookingId],
    });
  }

  function deleteBookingRequest(bookingId) {
    return axios.delete(
      `${import.meta.env.VITE_API_URL}/booking/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  function confirmBookingRequest(bookingId) {
    return axios.patch(
      `${import.meta.env.VITE_API_URL}/booking/${bookingId}/confirm`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  function cancelBookingRequest(bookingId) {
    return axios.patch(
      `${import.meta.env.VITE_API_URL}/booking/${bookingId}/cancel/admin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  // Delete
  const {
    mutate: deleteBooking,
    isPending: isDeletePending,
    variables: deletingBookingId,
  } = useMutation({
    mutationFn: deleteBookingRequest,
    onSuccess: (_data, bookingId) => {
      toast.success(_data.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      refreshBooking(bookingId);
    },
    onError: (error) => {
      toast.error(error.errorMessage, {
        closeOnClick: true,
        autoClose: 3000,
        position: "top-right",
      });
      console.log(error);
    },
  });

  // Confirm
  const {
    mutate: bookingConfirm,
    isPending: isConfirmPending,
    variables: confirmingBookingId,
  } = useMutation({
    mutationFn: confirmBookingRequest,
    onSuccess: (_data, bookingId) => {
      toast.success(_data.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      refreshBooking(bookingId);
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.errorMessage, {
        closeOnClick: true,
        autoClose: 3000,
        position: "top-right",
      });
    },
  });

  // Cancel
  const {
    mutate: bookingCancel,
    isPending: isCancelPending,
    variables: cancellingBookingId,
  } = useMutation({
    mutationFn: cancelBookingRequest,
    onSuccess: (_data, bookingId) => {
      toast.success(_data.data.message, {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
      refreshBooking(bookingId);
    },
    onError: (error) => {
      toast.error(error.errorMessage, {
        closeOnClick: true,
        autoClose: 3000,
        position: "top-right",
      });
      console.log(error);
    },
  });

  return {
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
  };
}
