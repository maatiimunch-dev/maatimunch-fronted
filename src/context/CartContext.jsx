// src/context/CartContext.jsx - COMPLETE UPDATED VERSION
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Component mount hone pe cart fetch karo
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      fetchCart();
    }
  }, []);

  // Get user ID safely
  const getUserId = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      return user?._id || user?.id || null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  };

  // Backend se cart fetch karo
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!token || !userId) {
        setCart([]);
        return;
      }

      console.log('Fetching cart for userId:', userId);

      // Backend route: GET /products/:userId
      const response = await api.get(`/products/${userId}`);
      
      console.log('Cart response:', response.data);

      if (!response.data.success) {
        setCart([]);
        return;
      }

      // Backend response ko frontend format me convert karo
      const cartItems = response.data.cart || [];
      
      const formattedCart = cartItems.map(item => {
        const productData = item.productId;
        
        return {
          _id: productData._id,
          id: productData._id,
          name: productData.name,
          price: productData.price,
          image: productData.images?.[0]?.url || '/placeholder-image.jpg',
          images: productData.images || [],
          description: productData.description || '',
          bestSeller: productData.bestSeller || false,
          quantity: item.quantity
        };
      });
      
      console.log('Formatted cart:', formattedCart);
      setCart(formattedCart);
      
    } catch (error) {
      console.error('Error fetching cart:', error);
      
      // Agar 404 ya empty cart hai to quietly handle karo
      if (error.response?.status === 404 || error.response?.status === 400) {
        setCart([]);
      } else {
        console.error('Cart fetch failed:', error.response?.data);
      }
    }
  };

  // Cart me product add karo
  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      // Agar user logged in nahi hai
      if (!token || !userId) {
        alert('Please login to add items to cart');
        window.location.href = '/login';
        return;
      }

      setLoading(true);

      console.log('Adding to cart:', { 
        userId, 
        productId: product._id || product.id, 
        quantity 
      });

      // Backend expects: { userId, productId, quantity }
      const response = await api.post('/products/add-to-cart', {
        userId: userId,
        productId: product._id || product.id,
        quantity: quantity
      });

      console.log('Add to cart response:', response.data);

      // Success response check karo
      if (response.data.success || response.status === 200) {
        // Cart refresh karo
        await fetchCart();
        alert('Product added to cart successfully!');
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // Detailed error handling
      if (error.response) {
        const errorMsg = error.response.data?.message || 'Failed to add product to cart';
        alert(errorMsg);
        console.error('Backend error:', error.response.data);
      } else if (error.request) {
        alert('Network error. Please check your connection.');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cart se product remove karo
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!token || !userId) {
        setCart(prev => prev.filter(item => 
          item._id !== productId && item.id !== productId
        ));
        return;
      }

      setLoading(true);
      
      console.log('Removing from cart:', { userId, productId });

      // Backend expects: { userId, productId }
      await api.delete('/products/remove', {
        data: { 
          userId: userId,
          productId: productId
        }
      });

      // Cart refresh karo
      await fetchCart();
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Product ki quantity update karo
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!token || !userId) {
        setCart(prev =>
          prev.map(item => 
            (item._id === productId || item.id === productId) 
              ? { ...item, quantity } 
              : item
          )
        );
        return;
      }

      setLoading(true);
      
      console.log('Updating quantity:', { userId, productId, quantity });

      // Backend expects: { userId, productId, quantity }
      await api.put('/products/update', {
        userId: userId,
        productId: productId,
        quantity: quantity
      });

      // Cart refresh karo
      await fetchCart();
      
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Poora cart clear karo
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = getUserId();
      
      if (!token || !userId) {
        setCart([]);
        return;
      }

      setLoading(true);
      
      console.log('Clearing cart for userId:', userId);

      // Backend expects: { userId }
      await api.delete('/products/clear', {
        data: { userId: userId }
      });
      
      setCart([]);
      
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Error pe bhi cart clear kar do
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Cart me total items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Cart ka total price
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartCount, 
      cartTotal,
      loading,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};