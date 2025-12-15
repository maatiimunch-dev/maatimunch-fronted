// OrderSuccess.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Phone, Mail } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          
          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-xl font-bold text-purple-900">{orderDetails.orderId}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-purple-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/track-order')}
              className="bg-white border-2 border-purple-900 text-purple-900 px-6 py-3 rounded-md font-semibold hover:bg-purple-50 transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-900" />
            Order Details
          </h2>

          <div className="space-y-3 mb-4">
            {orderDetails.items.map(item => (
              <div key={item.id} className="flex gap-4 pb-3 border-b last:border-b-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-gray-50 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                  <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{orderDetails.total - (orderDetails.total >= 1499 ? 0 : 50)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Charges</span>
              <span className={orderDetails.total >= 1499 ? 'text-green-600' : ''}>
                {orderDetails.total >= 1499 ? 'FREE' : '₹50'}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
              <span>Total Amount</span>
              <span>₹{orderDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-900" />
            Delivery Address
          </h2>

          <div className="space-y-3">
            <div>
              <p className="font-semibold text-gray-900">{orderDetails.fullName}</p>
            </div>
            
            <div className="text-sm text-gray-700 space-y-1">
              <p>{orderDetails.address}</p>
              <p>{orderDetails.city}, {orderDetails.state} - {orderDetails.pincode}</p>
            </div>

            <div className="space-y-2 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{orderDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{orderDetails.email}</span>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg mt-4">
              <p className="text-sm font-medium text-green-800">
                Payment Method: {orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                                 orderDetails.paymentMethod === 'upi' ? 'UPI Payment' : 
                                 'Card Payment'}
              </p>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mt-6 rounded">
          <p className="text-sm font-medium text-orange-800">
            🚚 Estimated Delivery: 3-5 Business Days
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;