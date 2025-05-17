import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, toggleLike } from "../../Redux/Slice/productsSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status, error, liked } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Filter and sort logic
  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sort === "rating") filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);

  return (
    <main className="py-8 px-4">
      <div className="mx-auto container max-w-[1370px]">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-6">Browse our collection of quality products</p>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <div className="relative w-full md:w-4/5">
            <IoIosSearch className="absolute left-3 text-lg top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg px-9 h-10 text-base focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/5 border border-gray-300 rounded-lg px-4 h-10 text-base focus:outline-none"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            {/* <option value="rating">Rating</option> */}
          </select>
        </div>
        {status === "loading" && <div className="text-center py-10">Loading...</div>}
        {status === "failed" && <div className="text-center text-red-500 py-10">{error}</div>}
        {status === "succeeded" && (
          <>
            <p className="mb-4 text-gray-500">{filteredProducts.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col w-full justify-between h-full relative"
                >
                  <button
                    className={`absolute top-4 right-4 text-sm transition hover:bg-gray-100 px-3 py-2 rounded-lg transition ${liked.includes(product.id) ? "text-red-500" : "text-gray-400"
                      }`}
                    onClick={() => dispatch(toggleLike(product.id))}
                  >
                    {liked.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain mx-auto mb-4"
                  />
                  <p className="text-lg mb-1 line-clamp-2 min-h-[48px] text-[#020817]">{product.title}</p>
                  <div className="flex flex-row gap-2">                  <p className="text-gray-500 text-sm mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-1">★</span>
                      <span className="font-medium">{product.rating.rate}</span>
                      <span className="ml-1">({product.rating.count})</span>
                    </div></div>
                  <div className="text-xl font-bold mb-4">${product.price}</div>
                  <button
                    className="bg-[#2563eb] text-white py-2 rounded-lg font-medium hover:bg-[#1d4ed8] transition"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Products; 