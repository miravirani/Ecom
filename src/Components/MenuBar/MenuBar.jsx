import React from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <>
    {console.log("ffff")}
      <div className="bg-[#2563eb] py-4 w-full">
        <div className="flex justify-between items-center text-white bg-[#2563eb] px-4 mx-auto w-full container max-w-[1400px]">
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            <h1>ProductStore</h1>
          </Link>
          <div className="flex gap-4 ">
            <Link to="/" className="cursor-pointer hover:underline">Home</Link>
            <Link to="/products" className="cursor-pointer hover:underline">Products</Link>
          </div>
        </div>
      </div>
    </>
  ); 
};
export default MenuBar;
