import React from "react";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="py-8 px-4 flex flex-col items-center justify-center mx-autp">
      <div className="min-w-[768px] w-full flex flex-col items-center justify-center py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-center tracking-tight">
            Discover Our Premium Product Collection
          </h1>
          <p className="text-xl text-center mt-6 text-[#64748b]">
            Explore our wide range of high-quality products with fast delivery
            and excellent customer service.
          </p>
          <div>
            <button onClick={() => navigate('/products')} className="rounded-md mt-6 px-8 text-sm font-medium bg-[#2563eb] text-white py-3 rounded-lg hover:bg-[#1d4ed8] transition duration-300">
              Browse Products
            </button>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="font-bold text-2xl text-center mb-6">Why Choose Us</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {[{
                heading: "Quality Products",
                desc: "Each product is carefully selected for quality and durability."
            }, {
                heading: "Fast Shipping",
                desc: "Get your products delivered quickly with our efficient shipping."  
            }, {
                heading: "Secure Payments",
                desc: "Shop with confidence using our secure payment methods."
            }].map((item) => (
              <>
                <div key="item">
                  <Card item={item} />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
