// src/components/page/Products.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, X, Loader } from 'lucide-react';
import api from '../../../../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    bestSeller: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products/fetch');
      
      // ✅ Fixed: Check different possible response structures
      let productList = [];
      
      if (Array.isArray(response.data)) {
        productList = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        productList = response.data.data;
      } else if (response.data.products && Array.isArray(response.data.products)) {
        productList = response.data.products;
      }
     
      setProducts(productList);
      setError(null);
    } catch (err) {
      setError('Products load nahi ho paye. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!Array.isArray(products) || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];
    
    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );
    
    // Best seller filter
    if (filters.bestSeller) {
      filtered = filtered.filter((p) => p.bestSeller === true);
    }
    
    setFilteredProducts(filtered);
  };

  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: parseInt(value) || 0 }
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      bestSeller: false
    });
  };

  const FilterSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal size={20} />
          Filters
        </h3>
        <button
          onClick={resetFilters}
          className="text-[#6B2D5C] hover:text-[#a86a99] font-medium text-sm"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="0"
              />
            </div>
          </div>
          <span className="text-gray-400 mt-6">-</span>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="10000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Best Seller Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Product Tags</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.bestSeller}
            onChange={(e) => setFilters(prev => ({ ...prev, bestSeller: e.target.checked }))}
            className="w-4 h-4 text-[#6B2D5C] rounded"
          />
          <span className="text-gray-700">Best Seller</span>
        </label>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-[#6B2D5C]" size={40} />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-[#6B2D5C] text-white px-6 py-2 rounded-md hover:bg-[#a86a99]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" text-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Premium Dry Fruits & Nuts</h1>
          <p className="">Handpicked quality products for your health</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden mb-4 w-full bg-white py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-semibold text-gray-900"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSection />
          </div>

          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
              <div className="bg-white h-full w-80 max-w-full overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSection />
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#6B2D5C] text-white px-6 py-2 rounded-md hover:bg-[#a86a99]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;