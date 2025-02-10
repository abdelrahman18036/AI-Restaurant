import { useState } from 'react';
import { ChartBarStacked, House, Settings, Utensils, X } from 'lucide-react';
import Items from './Items';

const SideBar = () => {
  const [selectedTab, setSelectedTab] = useState('restaurant');

  return (
    <div className="grid grid-cols-7 h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 bg-[#313131] text-white py-6 flex flex-col justify-between">
        
        {/* Close Button - Positioned at the top right */}
        <div className="flex justify-end px-4">
          <X size={26} className="cursor-pointer hover:text-[#f8cb78] transition-colors duration-200" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-2 px-4 flex-grow">
          <li 
            className={`flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 cursor-pointer group 
            ${selectedTab === 'restaurant' ? 'text-[#f8cb78]' : 'text-white'}`} 
            onClick={() => setSelectedTab('restaurant')}
          >
            <House size={20} className={`${selectedTab === 'restaurant' ? 'text-[#f8cb78]' : 'text-white'} group-hover:text-[#f8cb78]`} />
            <span className="text-lg">Restaurant</span>
          </li>
          <li 
            className={`flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 cursor-pointer group 
            ${selectedTab === 'categories' ? 'text-[#f8cb78]' : 'text-white'}`} 
            onClick={() => setSelectedTab('categories')}
          >
            <ChartBarStacked size={20} className={`${selectedTab === 'categories' ? 'text-[#f8cb78]' : 'text-white'} group-hover:text-[#f8cb78]`} />
            <span className="text-lg">Categories</span>
          </li>
          <li 
            className={`flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 cursor-pointer group 
            ${selectedTab === 'items' ? 'text-[#f8cb78]' : 'text-white'}`} 
            onClick={() => setSelectedTab('items')}
          >
            <Utensils size={20} className={`${selectedTab === 'items' ? 'text-[#f8cb78]' : 'text-white'} group-hover:text-[#f8cb78]`} />
            <span className="text-lg">Items</span>
          </li>
        </ul>

        {/* Settings - Pinned at the bottom */}
        <div className="px-4 pb-6">
          <li className="flex items-center space-x-3 hover:bg-[#222222] p-3 rounded-lg transition-colors duration-200 cursor-pointer group">
            <Settings size={20} className="text-white group-hover:text-[#f8cb78]" />
            <span className="text-lg">Settings</span>
          </li>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="col-span-6 p-10 bg-[#212121] text-white">
        {selectedTab === 'restaurant' && <h1 className="text-3xl font-semibold">Your Restaurant</h1>}
        {selectedTab === 'categories' && <h1 className="text-3xl font-semibold">Your Categories</h1>}
        {selectedTab === 'items' && <Items />}
      </main>
    </div>
  );
};

export default SideBar;
