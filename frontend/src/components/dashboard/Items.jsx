import React, { useEffect, useState } from "react";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";
import { fetchCategories, fetchMeals, addMeal, updateMeal, deleteMeal } from "../../api";

const Items = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", cost: "", description: "" });

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      if (!data.error) {
        setCategories(data);
        setSelectedCategory(data[0]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const loadMeals = async () => {
        const data = await fetchMeals(selectedCategory.id);
        if (!data.error) {
          setMeals(data);
        }
      };
      loadMeals();
    }
  }, [selectedCategory]);

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData({
      name: item ? item.name : "",
      cost: item ? item.cost : "",
      description: item ? item.description : "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", cost: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      const response = await updateMeal(editingItem.id, formData);
      if (!response.error) {
        setMeals((prev) =>
          prev.map((meal) => (meal.id === editingItem.id ? response : meal))
        );
      }
    } else {
      const response = await addMeal(selectedCategory.id, formData);
      if (!response.error) {
        setMeals((prev) => [...prev, response]);
      }
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    const response = await deleteMeal(id);
    if (response.success) {
      setMeals((prev) => prev.filter((meal) => meal.id !== id));
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">
        Your Items
      </h1>
      <div className="nav w-[60%] m-auto h-20 flex justify-center items-center rounded-2xl">
        <ul className="flex w-full items-center justify-between py-3 px-5 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`px-5 cursor-pointer font-semibold ${selectedCategory && selectedCategory.id === category.id
                ? "text-[#f8cb78]"
                : "text-white hover:text-[#f8cb78]"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              <h2>{category.name}</h2>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[80%] mx-auto flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black text-white rounded-lg flex items-center transition duration-300 shadow-lg cursor-pointer"
          onClick={() => openModal()}
        >
          <PlusCircle size={18} className="mr-2" /> Add Item
        </button>
      </div>
      <div className="relative overflow-x-auto mt-4 w-[80%] mx-auto bg-[#212121] backdrop-blur-lg rounded-lg p-4 border border-[#C19D60]/30 shadow-md">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-[#313131] text-[#f8cb78]">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr
                key={meal.id}
                className="bg-[#313131] border-b border-[#C19D60]/20 hover:bg-[#3a3a3a] transition duration-300"
              >
                <th scope="row" className="px-6 py-4 text-lg font-medium text-white whitespace-nowrap">
                  {meal.name}
                </th>
                <td className="px-6 py-4 text-[#f8cb78]">{meal.description}</td>
                <td className="px-6 py-4 text-[#C19D60] font-semibold">
                  ${Number(meal.cost).toFixed(2)}
                </td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  <button
                    className="p-2 px-3 cursor-pointer font-semibold bg-[#212121] hover:text-black hover:bg-[#f8cb78] text-white rounded-md flex items-center transition duration-300"
                    onClick={() => openModal(meal)}
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    className="p-2 px-3 cursor-pointer font-semibold bg-[#b83b3b] hover:bg-[#ff4d4d] text-white rounded-md flex items-center transition duration-300"
                    onClick={() => handleDelete(meal.id)}
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
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
                {editingItem ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-[#f8cb78] transition duration-300">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border outline-none border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">
                    Price
                  </label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    className="w-full outline-none p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full outline-none p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <button className="mt-4 w-full p-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black font-semibold text-white rounded-lg transition duration-300">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
