import React, { useEffect, useRef } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const MakhanaSlider = () => {
  const sliderRef = useRef(null)
  const animationRef = useRef(null)
  const translateXRef = useRef(0)
  const slideWidthRef = useRef(0)

  const makhanaProducts = [
    { name: "Plain Makhana", image: "https://ajfan.store/cdn/shop/files/MakhanaPlain.webp?v=1754884997" },
    { name: "Peri Peri Makhana", image: "https://5.imimg.com/data5/SELLER/Default/2024/9/454358891/CZ/KE/LX/193081573/peri-peri-makhana.png" },
    { name: "Cream & Onion", image: "https://www.gopalsweetsindia.com/cdn/shop/files/DSC01702.jpg?v=1718609522&width=1200" },
    { name: "Pudina Makhana", image: "https://www.indianveggiedelight.com/wp-content/uploads/2019/09/mint_makhana_1-1.jpg" },
    { name: "Caramel Makhana", image: "https://traditionallymodernfood.com/wp-content/uploads/2020/06/roasted-makhana-recipe-4-flavors-109.jpeg" }
  ]

  /* ---------------- AOS ---------------- */
  useEffect(() => {
    AOS.init({ once: true, duration: 800 })
  }, [])

  /* ---------------- WIDTH SETUP ---------------- */
  useEffect(() => {
    const updateWidth = () => {
      const container = sliderRef.current?.parentElement
      if (!container) return

      const visible =
        window.innerWidth >= 1024 ? 3 :
        window.innerWidth >= 640 ? 2 : 1

      slideWidthRef.current = container.offsetWidth / visible
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  /* ---------------- CONTINUOUS ANIMATION ---------------- */
  useEffect(() => {
    const speed = 2 // smaller = slower

    const animate = () => {
      translateXRef.current -= speed

      // half slides cross → reset without animation
      if (
        Math.abs(translateXRef.current) >=
        slideWidthRef.current * makhanaProducts.length
      ) {
        translateXRef.current = 0
      }

      if (sliderRef.current) {
        sliderRef.current.style.transform =
          `translateX(${translateXRef.current}px)`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [makhanaProducts.length])

  return (
    <section className="w-full py-10 overflow-hidden">
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-bold text-[#6B2D5C]">
          Recent Makhana Collection
        </h2>
        <p className="text-gray-600 mt-2">
          Crispy, healthy & delicious fox nuts
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className="flex will-change-transform"
        >
          {[...makhanaProducts, ...makhanaProducts].map((p, i) => (
            <div
              key={i}
              className="px-3 flex-shrink-0"
              style={{ width: slideWidthRef.current || 280 }}
            >
              <div className="aspect-[3/4] rounded-2xl shadow-xl overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <h3 className="text-white text-lg font-bold drop-shadow">
                    {p.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MakhanaSlider
