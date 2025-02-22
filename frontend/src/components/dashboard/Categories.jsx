// src/components/Categories.jsx
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "../../api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (!data.error) {
        setCategories(data);
      }
    };
    loadCategories();
  }, []);

  const openModal = (category = null) => {
    setEditingCategory(category);
    setFormData({ name: category ? category.name : "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "" });
  };

  const handleChange = (e) => {
    setFormData({ name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    if (editingCategory) {
      const response = await updateCategory(editingCategory.id, { name: formData.name });
      if (!response.error) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === editingCategory.id ? response : cat))
        );
      }
    } else {
      const response = await addCategory({ name: formData.name });
      if (!response.error) {
        setCategories((prev) => [...prev, response]);
      }
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    const response = await deleteCategory(id);
    if (response.success) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">
        Your Categories
      </h1>
      <div className="w-[80%] mx-auto flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black text-white rounded-lg flex items-center transition duration-300 shadow-lg cursor-pointer"
          onClick={() => openModal()}
        >
          <PlusCircle size={18} className="mr-2" /> Add Category
        </button>
      </div>
      <div className="relative overflow-x-auto mt-4 w-[80%] mx-auto bg-[#212121] backdrop-blur-lg rounded-lg p-4 border border-[#C19D60]/30 shadow-md">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-[#313131] text-[#f8cb78]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Items In
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-[#313131] border-b border-[#C19D60]/20 hover:bg-[#3a3a3a] transition duration-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-lg font-medium text-white whitespace-nowrap"
                  >
                    {category.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 text-lg font-medium text-center text-white whitespace-nowrap"
                  >
                    4
                  </th>
                  <td className="px-6 py-4 flex justify-center space-x-2">
                    <button
                      className="p-2 px-3 cursor-pointer font-semibold bg-[#212121] hover:text-black hover:bg-[#f8cb78] text-white rounded-md flex items-center transition duration-300"
                      onClick={() => openModal(category)}
                    >
                      <Pencil size={16} className="mr-1" /> Edit
                    </button>
                    <button
                      className="p-2 px-3 cursor-pointer font-semibold bg-[#b83b3b] hover:bg-[#ff4d4d] text-white rounded-md flex items-center transition duration-300"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4 text-[#f8cb78]">
                  No categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-[500px] border border-[#C19D60]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#C19D60]/40">
              <h3 className="text-lg font-semibold text-[#f8cb78]">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-[#f8cb78] transition duration-300"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#f8cb78]">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border outline-none border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                  placeholder="Enter category name"
                />
              </div>
              <button className="mt-4 w-full p-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black font-semibold text-white rounded-lg transition duration-300">
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
