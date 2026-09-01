import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../features/meals/services/menuServices";

export function useCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  return {
    categories: data?.data.data ?? [],
    isLoading,
    isError,
  };
}
