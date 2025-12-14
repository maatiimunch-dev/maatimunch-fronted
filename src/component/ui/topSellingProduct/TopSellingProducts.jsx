// import React, { useState, useRef } from 'react'
// import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'

// const TopSellingProducts = () => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [touchStart, setTouchStart] = useState(0)
//   const [touchEnd, setTouchEnd] = useState(0)
//   const scrollRef = useRef(null)

//   const products = [
//     {
//       id: 1,
//       badge: 'VALUE OFFER',
//       discount: '62%off',
//       badgeColor: 'bg-red-500',
//       image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400&h=400&fit=crop',
//       brand: 'Maati Munch',
//       name: 'Maati Munch Seeds 800g Combo - Pack of 4 (Pumpkin Seeds 200g, Chia...',
//       rating: 5.0,
//       reviews: 0,
//       mrp: 926,
//       price: 348,
//       pricePerUnit: '₹435.1/100g'
//     },
//     {
//       id: 2,
//       badge: 'BESTSELLER',
//       discount: '23%off',
//       badgeColor: 'bg-red-500',
//       image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop',
//       brand: 'Maati Munch',
//       name: 'Maati Munch California Almond 1kg | Premium Quality Badam',
//       rating: 4.8,
//       reviews: 0,
//       mrp: 1299,
//       price: 991,
//       pricePerUnit: '₹99.1/100g'
//     },
//     {
//       id: 3,
//       badge: 'VALUE OFFER',
//       discount: '31%off',
//       badgeColor: 'bg-red-500',
//       image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop',
//       brand: 'Maati Munch',
//       name: 'Maati Munch Premium Quality California Walnut 250 Gm Kernels Price',
//       rating: 4.8,
//       reviews: 0,
//       mrp: 998,
//       price: 683,
//       pricePerUnit: '₹/100g'
//     },
//     {
//       id: 4,
//       badge: 'TRENDING',
//       discount: '24%off',
//       badgeColor: 'bg-red-500',
//       image: 'https://images.unsplash.com/photo-1577003833154-a2c6b716ecfa?w=400&h=400&fit=crop',
//       brand: 'Maati Munch',
//       name: 'Maati Munch Dried Figs 250gm',
//       rating: 4.5,
//       reviews: 0,
//       mrp: 459,
//       price: 347,
//       pricePerUnit: '₹138.8/100g'
//     },
//     {
//       id: 5,
//       badge: 'VALUE OFFER',
//       discount: '35%off',
//       badgeColor: 'bg-red-500',
//       image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop',
//       brand: 'Maati Munch',
//       name: 'Maati Munch Cashews Whole 500g Premium Quality',
//       rating: 4.9,
//       reviews: 0,
//       mrp: 899,
//       price: 584,
//       pricePerUnit: '₹116.8/100g'
//     }
//   ]

//   const itemsPerView = {
//     mobile: 1,
//     tablet: 2,
//     desktop: 4
//   }

//   const getItemsPerView = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth < 640) return itemsPerView.mobile
//       if (window.innerWidth < 1024) return itemsPerView.tablet
//       return itemsPerView.desktop
//     }
//     return itemsPerView.desktop
//   }

//   const [itemsVisible, setItemsVisible] = useState(getItemsPerView())

//   const maxIndex = Math.max(0, products.length - itemsVisible)

//   const handlePrev = () => {
//     setCurrentIndex(prev => Math.max(0, prev - 1))
//   }

//   const handleNext = () => {
//     setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
//   }

//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX)
//   }

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.touches[0].clientX)
//   }

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       handleNext()
//     }
//     if (touchStart - touchEnd < -75) {
//       handlePrev()
//     }
//   }

//   React.useEffect(() => {
//     const handleResize = () => {
//       setItemsVisible(getItemsPerView())
//     }
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
//           Top Selling Products
//         </h2>

//         {/* Slider Container */}
//         <div className="relative">
//           {/* Left Arrow - Desktop Only */}
//           <button
//             onClick={handlePrev}
//             disabled={currentIndex === 0}
//             className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
//             aria-label="Previous products"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-800" />
//           </button>

//           {/* Products Slider */}
//           <div 
//             className="overflow-hidden"
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <div
//               ref={scrollRef}
//              className="flex transition-transform duration-500 ease-out gap-0 lg:gap-6"

//               style={{
//                 transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`
//               }}
//             >
//               {products.map((product) => (
//                 <div
//                   key={product.id}
//                   className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
//                 >
//                   <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
//                     {/* Image Container */}
//                     <div className="relative overflow-hidden">
//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
//                         <span className={`${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
//                           {product.badge}
//                         </span>
//                         <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
//                           {product.discount}
//                         </span>
//                       </div>

//                       {/* Product Image */}
//                       <div className="relative h-64 sm:h-72 overflow-hidden">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                       </div>

