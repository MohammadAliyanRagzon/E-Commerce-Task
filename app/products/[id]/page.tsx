"use client";
import { Product } from "@/app/interface/interfaces";
import { addToCart } from "@/app/redux/userSlice";
import { api, routes } from "@/app/routes/routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.user.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(
          `${api.API_URL}${routes.Products}?id=${params.id}`
        );
        setProduct(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch product details", error);
      }
    };
    getDetail();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.");
      return;
    }
    const isInCart = cart.find((item: any) => item.productId === product?.id);
    if (isInCart) {
      toast.error("Already in the cart.");
      return;
    }

    const cartData = {
      productId: product?.id,
      productName: product?.productName,
      price: product?.price,
      size: selectedSize,
      color: selectedColor,
    };

    dispatch(addToCart(cartData));
    toast.success(`Added to Cart: ${JSON.stringify(cartData.productName)}`);
  };

  return (
    <div className="mx-8 bg-white my-10">
      {product ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-xl text-gray-800 mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Sizes:</h2>
            <ul className="flex space-x-4">
              {product.sizes.map((size) => (
                <li key={size}>
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    } hover:bg-black hover:text-white transition`}
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Colors:</h2>
            <ul className="flex space-x-4">
              {product.colors.map((color) => (
                <li key={color}>
                  <button
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === color
                        ? "bg-black text-white"
                        : "bg-gray-100"
                    } hover:bg-black hover:text-white transition`}
                  >
                    {color}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}