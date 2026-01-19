import React, { useState, useRef, useEffect } from 'react'
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import api from '../../../utils/api'   // path check kar lena

const TopSellingProducts = () => {
  const navigate = useNavigate()
  const scrollRef = useRef(null)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  /* =====================
     FETCH PRODUCTS
  ===================== */
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get('/products/fetch')
   

      let productList = []

      if (Array.isArray(res.data)) {
        productList = res.data
      } else if (Array.isArray(res.data.data)) {
        productList = res.data.data
      } else if (Array.isArray(res.data.products)) {
        productList = res.data.products
      }

     

      setProducts(productList)
    } catch (err) {
      console.error('Top selling fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
}, [])


  /* =====================
     AOS
  ===================== */
  useEffect(() => {
    AOS.init({ duration: 900, once: true })
  }, [])

  /* =====================
     SLIDER LOGIC
  ===================== */
  const itemsPerView = () => {
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 4
  }

  const [itemsVisible, setItemsVisible] = useState(itemsPerView())
  const maxIndex = Math.max(0, products.length - itemsVisible)

  useEffect(() => {
    const onResize = () => setItemsVisible(itemsPerView())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const handleNext = () => setCurrentIndex(i => Math.min(maxIndex, i + 1))

  /* =====================
     STATES
  ===================== */
  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading top selling products...
      </p>
    )
  }

  if (products.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No products found
      </p>
    )
  }


  return (
  <div className="w-full bg-gray-50 py-12 px-4" data-aos="fade-up">
    <div className="max-w-7xl mx-auto">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Top Selling Products
      </h2>

     <div
  className="
    grid 
    grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-4 md:gap-6
  "
>
  {products.slice(0, 5).map((product) => (
    <div
      key={product._id}
      onClick={() => navigate(`/product/${product._id}`)}
      className="
        bg-white rounded-xl md:rounded-2xl 
        shadow 
        hover:shadow-xl 
        transition 
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl md:rounded-t-2xl">
        <img
          src={product.images?.[0]?.url || "/placeholder-image.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />

        {product.bestSeller && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
            BESTSELLER
          </span>
        )}

        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold">Maati Munch</span>

          <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px]">
            <Star className="w-3 h-3 fill-current" />
            5.0
          </div>
        </div>

        <h3 className="text-xs md:text-sm mb-2 line-clamp-2 text-gray-800">
          {product.name}
        </h3>

        <span className="text-base md:text-lg font-bold block">
          ₹{product.price}
        </span>

        <button className="
          w-full mt-3 
          bg-[#6B2D5C] 
          text-white 
          py-1.5 md:py-2 
          rounded-md md:rounded-lg 
          text-sm
        ">
          Buy Now
        </button>
      </div>
    </div>
  ))}
</div>

    </div>

       {/* PAGINATION-LIKE BUTTON */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => navigate("/shop")}
          className="
            px-8 py-3 
            bg-[#6B2D5C] text-white 
            rounded-full 
            font-semibold 
            hover:bg-[#5a254e] 
            transition
            cursor-pointer
          "
        >
          View All Products →
        </button>
      </div>

    
  </div>
)

}

export default TopSellingProducts;
