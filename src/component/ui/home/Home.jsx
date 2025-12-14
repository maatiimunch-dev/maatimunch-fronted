import React, { useState, useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoplayRef = useRef(null)

  const slides = [
    {
      products: [
        { 
          name: 'Blueberry', 
          image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop'
        },
        { 
          name: 'Cranberries', 
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop'
        },
        { 
          name: 'Apricots', 
          image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop'
        }
      ],
      title: 'Healthy, tasty, and ready',
      subtitle: 'when cravings strike.',
      description: 'Made with Nuts, Dried Fruits, Nuts and Berries!'
    },
    {
      products: [
        { 
          name: 'Almonds', 
          image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop'
        },
        { 
          name: 'Pistachios', 
          image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop'
        },
        { 
          name: 'Cashews', 
          image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=400&fit=crop'
        }
      ],
      title: 'Premium quality nuts',
      subtitle: 'for every occasion.',
      description: 'Roasted, salted, and perfectly crunchy!'
    },
    {
      products: [
        { 
          name: 'Raisins', 
          image: 'https://images.unsplash.com/photo-1598111388756-b2285cca0458?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpc2lufGVufDB8fDB8fHww'
        },
        { 
          name: 'Dates', 
          image: 'https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0ZXN8ZW58MHx8MHx8fDA%3D'
        },
        { 
          name: 'Figs', 
          image: 'https://images.unsplash.com/photo-1506851141243-46bb87f2576c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8'
        }
      ],
      title: 'Natural sweetness',
      subtitle: 'packed with energy.',
      description: 'No added sugar, just pure goodness!'
    }
  ]

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  // Refresh AOS when slide changes
  useEffect(() => {
    AOS.refresh()
  }, [currentSlide])

  // Autoplay
  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [])

  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      goToNextSlide()
    }, 4000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  const resetAutoplay = () => {
    stopAutoplay()
    startAutoplay()
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    resetAutoplay()
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNextSlide()
      resetAutoplay()
    }

    if (touchStart - touchEnd < -75) {
      goToPrevSlide()
      resetAutoplay()
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50">
      {/* Main Content */}
      <div 
        className="relative flex items-center justify-center px-4 py-16 sm:px-6 md:px-8 lg:px-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-7xl w-full">
          
          {/* Swiper Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIdx) => (
                <div 
                  key={slideIdx}
                  className="min-w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  
                  {/* Product Images Section - 3D Cards */}
                  <div 
                    className="relative h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <div className="relative flex gap-2 sm:gap-3 md:gap-4 items-end justify-center perspective-1000">
                      {slide.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="relative transform transition-all duration-500 hover:scale-105"
                          data-aos="zoom-in"
                          data-aos-delay={300 + (idx * 100)}
                          style={{ 
                            transform: `translateY(${idx === 1 ? '-15px' : '0'}) rotateY(${idx === 0 ? '8deg' : idx === 2 ? '-8deg' : '0'})`,
                            transformStyle: 'preserve-3d'
                          }}
                        >
                          {/* 3D Product Package - Image Only */}
                          <div 
                            className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${
                              idx === 1 
                                ? 'w-[110px] h-[180px] sm:w-[140px] sm:h-[220px] md:w-[180px] md:h-[280px]' 
                                : 'w-[90px] h-[150px] sm:w-[120px] sm:h-[190px] md:w-[150px] md:h-[240px]'
                            }`}
                            style={{
                              transformStyle: 'preserve-3d',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                          >
                            <div className="relative w-full h-full">
                              {/* Product Image - Full Card */}
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              
                              {/* Gradient Overlay at bottom for text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                              
                              {/* Brand Logo - Top */}
                              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 text-white z-10">
                                <div className="font-bold text-[8px] sm:text-[9px] md:text-xs drop-shadow-lg">MAATUMUNCH</div>
                              </div>
                              
                              {/* Product Name - Bottom */}
                              <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-10">
                                <div className="bg-white/20 backdrop-blur-md rounded-lg p-1.5 sm:p-2 text-center border border-white/30">
                                  <div className="text-white font-bold text-[9px] sm:text-xs md:text-sm uppercase tracking-wide drop-shadow-lg">
                                    {product.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3D Depth Effect */}
                          <div 
                            className="absolute inset-0 bg-gray-200 rounded-2xl -z-10"
                            style={{
                              transform: 'translateZ(-10px)',
                              transformStyle: 'preserve-3d'
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Text Content Section */}
                  <div 
                    className="text-center md:text-right"
                    data-aos="fade-left"
                    data-aos-delay="400"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
                      {slide.title}
                      <br />
                      <span className="text-orange-600">{slide.subtitle}</span>
                    </h1>
                    <p 
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-4 sm:mb-6 md:mb-8 font-medium px-2 sm:px-0"
                      data-aos="fade-up"
                      data-aos-delay="600"
                    >
                      {slide.description}
                    </p>
                    <button 
                      className="bg-black text-white px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-sm sm:text-base md:text-lg font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                      data-aos="fade-up"
                      data-aos-delay="800"
                    >
                      SHOP NOW
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => { goToPrevSlide(); resetAutoplay(); }}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous slide"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => { goToNextSlide(); resetAutoplay(); }}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next slide"
            data-aos="fade-left"
            data-aos-delay="1000"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div 
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20"
        data-aos="fade-up"
        data-aos-delay="1200"
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx
                ? 'w-8 sm:w-10 md:w-12 h-2.5 sm:h-3 bg-gray-800'
                : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default Home