//                       {/* Wishlist Button */}
//                       <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors duration-300">
//                         <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
//                       </button>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-4 sm:p-5">
//                       {/* Brand & Rating */}
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-bold text-gray-900">{product.brand}</span>
//                         <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
//                           <Star className="w-3 h-3 fill-current" />
//                           <span>{product.rating}</span>
//                         </div>
//                       </div>

//                       {/* Product Name */}
//                       <h3 className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-2 min-h-[2.5rem]">
//                         {product.name}
//                       </h3>

//                       {/* Price Section */}
//                       <div className="mb-4">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-xs text-gray-500">MRP:</span>
//                           <span className="text-sm text-gray-500 line-through">₹{product.mrp}</span>
//                           <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
//                         </div>
//                         <span className="text-xs text-gray-500">{product.pricePerUnit}</span>
//                       </div>

//                       {/* Add to Cart Button */}
//                       <button className="w-full bg-[#6B2D5C] hover:bg-[#5a2550] text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
//                         Add To Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Arrow - Desktop Only */}
//           <button
//             onClick={handleNext}
//             disabled={currentIndex === maxIndex}
//             className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
//             aria-label="Next products"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-800" />
//           </button>
//         </div>

//         {/* Dots Indicator - Mobile/Tablet */}
//         <div className="flex justify-center gap-2 mt-6 lg:hidden">
//           {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`transition-all duration-300 rounded-full ${
//                 currentIndex === idx
//                   ? 'w-8 h-3 bg-gray-800'
//                   : 'w-3 h-3 bg-gray-400'
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TopSellingProducts





import React, { useState, useRef, useEffect } from 'react'
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const TopSellingProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const scrollRef = useRef(null)

  const products = [
    {
      id: 1,
      badge: 'VALUE OFFER',
      discount: '62%off',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=400&h=400&fit=crop',
      brand: 'Maati Munch',
      name: 'Maati Munch Seeds 800g Combo - Pack of 4 (Pumpkin Seeds 200g, Chia...',
      rating: 5.0,
      reviews: 0,
      mrp: 926,
      price: 348,
      pricePerUnit: '₹435.1/100g'
    },
    {
      id: 2,
      badge: 'BESTSELLER',
      discount: '23%off',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop',
      brand: 'Maati Munch',
      name: 'Maati Munch California Almond 1kg | Premium Quality Badam',
      rating: 4.8,
      reviews: 0,
      mrp: 1299,
      price: 991,
      pricePerUnit: '₹99.1/100g'
    },
    {
      id: 3,
      badge: 'VALUE OFFER',
      discount: '31%off',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop',
      brand: 'Maati Munch',
      name: 'Maati Munch Premium Quality California Walnut 250 Gm Kernels Price',
      rating: 4.8,
      reviews: 0,
      mrp: 998,
      price: 683,
      pricePerUnit: '₹/100g'
    },
    {
      id: 4,
      badge: 'TRENDING',
      discount: '24%off',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1577003833154-a2c6b716ecfa?w=400&h=400&fit=crop',
      brand: 'Maati Munch',
      name: 'Maati Munch Dried Figs 250gm',
      rating: 4.5,
      reviews: 0,
      mrp: 459,
      price: 347,
      pricePerUnit: '₹138.8/100g'
    },
    {
      id: 5,
      badge: 'VALUE OFFER',
      discount: '35%off',
      badgeColor: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop',
      brand: 'Maati Munch',
      name: 'Maati Munch Cashews Whole 500g Premium Quality',
      rating: 4.9,
      reviews: 0,
      mrp: 899,
      price: 584,
      pricePerUnit: '₹116.8/100g'
    }
  ]

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4
  }

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return itemsPerView.mobile
      if (window.innerWidth < 1024) return itemsPerView.tablet
      return itemsPerView.desktop
    }
    return itemsPerView.desktop
  }

  const [itemsVisible, setItemsVisible] = useState(getItemsPerView())

  const maxIndex = Math.max(0, products.length - itemsVisible)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) handleNext()
    if (touchStart - touchEnd < -75) handlePrev()
  }

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 120,
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setItemsVisible(getItemsPerView())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" data-aos="fade-up">
      <div className="max-w-7xl mx-auto">

        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900"
          data-aos="zoom-in"
        >
          Top Selling Products
        </h2>

        <div className="relative" data-aos="fade-up">

          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={scrollRef}
              className="flex transition-transform duration-500 ease-out gap-0 lg:gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                        <span className={`${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {product.badge}
                        </span>
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {product.discount}
                        </span>
                      </div>

                      <div className="relative h-64 sm:h-72 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">{product.brand}</span>
                        <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          {product.rating}
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>

                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm line-through text-gray-500">₹{product.mrp}</span>
                          <span className="text-xl font-bold">₹{product.price}</span>
                        </div>
                        <span className="text-xs text-gray-500">{product.pricePerUnit}</span>
                      </div>

                      <button className="w-full bg-[#6B2D5C] text-white py-3 rounded-lg hover:scale-105 transition">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`${currentIndex === idx ? 'w-8 h-3 bg-gray-800' : 'w-3 h-3 bg-gray-400'} rounded-full`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default TopSellingProducts
