import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button 
      className="bg-[#4CAF50] text-white py-2 px-4 rounded hover:bg-[#45a049]"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
