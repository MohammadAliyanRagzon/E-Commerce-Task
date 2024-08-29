import React from "react";

interface CardProps {
  productName: string;
  price: string;
}

export default function Card({ productName, price }: CardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
      <div className="p-4 flex flex-col justify-between h-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{productName}</h2>
        <h3 className="text-xl font-bold text-gray-900">${price}</h3>
      </div>
    </div>
  );
}
