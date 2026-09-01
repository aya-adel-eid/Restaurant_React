import { useQuery } from "@tanstack/react-query";
import { getAllMeals } from "../../../features/meals/services/menuServices";

export function useMenu() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: () => getAllMeals(),
  });

  return {
    meals: data?.data.data ?? [],
    isLoading,
    isError,
  };
}
