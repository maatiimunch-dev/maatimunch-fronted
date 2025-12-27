import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLeaf, FaSeedling, FaHeart } from "react-icons/fa";


const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  
const AboutImg = "https://c.ndtvimg.com/2024-09/ufctv3hg_makhana_625x300_19_September_24.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738?ver-20241030.100";

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        data-aos="fade-up"
      >
        About <span className="text-orange-500">MaatiMunch</span>
      </h1>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div data-aos="zoom-in">
          <img
            src={AboutImg}
            alt="MaatiMunch Premium Makhana"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p data-aos="fade-left">
            MaatiMunch is a premium Indian brand offering high-quality makhana
            (fox nuts) sourced directly from trusted farmers. We focus on purity,
            taste, and nutrition to deliver a healthy snacking experience.
          </p>

          <p data-aos="fade-left" data-aos-delay="100">
            Our makhana is hygienically processed and packed to retain its
            natural crunch and nutritional value, making it suitable for all
            age groups.
          </p>

          {/* Features */}
          <div className="space-y-4 pt-4">
            <div
              className="flex items-start gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaLeaf className="text-green-600 text-xl mt-1" />
              <p>
                100% natural makhana with no harmful additives or preservatives.
              </p>
            </div>

            <div
              className="flex items-start gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaSeedling className="text-green-600 text-xl mt-1" />
              <p>
                Sourced from reliable farmers and processed under strict quality
                control.
              </p>
            </div>

            <div
              className="flex items-start gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaHeart className="text-red-500 text-xl mt-1" />
              <p>
                A healthy, light, and nutritious snacking option for everyday
                consumption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
