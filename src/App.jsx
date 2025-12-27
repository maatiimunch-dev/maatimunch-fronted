// import React from 'react'
// import {  Routes, Route } from "react-router-dom";
// import ScrollToTop from './lib/ScrollToTop'
// import Homepage from './component/pages/homepage/Homepage'
// import Layout from './component/pages/layout/Layout'
// import Login from './component/ui/login/Login';
// import Products from './component/ui/shop/page/Products';
// import ProductDetail from './component/ui/shop/page/ProductDetail';
// import ShopPage from './component/ui/shop/ShopPage';
// import Cart from './component/ui/shop/page/Cart';
// import Checkout from './component/ui/shop/page/Checkout';
// import OrderSuccess from './component/ui/shop/page/OrderSuccess';
// import Blog from './component/ui/blog/Blog';
// import BlogDetail from './component/ui/blog/BlogDetail';

// function App() {
//   return (
//        <>
//    <Layout>
//     <ScrollToTop />
//     <Routes>
//     <Route path='/' element={<Homepage />} />
//     <Route path='/login' element={<Login />} />
//     <Route path='/shop' element={<ShopPage />} />
//       <Route path="/" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//                   <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/order-success" element={<OrderSuccess />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/blog/:id" element={<BlogDetail />} />
//     </Routes>
//    </Layout>
//    </>
//   )
// }

// export default App




import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ScrollToTop from "./lib/ScrollToTop";
import Layout from "./component/pages/layout/Layout";

// Pages
import Homepage from "./component/pages/homepage/Homepage";
import Login from "./component/ui/login/Login";
import ShopPage from "./component/ui/shop/ShopPage";
import Products from "./component/ui/shop/page/Products";
import ProductDetail from "./component/ui/shop/page/ProductDetail";
import Cart from "./component/ui/shop/page/Cart";
import Checkout from "./component/ui/shop/page/Checkout";
import OrderSuccess from "./component/ui/shop/page/OrderSuccess";
import Blog from "./component/ui/blog/Blog";
import BlogDetail from "./component/ui/blog/BlogDetail";

// Context
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Register from "./component/ui/login/Register";
import Contact from "./component/ui/contact/Contact";
import MyOrders from "./component/ui/myOrder/MyOrders";
import AboutUs from "./component/ui/about/AboutUs";
import PrivacyPolicy from "./component/ui/policies/PrivacyPolicy";
import ShippingPolicy from "./component/ui/policies/ShippingPolicy";
import TermsConditions from "./component/ui/policies/TermsConditions";
import CancellationRefundPolicy from "./component/ui/policies/CancellationRefundPolicy";

/* =========================
   🔐 Protected Route
========================= */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />

        <Layout>
          <Routes>
            {/* ---------- Public Routes ---------- */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register key="register" />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy policy" element={<PrivacyPolicy />} />
            <Route path="/shipping policy" element={<ShippingPolicy />} />
            <Route path="/terms conditions" element={<TermsConditions />} />
            <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />

            {/* ---------- Protected Routes ---------- */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />

            {/* ---------- Fallback ---------- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
