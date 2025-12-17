

// // ProductDetail.jsx
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Star, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
// import { productsData } from '../data/data';
// import { useCart } from '../../context/CartContext';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const product = productsData.find(p => p.id === parseInt(id));

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
//           <button 
//             onClick={() => navigate('/')}
//             className="bg-purple-900 text-white px-6 py-2 rounded-md"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

//   const handleAddToCart = () => {
//     addToCart(product, quantity);
//   };

//   const handleBuyNow = () => {
//     addToCart(product, quantity);
//     navigate('/checkout');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
//       <div className="max-w-6xl mx-auto">
//         {/* Back Button */}
//         <button 
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to Products
//         </button>

//         <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
//           <div className="grid md:grid-cols-2 gap-4 md:gap-8">
//             {/* Left - Images */}
//             <div>
//               <div className="bg-gray-50 rounded-lg p-4 md:p-8 mb-4 relative">
//                 {discount > 0 && (
//                   <div className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded">
//                     {discount}% OFF
//                   </div>
//                 )}
//                 <img 
//                   src={product.images[selectedImage]} 
//                   alt={product.name}
//                   className="w-full h-64 md:h-96 object-contain"
//                 />
//               </div>
              
//               {/* Thumbnail Images */}
//               <div className="flex gap-2 overflow-x-auto">
//                 {product.images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`border-2 rounded-lg p-2 w-16 h-16 md:w-20 md:h-20 flex-shrink-0 transition-all ${
//                       selectedImage === idx ? 'border-purple-900' : 'border-gray-200'
//                     }`}
//                   >
//                     <img src={img} alt="" className="w-full h-full object-contain" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Right - Details */}
//             <div>
//               {/* Brand and Badge */}
//               <div className="flex items-center gap-2 mb-2 flex-wrap">
//                 <span className="text-sm font-semibold text-gray-800">Maati Munch</span>
//                 {product.badge && (
//                   <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     {product.badge}
//                   </span>
//                 )}
//                 {product.trending && (
//                   <span className="bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     TRENDING
//                   </span>
//                 )}
//               </div>

//               {/* Product Name */}
//               <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

//               {/* Rating */}
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex items-center bg-purple-900 text-white px-3 py-1 rounded">
//                   <Star className="w-4 h-4 fill-white mr-1" />
//                   {product.rating}
//                 </div>
//                 <span className="text-sm text-gray-600">{product.reviews} Reviews</span>
//               </div>

//               {/* Price Section */}
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <div className="flex items-baseline gap-2 md:gap-3 mb-2 flex-wrap">
//                   <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{product.price}</span>
//                   <span className="text-base md:text-lg text-gray-400 line-through">₹{product.mrp}</span>
//                   <span className="text-green-600 font-semibold text-sm md:text-base">{discount}% OFF</span>
//                 </div>
//                 <p className="text-sm text-gray-600">{product.pricePerUnit}</p>
//                 <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
//               </div>

//               {/* Quantity Selector */}
//               <div className="mb-6">
//                 <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantity</label>
//                 <div className="flex items-center gap-3">
//                   <button 
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 font-semibold"
//                   >
//                     -
//                   </button>
//                   <span className="w-12 text-center font-semibold">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 font-semibold"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col md:flex-row gap-3 mb-6">
//                 <button 
//                   onClick={handleAddToCart}
//                   className="flex-1 bg-purple-900 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
//                 >
//                   <ShoppingCart className="w-5 h-5" />
//                   Add to Cart
//                 </button>
//                 <button 
//                   onClick={handleBuyNow}
//                   className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
//                 >
//                   Buy Now
//                 </button>
//               </div>

//               {/* Features */}
//               <div className="border-t pt-6">
//                 <h3 className="font-semibold text-gray-900 mb-4">Why Choose This Product?</h3>
//                 <div className="space-y-3">
//                   <div className="flex items-start gap-3">
//                     <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
//                       <Shield className="w-5 h-5 text-green-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">Premium Quality</p>
//                       <p className="text-xs text-gray-600">100% authentic and naturally sourced</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
//                       <Truck className="w-5 h-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">Free Delivery</p>
//                       <p className="text-xs text-gray-600">On orders above ₹500</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
//                       <RotateCcw className="w-5 h-5 text-purple-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">Easy Returns</p>
//                       <p className="text-xs text-gray-600">7 days return policy</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Product Description */}
//               <div className="border-t mt-6 pt-6">
//                 <h3 className="font-semibold text-gray-900 mb-3">Product Description</h3>
//                 <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;




// src/components/page/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft, Loader } from 'lucide-react';
import { useCart } from '../../../../context/CartContext';
import api from '../../../../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/single/${id}`);
      setProduct(response.data.data);
      setError(null);
    } catch (err) {
      setError('Product load nahi ho paya. Please try again.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-900 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-900 text-white px-6 py-2 rounded-md hover:bg-purple-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 
    ? product.images.map(img => img.url)
    : ['/placeholder-image.jpg'];


  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {/* Left - Images */}
            <div>
              <div className="bg-gray-50 rounded-lg p-4 md:p-8 mb-4 relative">
                {product.bestSeller && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded">
                    BESTSELLER
                  </div>
                )}
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-64 md:h-96 object-contain"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              
              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border-2 rounded-lg p-2 w-16 h-16 md:w-20 md:h-20 flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-purple-900' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div>
              {/* Brand and Badge */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-800">Maati Munch</span>
                {product.bestSeller && (
                  <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    BESTSELLER
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-baseline gap-2 md:gap-3 mb-2 flex-wrap">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{product.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 font-semibold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-900 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Choose This Product?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Premium Quality</p>
                      <p className="text-xs text-gray-600">100% authentic and naturally sourced</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-gray-600">On orders above ₹1499</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                      <RotateCcw className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Easy Returns</p>
                      <p className="text-xs text-gray-600">7 days return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="border-t mt-6 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Product Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;