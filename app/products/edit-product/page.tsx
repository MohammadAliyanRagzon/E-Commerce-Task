"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { Product } from "@/app/interface/interfaces";
import { api, routes } from "@/app/routes/routes";

const EditProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>(
          `${api.API_URL}${routes.Products}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
        toast.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
    await axios.delete(`${api.API_URL}${routes.Products}/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product", error);
      toast.error("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 my-10">
      <h1 className="text-3xl font-bold mb-4">Edit Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold">{product.productName}</h2>
                <p className="text-gray-600">${product.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Link href={`/products/edit-product/${product.id}`}>
                    <FaEdit size={20} />
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditProductPage;
