import { ChartBarStacked, House, Settings, Utensils, X } from 'lucide-react';
import React from 'react';

const SideBar = () => {
  return (
    <div className="grid grid-cols-7">
      <aside className="h-screen sticky top-0 col-span-1 bg-[#313131] text-[#f8cb78] py-6 flex flex-col justify-between">
        
        {/* Close Button - Positioned at the top right */}
        <div className="flex justify-end px-4 mb-5">
          <X size={26} className="cursor-pointer hover:text-gray-400 transition-colors duration-200" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-2 px-4 flex-grow">
          <li className="flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 group cursor-pointer">
            <House size={20}className="text-[#f8cb78] group-hover:text-white" />
            <a href="#" className="text-lg text-[#f8cb78] group-hover:text-white">Restaurant</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 group cursor-pointer">
            <ChartBarStacked size={20} className="text-[#f8cb78] group-hover:text-white" />
            <a href="#" className="text-lg text-[#f8cb78] group-hover:text-white">Categories</a>
          </li>
          <li className="flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 group cursor-pointer">
            <Utensils size={20} className="text-[#f8cb78] group-hover:text-white" />
            <a href="#" className="text-lg text-[#f8cb78] group-hover:text-white">Items</a>
          </li>
        </ul>

        {/* Settings - Pinned at the bottom */}
        <div className="px-4 pb-6">
          <li className="flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 group cursor-pointer">
            <Settings size={20} className="text-[#f8cb78] group-hover:text-white" />
            <a href="#" className="text-lg text-[#f8cb78] group-hover:text-white">Settings</a>
          </li>
        </div>

      </aside>
    </div>
  );
};

export default SideBar;
