// src/components/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Loader, 
  ChevronRight, 
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Search
} from 'lucide-react';
import api from '../../../utils/api';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payments/orders');
      
      if (response.data.success) {
        setOrders(response.data.data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-indigo-600" />;
      case 'pending':
      case 'confirmed':
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && order.status === 'delivered') ||
      (filter === 'pending' && ['pending', 'confirmed', 'processing', 'shipped'].includes(order.status)) ||
      (filter === 'cancelled' && order.status === 'cancelled');

    const matchesSearch = 
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingAddress.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center mb-16 md:mb-0">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#6B2D5C] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 mb-16 md:mb-0">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Orders</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchOrders}
              className="bg-[#6B2D5C] text-white px-6 py-2 rounded-md hover:bg-[#6f4163]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-4 mb-16 md:mb-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B2D5C]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'completed', 'cancelled'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-[#6B2D5C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h2>
            <p className="text-gray-600 mb-6">
              {filter !== 'all' 
                ? `You don't have any ${filter} orders yet.`
                : "You haven't placed any orders yet."
              }
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#6B2D5C] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div 
                key={order._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-4 md:px-6 py-4 border-b">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-semibold text-gray-900">{order._id}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'completed' ? 'Paid' : order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-4 md:p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Products */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3">
                            <img
                              src={item.productId?.images?.[0]?.url || '/placeholder-image.jpg'}
                              alt={item.name}
                              className="w-16 h-16 object-contain bg-gray-50 rounded"
                              onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              <p className="text-sm font-semibold text-gray-900">₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-4">
                      {/* Date */}
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order Date</p>
                          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Payment Method</p>
                          <p className="text-sm text-gray-600">
                            {order.paymentMethod === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                          </p>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.name}
                            <br />
                            {order.shippingAddress.address}
                            <br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Subtotal</span>
                          <span className="text-sm font-medium">₹{order.totalAmount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Shipping</span>
                          <span className="text-sm font-medium">
                            {order.shippingCharges === 0 ? 'FREE' : `₹${order.shippingCharges}`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-base font-semibold text-gray-900">Total</span>
                          <span className="text-lg font-bold text-[#6B2D5C]">₹{order.finalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  {/* <button
                    onClick={() => navigate(`/order/${order._id}`)}
                    className="w-full mt-6 bg-[#6B2D5C] text-white py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors flex items-center justify-center gap-2"
                  >
                    View Details
                    <ChevronRight className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;