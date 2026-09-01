import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMenu } from "../../../../../components/Shared/Hooks/useMenu";
import { addMeal, deleteMeal, editMeal } from "../../../services/menuServices";

export function useMenuAdmin() {
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
    mutationFn: (id) => deleteMeal(id),
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
    mutationFn: (formData) => addMeal(formData),
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
    mutationFn: ({ id, formData }) => editMeal(id, formData),
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
