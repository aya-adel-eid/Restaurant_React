import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/category`),
  });

  return {
    categories: data?.data.data ?? [],
    isLoading,
    isError,
  };
}
