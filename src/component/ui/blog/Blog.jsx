import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/blogs/fetch');
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data.blogs && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else if (data.data && Array.isArray(data.data)) {
        setBlogs(data.data);
      } else {
        console.log('Response format:', data);
        setBlogs([]);
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f8fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B2D5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f1f8fa] flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Blogs</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-6 py-2 bg-[#6B2D5C] text-white rounded-full hover:bg-[#5a2550] transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f8fa] py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Blog
        </h1>
        <p className="text-gray-700 text-base md:text-lg">
          Explore our collection of articles on nutrition, health tips, and wellness. 
          Stay informed and inspired on your journey to better health.
        </p>
      </div>

      {/* Blog Grid */}
      {!blogs || blogs.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blogs Yet</h3>
          <p className="text-gray-500">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image - Now using ID instead of slug */}
              <Link to={`/blog/${blog._id}`}>
                <div className="overflow-hidden h-56">
                  <img
                    src={blog.image?.url || 'https://via.placeholder.com/400x300?text=Blog+Image'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Blog+Image';
                    }}
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(blog.createdAt)}
                </div>

                {/* Title */}
                <Link to={`/blog/${blog._id}`}>
                  <h3 className="font-bold text-xl text-gray-900 mb-3 hover:text-[#6B2D5C] transition line-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.description}
                </p>

                {/* Read More Button - Now using ID */}
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-flex items-center px-5 py-2 bg-[#6B2D5C] text-white text-sm font-medium rounded-full hover:bg-[#5a2550] transition group cursor-pointer"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;