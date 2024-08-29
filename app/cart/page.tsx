"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { RootState } from "@reduxjs/toolkit/query";
import { deleteFromCart } from "../redux/userSlice";
import { toast } from "react-toastify";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.user.cart);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteFromCart({ id }));
    toast.success("Item removed from cart!");
  };

  return (
    <div className="mx-8 my-10 bg-white ">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length > 0 ? (
        <ul className="space-y-4">
          {cart.map((item: any) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.productName}</h2>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-600">Color: {item.color}</p>
                <p className="text-lg font-bold">Price: ${item.price}</p>
              </div>
              <button
                onClick={() => handleDelete(item.productId)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrash size={24} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}