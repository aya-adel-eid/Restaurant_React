import axios from "axios";
const token = localStorage.getItem("userToken");

export function getAllBookings() {
  return axios.get(`${import.meta.env.VITE_API_URL}/booking/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getAllBookingsAdmin() {
  return axios.get(`${import.meta.env.VITE_API_URL}/booking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function cancelBookingTable(id) {
  return axios.patch(
    `${import.meta.env.VITE_API_URL}/booking/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}
export function bookingsTable(bookingInfo) {
  return axios.post(`${import.meta.env.VITE_API_URL}/booking`, bookingInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getBookingDetails(bookingId) {
  return axios.get(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteBookingRequest(bookingId) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function cancelBookingRequest(bookingId) {
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
export function confirmBookingRequest(bookingId) {
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
