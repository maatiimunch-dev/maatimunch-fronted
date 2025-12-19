// import React, { useState, useEffect, useRef } from 'react'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
// import { useNavigate } from 'react-router-dom';
// import Banner from '../../../assets/banner.jpg';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [touchStart, setTouchStart] = useState(0)
//   const [touchEnd, setTouchEnd] = useState(0)
//   const autoplayRef = useRef(null)

//   const slides = [
//     {
//       products: [
//         {
//           name: 'Plain Makhana',
//           image: 'https://images.unsplash.com/photo-1710421576768-ff985fa63b60?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFraGFuYXxlbnwwfHwwfHx8MA%3D%3D'
//         },
//         {
//           name: 'Peri Peri Makhana',
//           image: 'https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/sanjeev-kapoor/media/post_banners/0978533c3365cf1e4248f0532a2eed5d352cbe6ee05400e097667aaf9f5a8831.jpg'
//         },
//         {
//           name: 'Pudina Makhana',
//           image: 'https://www.indubenkhakhrawala.com/wp-content/uploads/2022/01/Mint-Makhna.jpg'
//         }
//       ],
//       title: 'Crunchy, light, and guilt-free',
//       subtitle: 'snacking made healthy.',
//       description: 'Roasted Makhana - High in protein, low in calories!'
//     },
//     {
//       products: [
//         {
//           name: 'Cream & Onion Makhana',
//           image: 'https://healthymaster.in/cdn/shop/files/6_772eac64-f531-469f-bed3-fdeaff941025.jpg?v=1747291756&width=1445'
//         },
//         {
//           name: 'Cheese Makhana',
//           image: 'https://fuzionnuts.in/cdn/shop/products/CheeseMakhana.jpg?v=1641892759'
//         },
//         {
//           name: 'Masala Makhana',
//           image: 'https://thumbs.dreamstime.com/b/roasted-phool-makhana-crispy-lotus-pops-seed-124726518.jpg'
//         }
//       ],
//       title: 'Flavourful makhana',
//       subtitle: 'for every taste bud.',
//       description: 'Perfectly seasoned and irresistibly crunchy!'
//     },
//     {
//       products: [
//         {
//           name: 'Caramel Makhana',
//           image: 'https://t3.ftcdn.net/jpg/10/04/69/08/360_F_1004690825_6TdPQ9EzKZOL2Hjv7HVFRMK2ArRne16Y.jpg'
//         },
//         {
//           name: 'Chocolate Makhana',
//           image: 'https://5.imimg.com/data5/SELLER/Default/2025/3/499268574/KK/BY/CQ/223551349/50g-chocolate-makhana.png'
//         },
//         {
//           name: 'Honey Roasted Makhana',
//           image: 'https://www.kitchenathoskins.com/wp-content/uploads/2023/01/roasted-makhana-6.jpg'
//         }
//       ],
//       title: 'Sweet makhana treats',
//       subtitle: 'indulge without worry.',
//       description: 'Deliciously sweet, naturally nutritious!'
//     }
//   ]

//   const navigate = useNavigate();

//   // Initialize AOS
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: false,
//       mirror: true,
//       easing: 'ease-out-cubic'
//     })
//   }, [])

//   // Refresh AOS when slide changes
//   useEffect(() => {
//     AOS.refresh()
//   }, [currentSlide])

//   // Autoplay
//   useEffect(() => {
//     startAutoplay()
//     return () => stopAutoplay()
//   }, [])

//   const startAutoplay = () => {
//     autoplayRef.current = setInterval(() => {
//       goToNextSlide()
//     }, 4000)
//   }

//   const stopAutoplay = () => {
//     if (autoplayRef.current) {
//       clearInterval(autoplayRef.current)
//     }
//   }

//   const resetAutoplay = () => {
//     stopAutoplay()
//     startAutoplay()
//   }

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length)
//   }

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
//   }

//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//     resetAutoplay()
//   }

//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX)
//   }

//   const handleTouchMove = (e) => {
//     setTouchEnd(e.touches[0].clientX)
//   }

//   const handleTouchEnd = () => {
//     if (touchStart - touchEnd > 75) {
//       goToNextSlide()
//       resetAutoplay()
//     }

//     if (touchStart - touchEnd < -75) {
//       goToPrevSlide()
//       resetAutoplay()
//     }
//   }

//   return (
//     <div 
//       className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       style={{
//         backgroundImage: `url(${Banner})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* Black Overlay */}
//       <div className="absolute inset-0 bg-black/50 z-0"></div>

