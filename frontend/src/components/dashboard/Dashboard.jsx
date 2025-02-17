import { useEffect, useRef, useState } from 'react';
import { ChartBarStacked, House, Settings, Utensils, WrapText, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Items from './Items';
import Categories from './Categories';
import Restraunt from './Restraunt';

const SideBar = () => {
  // On desktop (>=768px), the sidebar is open by default.
  const [isOpen, setIsOpen] = useState(() => window.innerWidth >= 768);
  const [selectedTab, setSelectedTab] = useState('restaurant');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const asideRef = useRef(null);

  useEffect(() => {
    if (windowWidth < 768) {
      gsap.to(asideRef.current, { x: isOpen ? "0%" : "-100%", duration: 0.1 });
    } else {
      gsap.to(asideRef.current, { width: isOpen ? "16rem" : "0rem", duration: 0.1 });
    }
  }, [isOpen, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768 && !isOpen) {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        ref={asideRef}
        className={`bg-[#313131] text-white py-6 flex flex-col justify-between z-50 transition-all duration-300 overflow-hidden
                    ${windowWidth < 768 ? "fixed top-0 left-0 h-screen" : "relative"}`}
      >
        <div className="flex justify-end px-4">
          {isOpen && (
            <X
              size={26}
              className="cursor-pointer hover:text-[#f8cb78] transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>

        {isOpen && (
          <>
            <ul className="flex flex-col space-y-2 px-4 flex-grow mt-4">
              <li
                onClick={() => setSelectedTab('restaurant')}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer 
                            transition-colors duration-200 hover:bg-[#222222]
                            ${selectedTab === 'restaurant' ? 'text-[#f8cb78]' : 'text-white'}`}
              >
                <House
                  size={20}
                  className={`group-hover:text-[#f8cb78] ${selectedTab === 'restaurant' ? 'text-[#f8cb78]' : 'text-white'}`}
                />
                <span className="text-lg">Restaurant</span>
              </li>
              <li
                onClick={() => setSelectedTab('categories')}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer 
                            transition-colors duration-200 hover:bg-[#222222]
                            ${selectedTab === 'categories' ? 'text-[#f8cb78]' : 'text-white'}`}
              >
                <ChartBarStacked
                  size={20}
                  className={`group-hover:text-[#f8cb78] ${selectedTab === 'categories' ? 'text-[#f8cb78]' : 'text-white'}`}
                />
                <span className="text-lg">Categories</span>
              </li>
              <li
                onClick={() => setSelectedTab('items')}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer 
                            transition-colors duration-200 hover:bg-[#222222]
                            ${selectedTab === 'items' ? 'text-[#f8cb78]' : 'text-white'}`}
              >
                <Utensils
                  size={20}
                  className={`group-hover:text-[#f8cb78] ${selectedTab === 'items' ? 'text-[#f8cb78]' : 'text-white'}`}
                />
                <span className="text-lg">Items</span>
              </li>
            </ul>

            <div className="px-4 pb-6">
              <li className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer 
                             transition-colors duration-200 hover:bg-[#222222]">
                <Settings size={20} className="text-white group-hover:text-[#f8cb78]" />
                <Link to="/setting" className="text-lg">
                  Settings
                </Link>
              </li>
            </div>
          </>
        )}
      </aside>

      <main className="flex-1 p-10 bg-[#212121] text-white transition-all duration-300">
        {windowWidth >= 768 && !isOpen && (
          <WrapText
            size={26}
            className="cursor-pointer hover:text-[#f8cb78] transition-colors duration-200 mb-4"
            onClick={() => setIsOpen(true)}
          />
        )}
        {/* Toggle icon for mobile */}
        {windowWidth < 768 && !isOpen && (
          <div className="px-4 mb-4">
            <WrapText
              size={26}
              className="cursor-pointer hover:text-[#f8cb78] transition-colors duration-200"
              onClick={() => setIsOpen(true)}
            />
          </div>
        )}
        {selectedTab === 'restaurant' && <Restraunt />}
        {selectedTab === 'categories' && <Categories />}
        {selectedTab === 'items' && <Items />}
      </main>
    </div>
  );
};

export default SideBar;
