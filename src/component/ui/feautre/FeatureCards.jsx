import React from "react";
import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    desc: "On orders above ₹299",
  },
  {
    icon: <FaShieldAlt />,
    title: "Premium Quality",
    desc: "100% Natural & Fresh",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Customer Care Service",
  },
];

const FeatureCards = () => {
  return (
    <section className="w-full bg-[#f7f3f6] py-6">
      <div className="px-3">
        {/* GRID – 3 cards in one row */}
        <div className="grid grid-cols-3 gap-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl py-5 px-2 text-center shadow-sm"
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#6B2D5C]/10 text-[#6B2D5C] text-lg mb-3">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs font-semibold text-[#6B2D5C] leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
