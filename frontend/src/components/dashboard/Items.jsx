import React, { useState } from "react";
import { Pencil, Trash2, Heart, PlusCircle, X } from "lucide-react";

const Items = () => {
    const staticRestaurantData = {
        name: "Tasty Bistro",
        categories: [
          {
            id: 1,
            name: "Starters",
            meals: [
              {
                id: 1,
                name: "Spring Rolls",
                description: "Crispy rolls filled with fresh vegetables.",
                cost: 5.99,
                image: "https://source.unsplash.com/400x300/?spring-rolls",
              },
              {
                id: 2,
                name: "Garlic Bread",
                description: "Toasted bread infused with garlic and herbs.",
                cost: 3.49,
                image: "https://source.unsplash.com/400x300/?garlic-bread",
              },
              {
                id: 3,
                name: "Bruschetta",
                description: "Grilled bread topped with tomatoes, garlic, and basil.",
                cost: 6.99,
                image: "https://source.unsplash.com/400x300/?bruschetta",
              },
            ],
          },
          {
            id: 2,
            name: "Mains",
            meals: [
              {
                id: 4,
                name: "Grilled Chicken",
                description: "Juicy grilled chicken seasoned with herbs and spices.",
                cost: 12.99,
                image: "https://source.unsplash.com/400x300/?grilled-chicken",
              },
              {
                id: 5,
                name: "Pasta Carbonara",
                description: "Creamy pasta with crispy bacon and parmesan cheese.",
                cost: 11.49,
                image: "https://source.unsplash.com/400x300/?pasta",
              },
              {
                id: 6,
                name: "Salmon Teriyaki",
                description: "Grilled salmon glazed with teriyaki sauce.",
                cost: 15.99,
                image: "https://source.unsplash.com/400x300/?salmon",
              },
            ],
          },
          {
            id: 3,
            name: "Desserts",
            meals: [
              {
                id: 7,
                name: "Chocolate Lava Cake",
                description: "Rich chocolate cake with a molten center.",
                cost: 7.99,
                image: "https://source.unsplash.com/400x300/?chocolate-cake",
              },
              {
                id: 8,
                name: "Tiramisu",
                description: "Classic Italian dessert with layers of coffee-soaked sponge.",
                cost: 6.99,
                image: "https://source.unsplash.com/400x300/?tiramisu",
              },
            ],
          },
          {
            id: 4,
            name: "Drinks",
            meals: [
              {
                id: 9,
                name: "Fresh Lemonade",
                description: "Refreshing homemade lemonade.",
                cost: 3.99,
                image: "https://source.unsplash.com/400x300/?lemonade",
              },
              {
                id: 10,
                name: "Cappuccino",
                description: "Hot cappuccino with rich frothy milk.",
                cost: 4.99,
                image: "https://source.unsplash.com/400x300/?cappuccino",
              },
            ],
          },
        ],
      };

  const [selectedCategory, setSelectedCategory] = useState(staticRestaurantData.categories[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Open Modal for Adding or Editing
  const openModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center text-white mb-6">
        Your Items
      </h1>

      {/* Category Navigation */}
      <div className="nav w-[60%] m-auto h-20 flex justify-center items-center rounded-2xl">
        <ul className="flex w-full items-center justify-between py-3 px-5 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          {staticRestaurantData.categories.map((category) => (
            <li
              className={`px-5 cursor-pointer font-semibold ${
                selectedCategory.id === category.id ? "text-[#f8cb78]" : "text-white hover:text-[#f8cb78]"
              }`}
              key={category.id}
              onClick={() => setSelectedCategory(category)}
            >
              <h2>{category.name}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Item Button */}
      <div className="w-[80%] mx-auto flex justify-end mt-6">
        <button
          className="px-5 py-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black text-white rounded-lg flex items-center transition duration-300 shadow-lg cursor-pointer"
          onClick={() => openModal()}
        >
          <PlusCircle size={18} className="mr-2" /> Add Item
        </button>
      </div>

      {/* Items Table */}
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
            {selectedCategory.meals.map((meal) => (
              <tr key={meal.id} className="bg-[#313131] border-b border-[#C19D60]/20 hover:bg-[#3a3a3a] transition duration-300">
                <th scope="row" className="px-6 text-lg py-4 font-medium text-white whitespace-nowrap">
                  {meal.name}
                </th>
                <td className="px-6 py-4 text-[#f8cb78]">{meal.description}</td>
                <td className="px-6 py-4 text-[#C19D60] font-semibold">${meal.cost.toFixed(2)}</td>
                <td className="px-6 py-4 flex justify-center space-x-2">
                  {/* Edit Button */}
                  <button
                    className="p-2 bg-[#212121] hover:bg-[#f8cb78] hover:text-black font-semibold text-white rounded-md flex items-center transition duration-300"
                    onClick={() => openModal(meal)}
                  >
                    <Pencil size={16} className="mr-1" /> Edit
                  </button>

                  {/* Delete Button */}
                  <button className="p-2 bg-[#b83b3b] hover:bg-[#ff4d4d] text-white font-semibold rounded-md flex items-center transition duration-300">
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>

          
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL COMPONENT */}
    {isModalOpen && (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-50"
            onClick={closeModal} // Close modal when clicking outside
        >
            <div
            className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-[500px] border border-[#C19D60]/40"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#C19D60]/40">
                <h3 className="text-lg font-semibold text-[#f8cb78]">
                {editingItem ? "Edit Product" : "Add Product"}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-[#f8cb78] transition duration-300">
                <X size={20} />
                </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                <div className="grid gap-4">
                
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-[#f8cb78]">Name</label>
                    <input
                    type="text"
                    defaultValue={editingItem?.name || ""}
                    className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                    placeholder="Product Name"
                    />
                </div>
                {/* Product Desc */}

                <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-[#f8cb78]">Description</label>
                <textarea id="description" rows={4} className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400" placeholder="Write product description here" defaultValue={""} />                    
                </div>
                
                {/* Product Price */}
                <div>
                    <label className="block text-sm font-medium text-[#f8cb78]">Price</label>
                    <input
                    type="number"
                    defaultValue={editingItem?.cost || ""}
                    className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white placeholder-gray-400"
                    placeholder="Price"
                    />
                </div>
                </div>

                {/* Submit Button */}
                <button className="mt-4 w-full p-2 bg-[#C19D60] hover:bg-[#f8cb78] text-white rounded-lg transition duration-300">
                {editingItem ? "Update Product" : "Add Product"}
                </button>
            </form>
            </div>
        </div>
    )}
    </div>
  );
};

export default Items;
