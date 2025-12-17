// // Cart.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
// import { useCart } from '../../context/CartContext';

// const Cart = () => {
//   const navigate = useNavigate();
//   const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

//   const deliveryCharge = cartTotal >= 1499 ? 0 : 50;
//   const finalTotal = cartTotal + deliveryCharge;

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
//         <div className="max-w-6xl mx-auto">
//           <button 
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Shopping
//           </button>
          
//           <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
//             <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
//             <p className="text-gray-600 mb-6">Add some products to get started!</p>
//             <button
//               onClick={() => navigate('/')}
//               className="bg-purple-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors"
//             >
//               Start Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
//       <div className="max-w-6xl mx-auto">
//         <button 
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Continue Shopping
//         </button>

//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md">
//               {cart.map((item) => {
//                 const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);
//                 return (
//                   <div key={item.id} className="p-4 border-b last:border-b-0">
//                     <div className="flex gap-4">
//                       {/* Product Image */}
//                       <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg flex-shrink-0 p-2">
//                         <img 
//                           src={item.image} 
//                           alt={item.name}
//                           className="w-full h-full object-contain cursor-pointer"
//                           onClick={() => navigate(`/product/${item.id}`)}
//                         />
//                       </div>

//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0">
//                         <h3 
//                           className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-900"
//                           onClick={() => navigate(`/product/${item.id}`)}
//                         >
//                           {item.name}
//                         </h3>
                        
//                         <div className="flex items-baseline gap-2 mb-3 flex-wrap">
//                           <span className="text-lg md:text-xl font-bold text-gray-900">₹{item.price}</span>
//                           <span className="text-sm text-gray-400 line-through">₹{item.mrp}</span>
//                           {discount > 0 && (
//                             <span className="text-xs text-green-600 font-semibold">{discount}% OFF</span>
//                           )}
//                         </div>

//                         <div className="flex items-center justify-between flex-wrap gap-3">
//                           {/* Quantity Controls */}
//                           <div className="flex items-center gap-2 border border-gray-300 rounded-md">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-semibold"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <span className="w-8 text-center font-semibold">{item.quantity}</span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-semibold"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>

//                           {/* Remove Button */}
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
//               <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
//               <div className="space-y-3 mb-4">
//                 <div className="flex justify-between text-gray-700">
//                   <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
//                   <span className="font-semibold">₹{cartTotal}</span>
//                 </div>
                
//                 <div className="flex justify-between text-gray-700">
//                   <span>Delivery Charges</span>
//                   <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
//                     {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
//                   </span>
//                 </div>

//                 {cartTotal < 1499 && (
//                   <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
//                     Add ₹{1499 - cartTotal} more to get FREE delivery!
//                   </p>
//                 )}
                
//                 <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
//                   <span>Total Amount</span>
//                   <span>₹{finalTotal}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={() => navigate('/checkout')}
//                 className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
//               >
//                 Proceed to Checkout
//               </button>

//               <div className="mt-4 space-y-2">
//                 <div className="flex items-center gap-2 text-xs text-gray-600">
//                   <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                   </svg>
//                   Safe and Secure Payments
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-gray-600">
//                   <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                   </svg>
//                   Easy Returns & Refunds
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// src/components/Cart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotal, loading } = useCart();

  const deliveryCharge = cartTotal >= 1499 ? 0 : 50;
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shopping
          </button>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cart.map((item) => {
                return (
                  <div key={item._id || item.id} className="p-4 border-b last:border-b-0">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-lg flex-shrink-0 p-2">
                        <img 
                          src={item.image || item.images?.[0]?.url || '/placeholder-image.jpg'} 
                          alt={item.name}
                          className="w-full h-full object-contain cursor-pointer"
                          onClick={() => navigate(`/product/${item._id || item.id}`)}
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-purple-900"
                          onClick={() => navigate(`/product/${item._id || item.id}`)}
                        >
                          {item.name}
                        </h3>
                        
                        <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                          <span className="text-lg md:text-xl font-bold text-gray-900">₹{item.price}</span>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                              disabled={loading}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-semibold disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                              disabled={loading}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 font-semibold disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item._id || item.id)}
                            disabled={loading}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">₹{cartTotal}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Charges</span>
                  <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                {cartTotal < 1499 && (
                  <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                    Add ₹{1499 - cartTotal} more to get FREE delivery!
                  </p>
                )}
                
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Safe and Secure Payments
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Easy Returns & Refunds
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;