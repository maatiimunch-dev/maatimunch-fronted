import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    if (id) {
      fetchBlogDetail();
    } else {
      setError('No blog ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
     
      
      // Using the single/:id endpoint
      const url = `https://maatimunch-backend.onrender.com/api/blogs/single/${id}`;
    
      
      const response = await fetch(url);
      
   
      
      if (!response.ok) {
        throw new Error(`Blog not found (Status: ${response.status})`);
      }
      
      const data = await response.json();
    
      
      // Handle different response formats
      if (data._id) {
        // Direct blog object
        setBlog(data);
      } else if (data.blog) {
        // Wrapped in blog key
        setBlog(data.blog);
      } else if (data.data) {
        // Wrapped in data key
        setBlog(data.data);
      } else {
       
        throw new Error('Invalid response format');
      }
      
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blog detail:', err);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this blog';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f8fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B2D5C] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#f1f8fa] flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Blog Not Found</h3>
          <p className="text-gray-600 mb-2">{error || 'The blog you are looking for does not exist.'}</p>
          {id && <p className="text-sm text-gray-500 mb-4">Blog ID: {id}</p>}
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/blog')}
              className="inline-block px-6 py-2 bg-[#6B2D5C] text-white rounded-full hover:bg-[#5a2550] transition font-medium"
            >
              Back to Blogs
            </button>
            <button
              onClick={fetchBlogDetail}
              className="inline-block px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f8fa] py-12 px-6">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-[#6B2D5C] hover:text-[#5a2550] font-medium transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </button>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Featured Image */}
        {blog.image && blog.image.url && (
          <div className="w-full h-96 overflow-hidden bg-gray-100">
            <img
              src={blog.image.url}
              alt={blog.title || 'Blog image'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x400/6B2D5C/ffffff?text=Blog+Image';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Meta Info */}
          {blog.createdAt && (
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(blog.createdAt)}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title || 'Untitled Blog'}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {blog.description || 'No description available.'}
            </p>
          </div>

          {/* Tags if available */}
          {blog.slug && (
            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Slug:</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {blog.slug}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-8"></div>

          {/* Share Section */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="w-10 h-10 rounded-full bg-[#f1f8fa] hover:bg-[#6B2D5C] hover:text-white text-gray-700 flex items-center justify-center transition"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="w-10 h-10 rounded-full bg-[#f1f8fa] hover:bg-[#6B2D5C] hover:text-white text-gray-700 flex items-center justify-center transition"
                  aria-label="Share on Twitter"
                  title="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="w-10 h-10 rounded-full bg-[#f1f8fa] hover:bg-[#6B2D5C] hover:text-white text-gray-700 flex items-center justify-center transition"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-2 bg-[#6B2D5C] text-white rounded-full hover:bg-[#5a2550] transition font-medium cursor-pointer"
            >
              View All Blogs
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;