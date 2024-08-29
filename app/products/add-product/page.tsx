"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { api, routes } from "@/app/routes/routes";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    sizes: "",
    colors: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    description: "",
    sizes: "",
    colors: "",
  });

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "price":
        if (!/^\d+(\.\d{1,2})?$/.test(value)) {
          error = "Price must be a valid number (e.g., 10 or 10.99).";
        }
        break;

      case "sizes":
        if (value && !/^[\w\s,]+$/.test(value)) {
          error = "Sizes must be comma-separated (e.g., S,M,L,XL).";
        }
        break;

      case "colors":
        if (value && !/^[\w\s,]+$/.test(value)) {
          error = "Colors must be comma-separated (e.g., red,blue,green).";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { productName, price, description, sizes, colors } = formData;

    const priceError = validateField("price", price);
    const sizesError = validateField("sizes", sizes);
    const colorsError = validateField("colors", colors);

    if (priceError || sizesError || colorsError) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      await axios.post(`${api.API_URL}${routes.Products}`, {
        productName,
        price,
        description,
        sizes: sizes.split(","),
        colors: colors.split(","),
      });
      console.log("Product added successfully!");

      setFormData({
        productName: "",
        price: "",
        description: "",
        sizes: "",
        colors: "",
      });
      toast.success("Product Added");
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <div className="mx-8 py-6 my-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Product Name</span>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="mt-1 block w-full border-black border-2 rounded-md shadow-sm h-10 px-3"
            required
          />
          {errors.productName && (
            <p className="text-red-600">{errors.productName}</p>
          )}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Price</span>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-black border-2 rounded-md shadow-sm h-10 px-3"
            required
          />
          {errors.price && <p className="text-red-600">{errors.price}</p>}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border-black border-2 rounded-md shadow-sm h-24 px-3 py-2"
            required
          />
          {errors.description && (
            <p className="text-red-600">{errors.description}</p>
          )}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Sizes (comma separated)</span>
          <input
            type="text"
            name="sizes"
            value={formData.sizes}
            onChange={handleChange}
            className="mt-1 block w-full border-black border-2 rounded-md shadow-sm h-10 px-3"
          />
          {errors.sizes && <p className="text-red-600">{errors.sizes}</p>}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Colors (comma separated)</span>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            className="mt-1 block w-full border-black border-2 rounded-md shadow-sm h-10 px-3"
          />
          {errors.colors && <p className="text-red-600">{errors.colors}</p>}
        </label>
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
