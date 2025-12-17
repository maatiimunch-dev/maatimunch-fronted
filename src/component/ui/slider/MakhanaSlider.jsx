import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, FreeMode } from 'swiper/modules'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

const MakhanaSlider = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    })
  }, [])

  const makhanaProducts = [
    { name: 'Plain Makhana', image: 'https://ajfan.store/cdn/shop/files/MakhanaPlain.webp?v=1754884997' },
    { name: 'Peri Peri Makhana', image: 'https://5.imimg.com/data5/SELLER/Default/2024/9/454358891/CZ/KE/LX/193081573/peri-peri-makhana.png' },
    { name: 'Cream & Onion', image: 'https://www.gopalsweetsindia.com/cdn/shop/files/DSC01702.jpg?v=1718609522&width=1200' },
    { name: 'Pudina Makhana', image: 'https://www.indianveggiedelight.com/wp-content/uploads/2019/09/mint_makhana_1-1.jpg' },
    { name: 'Caramel Makhana', image: 'https://traditionallymodernfood.com/wp-content/uploads/2020/06/roasted-makhana-recipe-4-flavors-109.jpeg' }
  ]

  return (
    <div className="relative w-full py-8 md:py-16">
      {/* Header */}
      <div
        className="text-center mb-8 md:mb-12 px-4"
        data-aos="fade-up"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-orange-600 mb-2 md:mb-4">
          Makhana Collection
        </h2>
        <p className="text-base md:text-xl text-gray-600">
          Crispy, healthy & delicious fox nuts
        </p>
      </div>

      {/* Swiper Container */}
      <div className="relative" data-aos="fade-up">
        <div className="md:max-w-7xl md:mx-auto md:px-16">
          <Swiper
            modules={[Navigation, FreeMode]}
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
            speed={600}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: true,
              momentumRatio: 0.5,
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 2.5, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
              1280: { slidesPerView: 4.5, spaceBetween: 24 },
            }}
            className="mySwiper"
          >
            {makhanaProducts.map((product, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="px-4 md:px-0 py-4 md:py-8"
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100}
                >
                  <div className="w-full aspect-[3/4] rounded-2xl md:rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-2 select-none relative">
                    
                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable="false"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Content */}
                    <div className="relative h-full p-4 md:p-6 flex flex-col justify-between">
                      <div>
                        <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                          <span className="text-white text-[10px] md:text-xs font-bold tracking-wider">
                            MAATIMUNCH
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="bg-white/30 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 text-center transition-all duration-300">
                          <h3 className="text-white text-lg md:text-2xl font-bold tracking-wide drop-shadow-lg">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="custom-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 items-center justify-center">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="custom-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 items-center justify-center">
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Hint */}
      <div
        className="md:hidden text-center mt-4 px-4"
        data-aos="fade-up"
      >
        <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
          <span className="text-lg">👆</span> Swipe to explore more
        </p>
      </div>
    </div>
  )
}

export default MakhanaSlider