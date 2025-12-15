// // ProductCard.jsx
// import React, { useState } from 'react';
// import { Heart, Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const navigate = useNavigate();
  
//   const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

//   const handleCardClick = () => {
//     navigate(`/product/${product.id}`);
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     alert('Added to cart!');
//   };

//   const handleFavorite = (e) => {
//     e.stopPropagation();
//     setIsFavorite(!isFavorite);
//   };

//   return (
//     <div 
//       onClick={handleCardClick}
//       className="bg-white rounded-lg shadow-md overflow-hidden relative group cursor-pointer transition-transform hover:scale-105"
//     >
//       {/* Badges */}
//       <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
//         {product.badge && (
//           <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
//             {product.badge}
//           </span>
//         )}
//         {product.trending && (
//           <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded">
//             TRENDING
//           </span>
//         )}
//         {product.valueOffer && (
//           <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded">
//             VALUE OFFER
//           </span>
//         )}
//       </div>

//       {/* Discount Badge */}
//       {discount > 0 && (
//         <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
//           {discount}%off
//         </div>
//       )}

//       {/* Product Image */}
//       <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
//         <img 
//           src={product.image} 
//           alt={product.name}
//           className="max-h-full max-w-full object-contain"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-semibold text-gray-800">Maati Munch</span>
//           <div className="flex items-center gap-2">
//             <div className="flex items-center bg-purple-900 text-white px-2 py-1 rounded text-xs">
//               <Star className="w-3 h-3 fill-white mr-1" />
//               {product.rating}
//             </div>
//             <button 
//               onClick={handleFavorite}
//               className="text-gray-400 hover:text-red-500 transition-colors"
//             >
//               <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
//             </button>
//           </div>
//         </div>

//         <h3 className="text-sm text-gray-700 mb-3 line-clamp-2 min-h-[40px]">
//           {product.name}
//         </h3>

//         <div className="flex items-center gap-2 mb-3">
//           <span className="text-xs text-gray-500">MRP:</span>
//           <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
//           <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
//           <span className="text-xs text-gray-500">({product.pricePerUnit})</span>
//         </div>

//         {product.inStock ? (
//           <button 
//             onClick={handleAddToCart}
//             className="w-full bg-purple-900 text-white py-2.5 rounded-md font-semibold hover:bg-purple-800 transition-colors"
//           >
//            Buy Now
//           </button>
//         ) : (
//           <button 
//             onClick={(e) => e.stopPropagation()}
//             className="w-full bg-purple-900 text-white py-2.5 rounded-md font-semibold hover:bg-purple-800 transition-colors"
//           >
//             Notify Me
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;








// ProductCard.jsx
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden relative group cursor-pointer transition-transform hover:scale-105"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.badge && (
          <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
            {product.badge}
          </span>
        )}
        {product.trending && (
          <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded">
            TRENDING
          </span>
        )}
        {product.valueOffer && (
          <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded">
            VALUE OFFER
          </span>
        )}
      </div>

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discount}%off
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-800">Maati Munch</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-purple-900 text-white px-2 py-1 rounded text-xs">
              <Star className="w-3 h-3 fill-white mr-1" />
              {product.rating}
            </div>
            <button 
              onClick={handleFavorite}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>

        <h3 className="text-sm text-gray-700 mb-3 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">MRP:</span>
          <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-500">({product.pricePerUnit})</span>
        </div>

        {product.inStock ? (
          <button 
            onClick={handleAddToCart}
            className="w-full bg-purple-900 text-white py-2.5 rounded-md font-semibold hover:bg-purple-800 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        ) : (
          <button 
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-gray-400 text-white py-2.5 rounded-md font-semibold cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;