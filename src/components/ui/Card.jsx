"use client";

const Card = ({ children, className = "", onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white text-black rounded-2xl shadow border p-4 transition 
        hover:shadow-md ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
