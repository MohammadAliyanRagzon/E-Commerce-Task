"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormData } from "@/app/interface/interfaces";
import { api, routes } from "@/app/routes/routes";

interface EditProductFormProps {
  params: {
    id: string;
  };
}

const EditProductForm: React.FC<EditProductFormProps> = ({ params }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    price: "",
    description: "",
    sizes: "",
    colors: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${api.API_URL}${routes.Products}/${params.id}`
        );
        const { productName, price, description, sizes, colors } =
          response.data;
        setFormData({
          productName,
          price,
          description,
          sizes: sizes.join(","),
          colors: colors.join(","),
        });
      } catch (error) {
        console.error("Failed to fetch product data", error);
        toast.error("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { productName, price, sizes, colors } = formData;
    const nameRegex = /^[a-zA-Z0-9\s]{3,50}$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const sizesRegex = /^(\s*\w+\s*,)*\s*\w+\s*$/;
    const colorsRegex = /^(\s*\w+\s*,)*\s*\w+\s*$/;

    if (!nameRegex.test(productName)) {
      toast.error(
        "Product Name must be 3-50 characters long and can only contain letters, numbers, and spaces."
      );
      return false;
    }

    if (!priceRegex.test(price)) {
      toast.error(
        "Price must be a positive number with up to 2 decimal places."
      );
      return false;
    }

    if (sizes && !sizesRegex.test(sizes)) {
      toast.error("Sizes must be comma-separated words.");
      return false;
    }

    if (colors && !colorsRegex.test(colors)) {
      toast.error("Colors must be comma-separated words.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const { productName, price, description, sizes, colors } = formData;
    try {
      await axios.put(`${api.API_URL}${routes.Products}/${params.id}`, {
        productName,
        price,
        description,
        sizes: sizes.split(","),
        colors: colors.split(","),
      });
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 py-6 my-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Product</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
          </label>
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProductForm;