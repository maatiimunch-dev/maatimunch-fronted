import React from 'react'
import Home from '../../ui/home/Home'
import MakhanaSlider from '../../ui/slider/MakhanaSlider'
import TopSellingProducts from '../../ui/topSellingProduct/TopSellingProducts'
import FindUsSection from '../../ui/findUs/FindUsSection'
import FaqSection from '../../ui/faq/FaqSection'
import RecentBlogs from '../../ui/blog/RecentBlogs'

const Homepage = () => {
  return (
    <div>
      <Home />
      <MakhanaSlider />
      <TopSellingProducts />
      <FindUsSection />
      <RecentBlogs />
      <FaqSection />
    </div>
  )
}

export default Homepage