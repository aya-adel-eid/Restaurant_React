import axios from "axios";

const token = localStorage.getItem("userToken");

export function deleteMeal(id) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/menu/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function addMeal(value) {
  return axios.post(`${import.meta.env.VITE_API_URL}/menu`, value, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function editMeal(id, formData) {
  return axios.put(`${import.meta.env.VITE_API_URL}/menu/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function getAllMeals() {
  return axios.get(`${import.meta.env.VITE_API_URL}/menu`);
}
export function getAllCategories() {
  return axios.get(`${import.meta.env.VITE_API_URL}/category`);
}
export function addCategory(value) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/category`,
    { name: value, displayName: value },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
export function editCategory(id, value) {
  return axios.put(
    `${import.meta.env.VITE_API_URL}/category/${id}`,
    { name: value, displayName: value },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
export function deleteCategoryReq(id) {
  return axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
