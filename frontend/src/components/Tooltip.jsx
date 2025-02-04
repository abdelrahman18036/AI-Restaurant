import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Tooltip = ({ text, children }) => {
    return (
        <div className="relative group m-0">
            {children}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max px-3 py-1 text-white bg-[#292929] text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {text}
            </div>
        </div>
    );
};
export default Tooltip;