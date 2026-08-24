import { useState } from "react";
import style from "./Messages.module.css";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Pagination,
} from "flowbite-react";

import { LoaderSpinner } from "../Shared/LoaderSpinner/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import InitialisName from "../Shared/InitialisName";
export function Messages() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const messagesPerPage = 4;
  function getAllMessages() {
    const userToken = localStorage.getItem("userToken");
    return axios.get(
      `https://restaurant-project-node-js.vercel.app/api/contact`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
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
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderSpinner></LoaderSpinner>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-bold text-gray-400">
          Something went wrong while loading messages.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="px-4 sm:px-8 lg:px-15 py-8 min-h-screen flex flex-col">
        <div>
          <div className="flex flex-col justify-center items-between  lg:flex-row lg:justify-between lg:items-center">
            {/* headers */}
            <div className="pt-2 pb-6">
              <h2 className="font-bold text-2xl text-main-500">Messages</h2>
              <p className="text-gray-500 font-meduim">
                Showing {currentMessages.length} of {filteredMessages.length}{" "}
                filtered (Total: {messagesList.length})
              </p>
            </div>
            {/* input Search */}
            <div className="sm:pb-4 py-0">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search by name, email..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#AD343E]/30 focus:border-[#AD343E]"
              />
            </div>
          </div>
          <div className="py-4">
            {currentMessages.length > 0 ? (
              <Accordion
                collapseAll
                className="border-none divide-y-0 flex flex-col gap-3"
              >
                {currentMessages.map((msg) => (
                  <AccordionPanel
                    key={msg._id}
                    className="focus:border-none outline-none"
                  >
                    <AccordionTitle className="bg-white rounded-t-2xl  px-5 py-3 shadow-none focus:ring-0 focus:outline-none ">
                      <div className="flex items-center gap-4 w-full">
                        {/* Avatar */}
                        <div
                          className="w-11 h-11 shrink-0 rounded-full bg-[#F7D9DB] text-[#AD343E] flex
                 items-center justify-center font-semibold"
                        >
                          {InitialisName(msg.name)}
                        </div>

                        {/* Name / Email / Subject */}
                        <div className="flex-1 ">
                          <div className="flex items-center gap-3">
                            <p className="font-semibold text-gray-900">
                              {msg.name}
                            </p>
                            {/* Date */}
                            <span className="text-sm text-gray-400 shrink-0 mr-2 ">
                              {formatDate(msg.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-[#AD343E]">{msg.email}</p>
                          <p className="text-sm text-gray-500">{msg.subject}</p>
                        </div>
                      </div>
                    </AccordionTitle>

                    <AccordionContent className="bg-white  border border-t-0 border-gray-100 -mt-3">
                      <p className="text-sm text-gray-700">{msg.message}</p>
                    </AccordionContent>
                  </AccordionPanel>
                ))}
              </Accordion>
            ) : (
              <p className="text-center text-gray-400 py-10">
                No messages found.
              </p>
            )}
            {totalPages > 1 && (
              <div className="flex overflow-x-auto justify-center mt-6">
                <Pagination
                  layout="navigation"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
