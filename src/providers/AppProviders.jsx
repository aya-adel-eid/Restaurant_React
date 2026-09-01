import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "../assets/context/UserContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function AppProviders({ children }) {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}
