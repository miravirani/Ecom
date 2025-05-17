import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, toggleLike } from "../../Redux/productsSlice";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { single: product, singleStatus: status, singleError: error } = useSelector((state) => state.products);
  const liked = useSelector((state) => state.products.liked);
  const isLiked = product && liked.includes(product.id);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (status === "loading") return <div className="text-center py-10">Loading...</div>;
  if (status === "failed") return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  return (
    <main className="py-8 px-2 md:px-4">
      <div className="mx-auto container max-w-[1370px]">
        <button
          className="mb-6 flex items-center text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2 text-gray-600" /> Back to Products
        </button>
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="flex-1 flex justify-center items-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-80 object-contain"
            />
          </div>
          <div className="flex-1 w-full max-w-xl relative">
            <button
              className={`absolute top-0 right-0 text-sm transition hover:bg-gray-100 px-3 py-2 rounded-lg transition ${isLiked ? "text-red-500" : "text-gray-400"}`}
              onClick={() => dispatch(toggleLike(product.id))}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
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