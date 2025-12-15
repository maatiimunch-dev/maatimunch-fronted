import React from 'react'
import {  Routes, Route } from "react-router-dom";
import ScrollToTop from './lib/ScrollToTop'
import Homepage from './component/pages/homepage/Homepage'
import Layout from './component/pages/layout/Layout'
import Login from './component/ui/login/Login';
import Products from './component/ui/shop/page/Products';
import ProductDetail from './component/ui/shop/page/ProductDetail';
import ShopPage from './component/ui/shop/ShopPage';
import Cart from './component/ui/shop/page/Cart';
import Checkout from './component/ui/shop/page/Checkout';
import OrderSuccess from './component/ui/shop/page/OrderSuccess';

function App() {
  return (
       <>
   <Layout>
    <ScrollToTop />
    <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/login' element={<Login />} />
    <Route path='/shop' element={<ShopPage />} />
      <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
   </Layout>
   </>
  )
}

export default App