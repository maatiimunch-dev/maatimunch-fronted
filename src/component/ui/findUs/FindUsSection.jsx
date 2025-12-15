import React, { useEffect, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const locations = [
  "Delhi",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Greater Noida",
];

const stats = [
  { value: "11+", label: "Stores" },
  { value: "450000+", label: "Happy Customers" },
  { value: "500000+", label: "Order Delivered" },
];

const FindUsSection = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div
            data-aos="fade-right"
            className="w-full overflow-hidden rounded-2xl"
          >
            <img
              src="https://www.consciousfood.com/cdn/shop/files/3_24.jpg?v=1693556888&width=1445"
              alt="Maati Munch Store"
              className="w-full h-[260px] sm:h-[360px] lg:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div data-aos="fade-left" className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hey, We Aren't That Far!
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our journey has led us to broaden our network.
              Now, you can easily spot us at your nearest location
              and get your healthy eating plans sorted!
            </p>

            {/* LOCATION DROPDOWN */}
            <div className="relative w-fit">
              <p className="font-semibold text-gray-900 mb-3">
                Find us Here
              </p>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-[#6B2D5C] hover:bg-[#5a2550] text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                All Locations
                <ChevronDown
                  size={18}
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div
                  data-aos="fade-up"
                  className="absolute mt-3 w-56 bg-white shadow-xl rounded-xl overflow-hidden z-20"
                >
                  {locations.map((loc, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                    >
                      <MapPin size={16} className="text-[#6B2D5C]" />
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STATS */}
        {/* <div
          data-aos="zoom-in"
          className="mt-14 bg-white shadow-lg rounded-2xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x"
        >
          {stats.map((item, index) => (
            <div key={index} className="text-center py-6 px-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#6B2D5C]">
                {item.value}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div> */}

      </div>
    </section>
  );
};

export default FindUsSection;
