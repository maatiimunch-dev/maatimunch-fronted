import React from "react";
import { Link } from "react-router-dom";


const RecentBlogs = () => {

	 const blogs = [
    {
      id: 1,
      image: "https://farmpureenterprises.co.in/images/makhana-1.jpg",
      author: "Admin",
      date: "Nov 26, 2025",
      tags: ["Dry Fruits", "Immunity"],
      title: "Top 5 Dry Fruits for a Stronger Immune System",
      description: "Your immune system works nonstop to protect you, and the right foods can make its job much easier. Dry fruits aren't just tasty snacks; they're tiny powerhouses filled with vitamins...",
    },
    {
      id: 2,
      image: "https://chheda.store/wp-content/uploads/2020/12/WhatsApp-Image-2021-06-24-at-16.16.19.jpeg",
      logo: "https://chheda.store/wp-content/uploads/2020/12/WhatsApp-Image-2021-06-24-at-16.16.19.jpeg",
      author: "Admin",
      date: "Nov 05, 2025",
      tags: ["Maati Munch", "Premium"],
      title: "Why Maati Munch is the Best Dry Fruit Brand in India",
      description: "When it comes to quality, taste, trust and health, there is one name that stands out from every Indian home, Maati Munch. Be it a handful of almonds before school...",
    },
    {
      id: 3,
      image: "https://gramiyum.in/wp-content/uploads/2025/02/Phool-Makhana.jpg",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&q=80",
      author: "Admin",
      date: "Oct 25, 2025",
      tags: ["Nutrition", "Health"],
      title: "Hazelnuts Benefits: Superfood Secrets for Fitness Goals",
      description: "Maati Munch Hazelnuts are nuts powerhouse brimming with healthy fats, protein, and vitamins that make them a superstar snack for fitness enthusiasts...",
    }
  ];
  // Show only first 3 blogs
  const displayBlogs = blogs.slice(0, 3);

  return (
    <div className="bg-[#f1f8fa] pt-16 px-6 w-full">
      {/* Section Heading */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
       
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Our Recent Blogs
        </h2>
        <p className="text-gray-700 mt-4 text-base md:text-lg">
        We offer a diverse range of blogs covering nutrition, health tips and more. 
          Get inspired and discover the power of healthy eating with 
          us.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {displayBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <Link to={`/blog/${blog.id}`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Content */}
            <div className="p-5">
              <Link to={`/blog/${blog.id}`}>
                <h3 className="font-semibold text-lg text-gray-900 mb-4 hover:text-[#5a2550] transition">
                  {blog.title}
                </h3>
              </Link>
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block px-4 py-2 bg-[#6B2D5C] text-white text-sm font-medium rounded-full hover:bg-[#5a2550] transition"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <Link
          to="/blog"
          className="inline-block px-6 py-3 bg-[#6B2D5C] text-white rounded-full hover:bg-[#5a2550] transition font-medium"
        >
          Load More
        </Link>
      </div>
    </div>
  );
};

export default RecentBlogs;