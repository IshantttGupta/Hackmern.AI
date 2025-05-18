import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CTAButton = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className="relative group overflow-hidden bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <>
        <span className="relative z-10 flex items-center justify-center cursor-pointer" onClick={() => navigate('/auth')}>
          Get Meal Plans Now
          <svg 
            className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12H19M19 12L12 5M19 12L12 19" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div 
          className={`absolute bottom-0 left-0 w-full h-full bg-green-400 transform ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 opacity-20`}
        />
      </>
    </button>
  );
};

export default CTAButton;