//       {/* Main Content */}
//       <div className="relative z-10">
//         {/* Swiper Container */}
//         <div className="relative w-full h-screen">
//           {slides.map((slide, slideIdx) => (
//             <div
//               key={slideIdx}
//               className={`absolute inset-0 transition-opacity duration-700 ${
//                 currentSlide === slideIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
//               }`}
//             >
//               <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-6 md:px-12 lg:px-20 gap-8 md:gap-12">
//                 {/* Product Images Section - 3D Cards */}
//                 <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full md:w-1/2">
//                   {slide.products.map((product, idx) => (
//                     <div
//                       key={idx}
//                       className="relative group"
//                       data-aos="fade-up"
//                       data-aos-delay={idx * 200}
//                       style={{
//                         transform: `perspective(1000px) rotateY(${(idx - 1) * 15}deg)`,
//                         transformStyle: 'preserve-3d'
//                       }}
//                     >
//                       {/* 3D Product Package - Image Only */}
//                       <div className="relative w-32 h-40 sm:w-36 sm:h-44 md:w-44 md:h-56 lg:w-52 lg:h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-0 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
//                         style={{
//                           transformStyle: 'preserve-3d',
//                           transform: 'translateZ(20px)'
//                         }}
//                       >
//                         {/* Product Image - Full Card */}
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
                        
//                         {/* Gradient Overlay at bottom for text readability */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                        
//                         {/* Brand Logo - Top */}
//                         <div className="absolute top-3 left-0 right-0 text-center">
//                           <div className="inline-block bg-white/95 px-3 py-1.5 rounded-full shadow-lg">
//                             <span className="text-[10px] sm:text-xs font-bold tracking-wider text-amber-600">
//                               MAATUMUNCH
//                             </span>
//                           </div>
//                         </div>
                        
//                         {/* Product Name - Bottom */}
//                         <div className="absolute bottom-3 left-0 right-0 text-center px-2">
//                           <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
//                             {product.name}
//                           </p>
//                         </div>
                        
//                         {/* 3D Depth Effect */}
//                         <div 
//                           className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
//                           style={{
//                             transform: 'translateZ(1px)'
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Text Content Section */}
//                 <div className="text-center md:text-left w-full md:w-1/2 space-y-4 md:space-y-6">
//                   <h1 
//                     className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
//                     data-aos="fade-left"
//                     data-aos-delay="400"
//                   >
//                     {slide.title} <br />
//                     <span className="text-amber-400">{slide.subtitle}</span>
//                   </h1>
                  
//                   <p 
//                     className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0"
//                     data-aos="fade-left"
//                     data-aos-delay="600"
//                   >
//                     {slide.description}
//                   </p>
                  
//                   <button
//                     onClick={() => navigate("/shop")}
//                     className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
//                     data-aos="fade-left"
//                     data-aos-delay="800"
//                   >
//                     SHOP NOW
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows - Desktop */}
//         <button
//           onClick={() => {
//             goToPrevSlide();
//             resetAutoplay();
//           }}
//           className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
//           aria-label="Previous slide"
//           data-aos="fade-right"
//           data-aos-delay="1000"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <button
//           onClick={() => {
//             goToNextSlide();
//             resetAutoplay();
//           }}
//           className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
//           aria-label="Next slide"
//           data-aos="fade-left"
//           data-aos-delay="1000"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>

//         {/* Carousel Indicators */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
//           {slides.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => goToSlide(idx)}
//               className={`transition-all duration-300 rounded-full ${
//                 currentSlide === idx
//                   ? 'w-8 sm:w-10 md:w-12 h-2.5 sm:h-3 bg-gray-800'
//                   : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400 hover:bg-gray-600'
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Home





