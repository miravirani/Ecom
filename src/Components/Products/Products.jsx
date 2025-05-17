import React from "react";

const Products = () => {
  return (
    <main className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product cards will go here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Product 1</h2>
            <p className="text-gray-600">Product description goes here</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Product 2</h2>
            <p className="text-gray-600">Product description goes here</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Product 3</h2>
            <p className="text-gray-600">Product description goes here</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products; 