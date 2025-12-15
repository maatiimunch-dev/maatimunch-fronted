// Products.jsx
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../data/data';
import { SlidersHorizontal, X } from 'lucide-react';

const Products = () => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 2000 },
    discountRange: { min: 0, max: 100 },
    availability: 'all',
    badges: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter products based on filters
  const filteredProducts = productsData.filter(product => {
    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    
    // Price filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }
    
    // Discount filter
    if (discount < filters.discountRange.min || discount > filters.discountRange.max) {
      return false;
    }
    
    // Availability filter
    if (filters.availability === 'inStock' && !product.inStock) {
      return false;
    }
    if (filters.availability === 'outOfStock' && product.inStock) {
      return false;
    }
    
    // Badge filter
    if (filters.badges.length > 0) {
      const hasBadge = filters.badges.some(badge => {
        if (badge === 'BESTSELLER') return product.badge === 'BESTSELLER';
        if (badge === 'TRENDING') return product.trending;
        if (badge === 'VALUE OFFER') return product.valueOffer;
        return false;
      });
      if (!hasBadge) return false;
    }
    
    return true;
  });

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: parseInt(value) || 0 }
    }));
  };

  const handleDiscountChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      discountRange: { ...prev.discountRange, [type]: parseInt(value) || 0 }
    }));
  };

  const handleBadgeToggle = (badge) => {
    setFilters(prev => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter(b => b !== badge)
        : [...prev.badges, badge]
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 2000 },
      discountRange: { min: 0, max: 100 },
      availability: 'all',
      badges: []
    });
  };

  const FilterSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h2>
        <button 
          onClick={resetFilters}
          className="text-sm text-purple-900 hover:text-purple-700 font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            <span className="text-gray-400 mt-6">-</span>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  placeholder="2000"
                />
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            ₹{filters.priceRange.min} - ₹{filters.priceRange.max}
          </div>
        </div>
      </div>

      {/* Discount Range Filter */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-gray-900 mb-4">Discount Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Min %</label>
              <input
                type="number"
                value={filters.discountRange.min}
                onChange={(e) => handleDiscountChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
            <span className="text-gray-400 mt-6">-</span>
            <div className="flex-1">
              <label className="text-xs text-gray-600 mb-1 block">Max %</label>
              <input
                type="number"
                value={filters.discountRange.max}
                onChange={(e) => handleDiscountChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                placeholder="100"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {filters.discountRange.min}% - {filters.discountRange.max}% off
          </div>
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'all'}
              onChange={() => setFilters(prev => ({ ...prev, availability: 'all' }))}
              className="w-4 h-4 text-purple-900 focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">All Products</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'inStock'}
              onChange={() => setFilters(prev => ({ ...prev, availability: 'inStock' }))}
              className="w-4 h-4 text-purple-900 focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === 'outOfStock'}
              onChange={() => setFilters(prev => ({ ...prev, availability: 'outOfStock' }))}
              className="w-4 h-4 text-purple-900 focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">Out of Stock</span>
          </label>
        </div>
      </div>

      {/* Badge Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Product Tags</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.badges.includes('BESTSELLER')}
              onChange={() => handleBadgeToggle('BESTSELLER')}
              className="w-4 h-4 text-purple-900 rounded focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">Bestseller</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.badges.includes('TRENDING')}
              onChange={() => handleBadgeToggle('TRENDING')}
              className="w-4 h-4 text-purple-900 rounded focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.badges.includes('VALUE OFFER')}
              onChange={() => handleBadgeToggle('VALUE OFFER')}
              className="w-4 h-4 text-purple-900 rounded focus:ring-purple-900"
            />
            <span className="text-sm text-gray-700">Value Offer</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Dry Fruits & Nuts</h1>
          <p className="text-gray-600">Handpicked quality products for your health</p>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="lg:hidden mb-4 w-full bg-white py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-semibold text-gray-900"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex gap-8">
          {/* Desktop Filters - Left Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterSection />
          </aside>

          {/* Mobile Filters - Modal */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
              <div className="bg-white w-80 h-full overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {productsData.length} products
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your filters</p>
                <button
                  onClick={resetFilters}
                  className="bg-purple-900 text-white px-6 py-2 rounded-md hover:bg-purple-800"
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