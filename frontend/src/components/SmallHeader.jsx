import React from 'react';

const SmallNav = ({ restaurant }) => {
    return (
        <div className='flex justify-between items-center p-3 pt-0'>
            <div className="language">
                <a href="#" className="text-[#C19D60] text-[12px]">EN</a>
                <span className='text-[#fff] text-[12px] mx-2'> / </span>
                <a href="#" className="text-[12px]">AR</a>
            </div>
            <div className="restaurantInfo text-[13px]">
                <a href={`tel:${restaurant?.phone}`} className="text-[#C19D60] hover:text-[#fff] transition">
                    Contact at: <span className='text-[#fff] hover:text-[#C19D60]'>{restaurant?.phone}</span>
                </a>
                <span> / </span>
                <a href={`mailto:${restaurant?.mail}`} className="text-[#C19D60] hover:text-[#fff] transition">
                    Mail at: <span className='text-[#fff] hover:text-[#C19D60]'>{restaurant?.mail}</span>
                </a>
            </div>
        </div>
    );
};

export default SmallNav;
