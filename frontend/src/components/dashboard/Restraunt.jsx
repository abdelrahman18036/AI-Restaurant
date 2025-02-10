import React, { useState } from "react";
import { Pencil, X } from "lucide-react";

const Restaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "Tasty Bistro",
    location: "123 Main St, Food Town",
    contact: "+123 456 7890",
    hours: "Mon-Sun: 10AM - 10PM",
    description: "A cozy place serving the best homemade meals.",
    social: {
      facebook: "https://facebook.com/tastybistro",
      instagram: "https://instagram.com/tastybistro",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...restaurantInfo });

  // Open & Close Modal
  const openModal = () => {
    setFormData({ ...restaurantInfo });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save Changes
  const handleSubmit = (e) => {
    e.preventDefault();
    setRestaurantInfo(formData);
    closeModal();
  };

  return (
    <div className="py-10 px-6">
      <h1 className="text-4xl font-semibold text-center text-white mb-6">
        Restaurant Dashboard
      </h1>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto">
        
        {/* Restaurant Info */}
        <div className="bg-[#212121] p-6 rounded-2xl shadow-lg border border-[#C19D60]/30 backdrop-blur-lg">
          <h2 className="text-2xl text-[#f8cb78] font-semibold mb-4">
            Restaurant Information
          </h2>
          <div className="text-white space-y-2 text-lg">
            <p><strong>Name:</strong> {restaurantInfo.name}</p>
            <p><strong>Location:</strong> {restaurantInfo.location}</p>
            <p><strong>Contact:</strong> {restaurantInfo.contact}</p>
            <p><strong>Operating Hours:</strong> {restaurantInfo.hours}</p>
            <p><strong>Description:</strong> {restaurantInfo.description}</p>
            <p>
              <strong>Social Links:</strong> 
              <a href={restaurantInfo.social.facebook} target="_blank" className="text-[#C19D60] hover:text-[#f8cb78] ml-2">Facebook</a> | 
              <a href={restaurantInfo.social.instagram} target="_blank" className="text-[#C19D60] hover:text-[#f8cb78] ml-2">Instagram</a>
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="px-5 py-2 bg-[#313131] hover:bg-[#f8cb78] hover:text-black text-white rounded-lg flex items-center transition duration-300 shadow-lg cursor-pointer"
              onClick={openModal}
            >
              <Pencil size={18} className="mr-2" /> Edit Info
            </button>
          </div>
        </div>


 
      </div>

      {/* MODAL COMPONENT */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-50" onClick={closeModal}>
          <div
            className="bg-[#212121] text-white p-6 rounded-lg shadow-lg w-[500px] border border-[#C19D60]/40"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#C19D60]/40">
              <h3 className="text-lg font-semibold text-[#f8cb78]">Edit Restaurant Info</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-[#f8cb78] transition duration-300">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">Restaurant Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#f8cb78]">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#C19D60]/40 rounded-lg bg-[#313131] text-white"
                  />
                </div>
              </div>

              <button className="mt-4 w-full p-2 bg-[#C19D60] hover:bg-[#f8cb78] text-white rounded-lg transition duration-300">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
 