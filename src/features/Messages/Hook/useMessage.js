import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useMessage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const messagesPerPage = 4;
  function getAllMessages() {
    const userToken = localStorage.getItem("userToken");
    return axios.get(`${import.meta.env.VITE_API_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }
  const {
    data: allMessages,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getAllMessages,
    queryKey: ["getAllMessages"],
  });

  const messagesList = allMessages?.data.data ?? [];

  // search & pagination
  const filteredMessages = messagesList.filter((msg) => {
    const term = searchInput.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(term) ||
      msg.email?.toLowerCase().includes(term)
    );
  });
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const currentMessages = filteredMessages.slice(
    startIndex,
    startIndex + messagesPerPage,
  );
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  }

  const onPageChange = (page) => setCurrentPage(page);
  return {
    onPageChange,
    handleSearchChange,
    currentMessages,
    totalPages,
    isError,
    isLoading,
    filteredMessages,
    messagesList,
    searchInput,
    currentPage,
  };
}
