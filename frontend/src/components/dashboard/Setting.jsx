import React, { useState } from "react";

const Settings = () => {
  const [profileImage, setProfileImage] = useState("https://i.pinimg.com/736x/3e/c9/58/3ec9585530e9a14612fb450e1b075a50.jpg");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    timezone: "Pacific Standard Time",
  });

  const timezones = [
    "Pacific Standard Time",
    "Eastern Standard Time",
    "Central European Time",
    "Greenwich Mean Time",
    "Indian Standard Time",
  ];

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings Updated!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212121] p-6">
      <div className="bg-[#313131] p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-[#C19D60]/30">
        <h2 className="text-2xl font-semibold text-[#f8cb78]">Personal Information</h2>
        <p className="text-sm text-white/70 mb-5">Use a permanent address where you can receive mail.</p>

        {/* Profile Section */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-[#C19D60]/50 shadow-md"
          />
          <div>
            <label
              htmlFor="avatar"
              className="bg-[#444] hover:bg-[#555] text-white px-4 py-2 rounded-lg cursor-pointer transition duration-300"
            >
              Change avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <p className="text-xs text-white/50 mt-1">JPG, GIF or PNG. 1MB max.</p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-white text-sm font-medium">Username</label>
                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="janesmith"
                className="w-full p-2 border outline-none border-[#C19D60]/30 rounded-lg bg-[#222] text-white"
                />
            </div>

          <div>
            <label className="block text-white text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="janesmith@company.com"
              className="w-full p-2 border outline-none border-[#C19D60]/30 rounded-lg bg-[#222] text-white"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*********"
              className="w-full p-2 border outline-none border-[#C19D60]/30 rounded-lg bg-[#222] text-white"
            />
          </div>


    

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-[#C19D60] hover:bg-[#f8cb78] text-black font-semibold rounded-lg transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
