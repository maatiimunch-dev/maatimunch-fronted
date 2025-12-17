// // Checkout.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, MapPin, Phone, Mail, CreditCard, Wallet, Building2 } from 'lucide-react';
// import { useCart } from '../../context/CartContext';

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart, cartTotal, clearCart } = useCart();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     paymentMethod: 'cod'
//   });

//   const [errors, setErrors] = useState({});

//   const deliveryCharge = cartTotal >= 1499 ? 0 : 50;
//   const finalTotal = cartTotal + deliveryCharge;

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items in Cart</h2>
//             <p className="text-gray-600 mb-6">Add some products to checkout!</p>
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

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = 'Phone number must be 10 digits';
//     }
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.state.trim()) newErrors.state = 'State is required';
//     if (!formData.pincode.trim()) {
//       newErrors.pincode = 'Pincode is required';
//     } else if (!/^\d{6}$/.test(formData.pincode)) {
//       newErrors.pincode = 'Pincode must be 6 digits';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       clearCart();
//       navigate('/order-success', { 
//         state: { 
//           orderDetails: {
//             ...formData,
//             items: cart,
//             total: finalTotal,
//             orderId: `ORD${Date.now()}`
//           }
//         }
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
//       <div className="max-w-6xl mx-auto">
//         <button 
//           onClick={() => navigate('/cart')}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Back to Cart
//         </button>

//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="grid lg:grid-cols-3 gap-6">
//             {/* Left: Delivery & Payment Info */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Delivery Address */}
//               <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-purple-900" />
//                   Delivery Address
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       className={`w-full border rounded-md px-3 py-2 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="Enter your full name"
//                     />
//                     {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Email *
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`w-full border rounded-md px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="your@email.com"
//                       />
//                       {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Phone Number *
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className={`w-full border rounded-md px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="10-digit mobile number"
//                       />
//                       {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Address *
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="3"
//                       className={`w-full border rounded-md px-3 py-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//                       placeholder="House No., Building Name, Street"
//                     />
//                     {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//                   </div>

//                   <div className="grid md:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         City *
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className={`w-full border rounded-md px-3 py-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="City"
//                       />
//                       {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         State *
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         className={`w-full border rounded-md px-3 py-2 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="State"
//                       />
//                       {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Pincode *
//                       </label>
//                       <input
//                         type="text"
//                         name="pincode"
//                         value={formData.pincode}
//                         onChange={handleChange}
//                         className={`w-full border rounded-md px-3 py-2 ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
//                         placeholder="6-digit pincode"
//                       />
//                       {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <CreditCard className="w-5 h-5 text-purple-900" />
//                   Payment Method
//                 </h2>

//                 <div className="space-y-3">
//                   <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="cod"
//                       checked={formData.paymentMethod === 'cod'}
//                       onChange={handleChange}
//                       className="w-4 h-4"
//                     />
//                     <Wallet className="w-5 h-5 text-gray-600" />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">Cash on Delivery</p>
//                       <p className="text-xs text-gray-600">Pay when you receive</p>
//                     </div>
//                   </label>

//                   <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="upi"
//                       checked={formData.paymentMethod === 'upi'}
//                       onChange={handleChange}
//                       className="w-4 h-4"
//                     />
//                     <Building2 className="w-5 h-5 text-gray-600" />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">UPI / QR Code</p>
//                       <p className="text-xs text-gray-600">Pay via Google Pay, PhonePe, Paytm</p>
//                     </div>
//                   </label>

//                   <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="card"
//                       checked={formData.paymentMethod === 'card'}
//                       onChange={handleChange}
//                       className="w-4 h-4"
//                     />
//                     <CreditCard className="w-5 h-5 text-gray-600" />
//                     <div className="flex-1">
//                       <p className="font-medium text-gray-900">Credit / Debit Card</p>
//                       <p className="text-xs text-gray-600">Secure payment gateway</p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Right: Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-24">
//                 <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

//                 <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
//                   {cart.map(item => (
//                     <div key={item.id} className="flex gap-3 text-sm">
//                       <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-gray-50 rounded" />
//                       <div className="flex-1">
//                         <p className="text-gray-900 line-clamp-1">{item.name}</p>
//                         <p className="text-gray-600">Qty: {item.quantity}</p>
//                       </div>
//                       <p className="font-semibold">₹{item.price * item.quantity}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="border-t pt-3 space-y-2 mb-4">
//                   <div className="flex justify-between text-gray-700">
//                     <span>Subtotal</span>
//                     <span>₹{cartTotal}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-700">
//                     <span>Delivery</span>
//                     <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
//                       {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
//                     <span>Total</span>
//                     <span>₹{finalTotal}</span>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors"
//                 >
//                   Place Order
//                 </button>

//                 <p className="text-xs text-gray-600 text-center mt-3">
//                   By placing this order, you agree to our Terms & Conditions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



// src/components/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Wallet, Building2, Loader } from 'lucide-react';
import { useCart } from '../../../../context/CartContext';
import api from '../../../../utils/api';
const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'razorpay'
  });

  const [errors, setErrors] = useState({});

  const deliveryCharge = cartTotal >= 1499 ? 0 : 50;
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Items in Cart</h2>
            <p className="text-gray-600 mb-6">Add some products to checkout!</p>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    const options = {
      key: 'rzp_test_RsLcd6kPaDcNq1',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Maati Munch',
      description: 'Order Payment',
      order_id: orderData.razorpayOrderId,
      handler: async function (response) {
        try {
          // Payment verification
          const verifyResponse = await api.post('/payments/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResponse.data.success) {
            clearCart();
            navigate('/order-success', { 
              state: { 
                orderDetails: {
                  ...formData,
                  items: cart,
                  total: finalTotal,
                  orderId: orderData.orderId,
                  paymentId: response.razorpay_payment_id
                }
              }
            });
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          alert('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#581c87'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Prepare order items
      const items = cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      // Create order
      const orderResponse = await api.post('/payments/create-order', {
        items: items,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        totalAmount: cartTotal,
        shippingCharges: deliveryCharge,
        finalAmount: finalTotal
      });

      if (formData.paymentMethod === 'razorpay') {
        // Razorpay payment
        await handleRazorpayPayment(orderResponse.data);
      } else if (formData.paymentMethod === 'cod') {
        // Cash on Delivery
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderDetails: {
              ...formData,
              items: cart,
              total: finalTotal,
              orderId: orderResponse.data.orderId,
              paymentMethod: 'cod'
            }
          }
        });
      }

    } catch (error) {
      console.error('Order creation failed:', error);
      alert(error.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Delivery & Payment Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-900" />
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full border rounded-md px-3 py-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="House No., Building Name, Street"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="City"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="State"
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full border rounded-md px-3 py-2 ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="6-digit pincode"
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-900" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === 'razorpay'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Razorpay (UPI / Card / Wallet)</p>
                      <p className="text-xs text-gray-600">Pay securely via Razorpay</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Wallet className="w-5 h-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Cash on Delivery</p>
                      <p className="text-xs text-gray-600">Pay when you receive</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item._id || item.id} className="flex gap-3 text-sm">
                      <img 
                        src={item.image || item.images?.[0]?.url || '/placeholder-image.jpg'} 
                        alt={item.name} 
                        className="w-12 h-12 object-contain bg-gray-50 rounded"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center mt-3">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;