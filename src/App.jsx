import React from 'react'
import {  Routes, Route } from "react-router-dom";
import ScrollToTop from './lib/ScrollToTop'
import Homepage from './component/pages/homepage/Homepage'
import Layout from './component/pages/layout/Layout'
import Login from './component/ui/login/Login';

function App() {
  return (
       <>
   <Layout>
    <ScrollToTop />
    <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/login' element={<Login />} />
    </Routes>
   </Layout>
   </>
  )
}

export default App