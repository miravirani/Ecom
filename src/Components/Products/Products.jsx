import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/productsSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status, error } = useSelector((state) => state.products);
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-6">Browse our collection of quality products</p>
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        {status === "loading" && <div className="text-center py-10">Loading...</div>}
        {status === "failed" && <div className="text-center text-red-500 py-10">{error}</div>}
        {status === "succeeded" && (
          <>
            <p className="mb-4 text-gray-500">{filteredProducts.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full relative"
                >
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl">♡</button>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain mx-auto mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-1 line-clamp-2 min-h-[48px]">{product.title}</h2>
                  <p className="text-gray-500 text-sm mb-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-1">★</span>
                    <span className="font-medium">{product.rating.rate}</span>
                    <span className="ml-1">({product.rating.count})</span>
                  </div>
                  <div className="text-2xl font-bold mb-4">${product.price}</div>
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