import axios from "axios";

export function getAllBookings() {
  const token = localStorage.getItem("userToken");
  return axios.get(`${import.meta.env.VITE_API_URL}/booking/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getAllBookingsAdmin() {
  const token = localStorage.getItem("userToken");
  return axios.get(`${import.meta.env.VITE_API_URL}/booking`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function cancelBookingTable(id) {
  const token = localStorage.getItem("userToken");
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
  const token = localStorage.getItem("userToken");
  return axios.post(`${import.meta.env.VITE_API_URL}/booking`, bookingInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function getBookingDetails(bookingId) {
  const token = localStorage.getItem("userToken");
  return axios.get(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function deleteBookingRequest(bookingId) {
  const token = localStorage.getItem("userToken");
  return axios.delete(`${import.meta.env.VITE_API_URL}/booking/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export function cancelBookingRequest(bookingId) {
  const token = localStorage.getItem("userToken");
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
  const token = localStorage.getItem("userToken");
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
