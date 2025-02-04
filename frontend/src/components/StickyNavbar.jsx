import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';  // Import GSAP
import { FiSend, FiMessageSquare, FiX } from 'react-icons/fi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../assets/logo.png";
import Tooltip from './Tooltip';



const StickyNavbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling Down
                setIsScrolledDown(true);
            } else {
                // Scrolling Up
                setIsScrolledDown(false);
            }
            lastScrollY = currentScrollY;
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-[80%] left-1/2 transform -translate-x-1/2 bg-[#292929] text-white transition-all duration-300 flex justify-between z-10 space-x-6 shadow-lg ${
                isScrolledDown ? 'top-0' : 'top-[45px]'
            }`}
        >
          <div className='p-4'>
            <img src={logo} className='w-[140px] h-[25px]' alt="fr" />
          </div>

          <div className='flex space-x-6 items-center'>
            <a href="#" className="hover:text-[#C19D60] transition">Home</a>
            <a href="#" className="hover:text-[#C19D60] transition">Branches</a>
            <a href="#" className="hover:text-[#C19D60] transition">About</a>
            <Tooltip text="Favorites">
                <span className='border-l-[1px] transform transition duration-200 hover:text-[#C19D60] border-[#C19D60] p-4 m-0 flex justify-center items-center cursor-pointer'>
                    <i className="fa-solid fa-star text-[20px] h"></i>
                </span>
            </Tooltip>
            <Tooltip text="Share">
                <span className='border-l-[1px] transform transition duration-200 hover:text-[#C19D60] border-[#C19D60] p-4  m-0 flex justify-center items-center cursor-pointer'>
                    <i className="fa-solid fa-share-from-square text-[20px]"></i>
                </span>
            </Tooltip>
          </div>
        </nav>
    );
};

export default StickyNavbar;
