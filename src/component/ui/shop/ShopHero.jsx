import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroImages = [
  "https://thumbs.dreamstime.com/b/makhana-lotus-seed-also-called-as-seeds-fox-nuts-popular-dry-snacks-india-served-bowl-selective-focus-187248786.jpg",
  "https://media.gettyimages.com/id/2152290889/video/fresh-white-makhana-for-sale-in-market.jpg?s=640x640&k=20&c=VylGPk3k7BmfJNfr5brj46EL2J-IS5e0r5jRE5bzuY8=",
  "https://thumbs.dreamstime.com/b/close-up-puffed-lotus-seed-makhana-exotic-vegetable-ingredient-puffed-makhana-seed-394705086.jpg",
];

const ShopHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    /* ✅ CENTER + 70% WIDTH */
    <div className="w-[70%] mx-auto mt-4 ">
      <div
        className="relative w-full h-[55vh] overflow-hidden rounded-2xl"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
        data-aos="zoom-in"
      >
        {/* Images */}
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Shop Banner"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out
              ${index === currentIndex ? "opacity-100 scale-110" : "opacity-0 scale-100"}
            `}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1
            className="text-3xl md:text-5xl font-bold mb-3"
            data-aos="fade-up"
          >
            The Winter Edit
          </h1>
          <p
            className="text-sm md:text-lg max-w-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Nourish your winter with the power of nuts, dry fruits & spices
          </p>
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          <FaChevronLeft className="text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          <FaChevronRight className="text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default ShopHero;
