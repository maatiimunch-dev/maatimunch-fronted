// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Component mount hone pe cart fetch karo
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    }
  }, []);

  // Backend se cart fetch karo
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) return;

      const response = await api.get(`/products/${user._id}`);
      
      // Backend response ko frontend format me convert karo
      const cartItems = response.data.cart || [];
      const formattedCart = cartItems.map(item => ({
        _id: item.productId._id,
        id: item.productId._id, // compatibility ke liye
        name: item.productId.name,
        price: item.productId.price,
        image: item.productId.images?.[0]?.url || '/placeholder-image.jpg',
        images: item.productId.images,
        description: item.productId.description,
        bestSeller: item.productId.bestSeller,
        quantity: item.quantity
      }));
      
      setCart(formattedCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Agar error aaye to empty cart set karo
      setCart([]);
    }
  };

  // Cart me product add karo
  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      
      // Agar user logged in nahi hai, to local storage me save karo
      if (!token) {
        setCart(prev => {
          const existing = prev.find(item => item._id === product._id);
          if (existing) {
            return prev.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prev, { 
            ...product, 
            id: product._id,
            image: product.images?.[0]?.url || '/placeholder-image.jpg',
            quantity 
          }];
        });
        
        // Success message
        alert('Product added to cart!');
        return;
      }

      // Backend API call
      setLoading(true);
      await api.post('/products/add-to-cart', {
        productId: product._id,
        quantity: quantity
      });

      // Cart refresh karo
      await fetchCart();
      
      // Success message
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Cart se product remove karo
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      
      // Agar user logged in nahi hai
      if (!token) {
        setCart(prev => prev.filter(item => item._id !== productId && item.id !== productId));
        return;
      }

      // Backend API call
      setLoading(true);
      await api.delete('/products/remove', {
        data: { productId }
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
      
      // Agar user logged in nahi hai
      if (!token) {
        setCart(prev =>
          prev.map(item => 
            (item._id === productId || item.id === productId) 
              ? { ...item, quantity } 
              : item
          )
        );
        return;
      }

      // Backend API call
      setLoading(true);
      await api.put('/products/update', {
        productId,
        quantity
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
      
      // Agar user logged in nahi hai
      if (!token) {
        setCart([]);
        return;
      }

      // Backend API call
      setLoading(true);
      await api.delete('/products/clear');
      
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
      fetchCart // Cart refresh karne ke liye
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