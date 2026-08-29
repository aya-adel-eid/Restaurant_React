import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function ManageCategories({ activeCategory, onActiveChange }) {
  const token = localStorage.getItem("userToken");
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const { data: categoriesResp } = useQuery({
    queryKey: ["AllCategories"],
    queryFn: () =>
      axios.get(`https://restaurant-project-node-js.vercel.app/api/category`),
  });

  const categories = categoriesResp?.data.data ?? [];

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["AllCategories"] });
  }

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (value) =>
      axios.post(
        `https://restaurant-project-node-js.vercel.app/api/category`,
        { name: value, displayName: value },
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: () => {
      toast.success("Category created", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      setNewValue("");
      invalidate();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    },
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, value }) =>
      axios.put(
        `https://restaurant-project-node-js.vercel.app/api/category/${id}`,
        { name: value, displayName: value },
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: () => {
      toast.success("Category updated", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });
      setEditingId(null);
      invalidate();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    },
  });

  const {
    mutate: deleteCategory,
    isPending: isDeleting,
    variables: deletingId,
  } = useMutation({
    mutationFn: (id) =>
      axios.delete(
        `https://restaurant-project-node-js.vercel.app/api/category/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      ),
    onSuccess: (_resp, id) => {
      toast.success("Category deleted", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
      });

      const deleted = categories.find((c) => c._id === id);
      if (deleted && activeCategory === deleted.name) {
        onActiveChange("all");
      }
      invalidate();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
      });
    },
  });

  function startEdit(category) {
    setEditingId(category._id);
    setEditValue(category.displayName);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  function confirmEdit() {
    if (!editValue.trim()) return;
    updateCategory({ id: editingId, value: editValue.trim() });
  }

  function confirmCreate() {
    if (!newValue.trim()) return;
    createCategory(newValue.trim());
  }

  function handleDelete(category) {
    if (window.confirm(`Delete "${category.displayName}"?`)) {
      deleteCategory(category._id);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* All pill — filter only, not editable/deletable */}
      <button
        onClick={() => onActiveChange("all")}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors duration-200 ${
          activeCategory === "all"
            ? "bg-main-500 text-white border-main-500"
            : "bg-white text-gray-700 border-gray-200 hover:border-main-300"
        }`}
      >
        All
      </button>

      {categories.map((category) =>
        editingId === category._id ? (
          <div
            key={category._id}
            className="flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full border border-main-400 bg-white"
          >
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              className="w-28 text-sm outline-none bg-transparent"
            />
            <button
              onClick={confirmEdit}
              disabled={isUpdating}
              aria-label="Save"
              className="size-6 flex items-center justify-center rounded-full text-green-600 hover:bg-green-50 disabled:opacity-50"
            >
              <i className="fa-solid fa-check text-xs"></i>
            </button>
            <button
              onClick={cancelEdit}
              aria-label="Cancel"
              className="size-6 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          </div>
        ) : (
          <div
            key={category._id}
            className={`flex items-center gap-2 pl-5 pr-2 py-2 rounded-full border text-sm font-semibold transition-colors duration-200 ${
              activeCategory === category.name
                ? "bg-main-500 text-white border-main-500"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <button onClick={() => onActiveChange(category.name)}>
              {category.displayName}
            </button>
            <button
              onClick={() => startEdit(category)}
              aria-label="Edit"
              className={`size-6 flex items-center justify-center rounded-full ${
                activeCategory === category.name
                  ? "text-white/90 hover:bg-white/20"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <i className="fa-solid fa-pencil text-xs"></i>
            </button>
            <button
              onClick={() => handleDelete(category)}
              disabled={isDeleting && deletingId === category._id}
              aria-label="Delete"
              className={`size-6 flex items-center justify-center rounded-full disabled:opacity-50 ${
                activeCategory === category.name
                  ? "text-white/90 hover:bg-white/20"
                  : "text-gray-400 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              {isDeleting && deletingId === category._id ? (
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              ) : (
                <i className="fa-solid fa-trash-can text-xs"></i>
              )}
            </button>
          </div>
        ),
      )}
      {/* input  */}
      <div className="flex items-center gap-2 pl-4 pr-2 py-1.5 rounded-full border border-dashed border-gray-300 bg-white">
        <input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") confirmCreate();
          }}
          placeholder="New..."
          className="w-24 text-sm outline-none bg-transparent placeholder:text-gray-400"
        />
        <button
          onClick={confirmCreate}
          disabled={isCreating || !newValue.trim()}
          aria-label="Add category"
          className="size-6 flex items-center justify-center rounded-full text-green-600 hover:bg-green-50 disabled:opacity-40"
        >
          {isCreating ? (
            <i className="fa-solid fa-spinner fa-spin text-xs"></i>
          ) : (
            <i className="fa-solid fa-check text-xs"></i>
          )}
        </button>
        <button
          onClick={() => setNewValue("")}
          aria-label="Clear"
          className="size-6 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50"
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    </div>
  );
}
