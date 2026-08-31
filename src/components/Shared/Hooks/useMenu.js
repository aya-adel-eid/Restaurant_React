import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMenu() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}/menu`),
  });

  return {
    meals: data?.data.data ?? [],
    isLoading,
    isError,
  };
}
