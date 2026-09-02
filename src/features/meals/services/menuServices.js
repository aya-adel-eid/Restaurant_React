import axios from "axios";

export function deleteMeal(id) {
  const token = localStorage.getItem("userToken");
  return axios.delete(`${import.meta.env.VITE_API_URL}/menu/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function addMeal(value) {
  const token = localStorage.getItem("userToken");
  return axios.post(`${import.meta.env.VITE_API_URL}/menu`, value, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function editMeal(id, formData) {
  const token = localStorage.getItem("userToken");
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
  const token = localStorage.getItem("userToken");
  return axios.post(
    `${import.meta.env.VITE_API_URL}/category`,
    { name: value, displayName: value },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
export function editCategory(id, value) {
  const token = localStorage.getItem("userToken");
  return axios.put(
    `${import.meta.env.VITE_API_URL}/category/${id}`,
    { name: value, displayName: value },
    { headers: { Authorization: `Bearer ${token}` } },
  );
}
export function deleteCategoryReq(id) {
  const token = localStorage.getItem("userToken");
  return axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