import React, { useState, useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css';
import Banner from '../../../assets/banner.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [direction, setDirection] = useState('next')
  const autoplayRef = useRef(null)

  const navigate = useNavigate();

  const slides = [
    {
      products: [
        {
          name: 'Plain Makhana',
          image: 'https://images.unsplash.com/photo-1710421576768-ff985fa63b60?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFraGFuYXxlbnwwfHwwfHx8MA%3D%3D'
        },
        {
          name: 'Peri Peri Makhana',
          image: 'https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/sanjeev-kapoor/media/post_banners/0978533c3365cf1e4248f0532a2eed5d352cbe6ee05400e097667aaf9f5a8831.jpg'
        },
        {
          name: 'Pudina Makhana',
          image: 'https://www.indubenkhakhrawala.com/wp-content/uploads/2022/01/Mint-Makhna.jpg'
        }
      ],
      title: 'Crunchy, light, and guilt-free',
      subtitle: 'snacking made healthy.',
      description: 'Roasted Makhana - High in protein, low in calories!'
    },
    {
      products: [
        {
          name: 'Cream & Onion Makhana',
          image: 'https://healthymaster.in/cdn/shop/files/6_772eac64-f531-469f-bed3-fdeaff941025.jpg?v=1747291756&width=1445'
        },
        {
          name: 'Cheese Makhana',
          image: 'https://fuzionnuts.in/cdn/shop/products/CheeseMakhana.jpg?v=1641892759'
        },
        {
          name: 'Masala Makhana',
          image: 'https://thumbs.dreamstime.com/b/roasted-phool-makhana-crispy-lotus-pops-seed-124726518.jpg'
        }
      ],
      title: 'Flavourful makhana',
      subtitle: 'for every taste bud.',
      description: 'Perfectly seasoned and irresistibly crunchy!'
    },
    {
      products: [
        {
          name: 'Caramel Makhana',
          image: 'https://t3.ftcdn.net/jpg/10/04/69/08/360_F_1004690825_6TdPQ9EzKZOL2Hjv7HVFRMK2ArRne16Y.jpg'
        },
        {
          name: 'Chocolate Makhana',
          image: 'https://5.imimg.com/data5/SELLER/Default/2025/3/499268574/KK/BY/CQ/223551349/50g-chocolate-makhana.png'
        },
        {
          name: 'Honey Roasted Makhana',
          image: 'https://www.kitchenathoskins.com/wp-content/uploads/2023/01/roasted-makhana-6.jpg'
        }
      ],
      title: 'Sweet makhana treats',
      subtitle: 'indulge without worry.',
      description: 'Deliciously sweet, naturally nutritious!'
    }
  ]

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  // Refresh AOS on slide change
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
    }, 5000)
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
    setDirection('next')
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevSlide = () => {
    setDirection('prev')
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'next' : 'prev')
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
    <div 
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={Banner}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Swiper Container */}
        <div className="relative w-full h-screen">
          {slides.map((slide, slideIdx) => (
            <div
              key={slideIdx}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                currentSlide === slideIdx 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : direction === 'next'
                  ? slideIdx > currentSlide || (currentSlide === slides.length - 1 && slideIdx === 0)
                    ? 'opacity-0 translate-x-full scale-95'
                    : 'opacity-0 -translate-x-full scale-95'
                  : slideIdx < currentSlide || (currentSlide === 0 && slideIdx === slides.length - 1)
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
              } ${currentSlide !== slideIdx ? 'pointer-events-none' : ''}`}
            >
              <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-6 md:px-12 lg:px-20 gap-8 md:gap-12">
                {/* Product Images Section - 3D Cards */}
                <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full md:w-1/2">
                  {slide.products.map((product, idx) => (
                    <div
                      key={idx}
                      data-aos="fade-up"
                      data-aos-delay={idx * 150}
                      className="relative group transition-all duration-700 ease-out"
                      style={{
                        transform: `perspective(1000px) rotateY(${(idx - 1) * 15}deg)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* 3D Product Package */}
                      <div className="relative w-32 h-40 sm:w-36 sm:h-44 md:w-44 md:h-56 lg:w-52 lg:h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-0 hover:shadow-[0_25px_50px_-12px_rgba(251,191,36,0.5)] group-hover:animate-pulse-glow"
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: 'translateZ(20px)'
                        }}
                      >
                        {/* Product Image */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-500 group-hover:from-black/80"></div>
                        
                        {/* Brand Logo - Top */}
                        <div className="absolute top-3 left-0 right-0 text-center transition-transform duration-500 group-hover:-translate-y-1">
                          <div className="inline-block bg-white/95 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-amber-600">
                              MAATUMUNCH
                            </span>
                          </div>
                        </div>
                        
                        {/* Product Name - Bottom */}
                        <div className="absolute bottom-3 left-0 right-0 text-center px-2 transition-transform duration-500 group-hover:translate-y-1">
                          <p className="text-white text-xs sm:text-sm md:text-base font-semibold drop-shadow-lg">
                            {product.name}
                          </p>
                        </div>
                        
                        {/* Shine Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                        
                        {/* 3D Depth Effect */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                          style={{
                            transform: 'translateZ(1px)'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Text Content Section */}
                <div className="text-center md:text-left w-full md:w-1/2 space-y-4 md:space-y-6">
                  <h1 
                    data-aos="fade-left"
                    data-aos-delay="200"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  >
                    {slide.title} <br />
                    <span className="text-amber-400 inline-block animate-glow">{slide.subtitle}</span>
                  </h1>
                  
                  <p 
                    data-aos="fade-left"
                    data-aos-delay="400"
                    className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0"
                  >
                    {slide.description}
                  </p>
                  
                  <button
                    data-aos="fade-left"
                    data-aos-delay="600"
                   
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-base md:text-lg transition-all duration-500 hover:scale-110 shadow-lg hover:shadow-amber-500/50 hover:shadow-2xl relative overflow-hidden group cursor-pointer"
                    onClick={() => navigate("/shop")}
                  >
                    <span className="relative z-10">SHOP NOW</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop */}
        <button
          onClick={() => {
            goToPrevSlide();
            resetAutoplay();
          }}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-amber-500 hover:text-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-125 hover:-translate-x-1 z-10 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => {
            goToNextSlide();
            resetAutoplay();
          }}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-amber-500 hover:text-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-125 hover:translate-x-1 z-10 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === idx
                  ? 'w-8 sm:w-10 md:w-12 h-2.5 sm:h-3 bg-amber-500 shadow-lg shadow-amber-500/50'
                  : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/60 hover:bg-white hover:scale-125'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 0 30px rgba(251, 191, 36, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.5);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.6);
          }
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home