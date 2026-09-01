import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useMenu } from "../../../../../components/Shared/Hooks/useMenu";

export function useMenuAdmin() {
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();

  const { meals, isLoading } = useMenu();

  function invalidateMenu() {
    queryClient.invalidateQueries({ queryKey: ["menu"] });
  }

  // delete
  const {
    mutate: deleteMealMutate,
    isPending: isDeletePending,
    variables: deletingId,
  } = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (resp) => {
      toast.success(resp.data.message);
      invalidateMenu();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.");
    },
  });

  // add
  const { mutate: addMealMutate, isPending: isAddPending } = useMutation({
    mutationFn: (formData) =>
      axios.post(`${import.meta.env.VITE_API_URL}/menu`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Meal added successfully");
      invalidateMenu();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.");
    },
  });

  // edit
  const { mutate: editMealMutate, isPending: isEditPending } = useMutation({
    mutationFn: ({ id, formData }) =>
      axios.put(`${import.meta.env.VITE_API_URL}/menu/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Meal updated successfully");
      invalidateMenu();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.");
    },
  });

  return {
    meals,
    isLoading,
    deleteMealMutate,
    isDeletePending,
    deletingId,
    addMealMutate,
    isAddPending,
    editMealMutate,
    isEditPending,
  };
}
