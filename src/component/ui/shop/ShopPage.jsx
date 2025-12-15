import React from "react";
import ShopHero from "./ShopHero";
import { ChevronRight } from "lucide-react";
import Products from "./page/Products";

const ShopPage = () => {
  return (
    <>
      {/* HERO */}
      <ShopHero />

      {/* BREADCRUMB */}
      <div className="w-[70%] mx-auto py-4">
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <span className="cursor-pointer hover:text-black">
            Home
          </span>
          <ChevronRight size={16} />
          <span className="font-medium text-black">
            Shop
          </span>
        </div>
      </div>

      {/* PRODUCTS */}
      <Products />
    </>
  );
};

export default ShopPage;
