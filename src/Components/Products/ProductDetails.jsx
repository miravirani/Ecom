import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items: products, status } = useSelector((state) => state.products);

  // Find the product by id (id from params is string, product.id is number)
  const product = products.find((p) => p.id === Number(id));

  if (status === "loading") return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <main className="py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <button
          className="mb-6 flex items-center text-[#2563eb] hover:underline"
          onClick={() => navigate(-1)}
        >
          <span className="mr-2 text-xl">&#8592;</span> Back to Products
        </button>
        <div className="bg-white rounded-xl shadow p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>
          <div className="flex-1 w-full max-w-xl relative">
            <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500 text-2xl">♡</button>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded mb-2">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-medium">{product.rating?.rate}</span>
              <span className="mx-2">|</span>
              <span>{product.rating?.count} reviews</span>
            </div>
            <div className="text-3xl font-bold mb-4">${product.price}</div>
            <div className="mb-2 font-semibold">Description</div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <button className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-[#1d4ed8] transition">Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails; 