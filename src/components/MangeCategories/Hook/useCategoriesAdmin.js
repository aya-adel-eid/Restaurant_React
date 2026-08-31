import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useCategories } from "../../Shared/hooks/useCategories";

export function useCategoriesAdmin() {
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();

  const { categories } = useCategories();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  }

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (value) =>
      axios.post(
        `${import.meta.env.VITE_API_URL}/category`,
        { name: value, displayName: value },
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: () => {
      toast.success("Category created", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      invalidate();
    },
    onError: (error) => {
      toast.error(
        error.response.data.errors[0].message ?? "Something went wrong.",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        },
      );
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, value }) =>
      axios.put(
        `${import.meta.env.VITE_API_URL}/category/${id}`,
        { name: value, displayName: value },
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: () => {
      toast.success("Category updated", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      invalidate();
    },
    onError: (error) => {
      toast.error(
        error.response.data.errors[0].message ?? "Something went wrong.",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        },
      );
    },
  });

  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    variables: deletingId,
  } = useMutation({
    mutationFn: (id) =>
      axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Category deleted", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      invalidate();
    },
    onError: (error) => {
      toast.error(
        error.response?.data.errorMessage ?? "Something went wrong.",
        {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
        },
      );
    },
  });

  return {
    categories,
    createCategory,
    isCreating,
    updateCategory,
    isUpdating,
    deleteCategory,
    isDeleting,
    deletingId,
  };
}
