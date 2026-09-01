import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  cancelBookingRequest,
  confirmBookingRequest,
  deleteBookingRequest,
  getAllBookings,
  getAllBookingsAdmin,
  getBookingDetails,
} from "../../services/bookingsServices";

export function useBookingsAdmin(selectedBookingId) {
  const queryClient = useQueryClient();

  const {
    data: allBookingsResp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAllBookings"],
    queryFn: getAllBookingsAdmin,
  });

  const allBookings = allBookingsResp?.data.data ?? [];

  const { data: bookingDetailsResp, isLoading: isBookingDetailsLoading } =
    useQuery({
      queryKey: ["getBookingDetails", selectedBookingId],
      queryFn: () => getBookingDetails(selectedBookingId),
      enabled: !!selectedBookingId,
    });

  const bookingDetails = bookingDetailsResp?.data.data;

  function refreshBooking(bookingId) {
    queryClient.invalidateQueries({ queryKey: ["getAllBookings"] });
    queryClient.invalidateQueries({
      queryKey: ["getBookingDetails", bookingId],
    });
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
