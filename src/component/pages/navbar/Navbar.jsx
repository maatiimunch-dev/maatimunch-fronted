// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   X,
//   Search,
//   ShoppingCart,
//   User,
//   Home,
//   Grid,
// } from "lucide-react";
// import { useCart } from "../../../context/CartContext";
// import { useAuth } from "../../../context/AuthContext";
// import Logo from "../../../assets/Logo.png";
// import { RiMenu4Line } from "react-icons/ri";

// const menuItems = [
//   { label: "Home", path: "/" },
//   { label: "Shop", path: "/shop" },
//   { label: "Blog", path: "/blog" },
//   { label: "Contact Us", path: "/contact" },
// ];

// const mobileBottomNav = [
//   { label: "Home", path: "/", icon: Home },
//   { label: "Shop", path: "/shop", icon: Grid },
//   { label: "Cart", path: "/cart", icon: ShoppingCart },
//   { label: "Profile", path: "/profile", icon: User },
// ];

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartCount } = useCart();
//   const { user, logout } = useAuth();
//   const navbarRef = useRef(null);

//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [cartAnimate, setCartAnimate] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [showDesktopProfile, setShowDesktopProfile] = useState(false);
//   const [navbarHeight, setNavbarHeight] = useState(0);

//   // Calculate navbar height
//   useEffect(() => {
//     if (navbarRef.current) {
//       setNavbarHeight(navbarRef.current.offsetHeight);
//     }
//   }, []);

//   // Cart animation
//   useEffect(() => {
//     if (cartCount > 0) {
//       setCartAnimate(true);
//       const t = setTimeout(() => setCartAnimate(false), 700);
//       return () => clearTimeout(t);
//     }
//   }, [cartCount]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setMobileMenu(false);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     logout();
//     setShowProfile(false);
//     setShowDesktopProfile(false);
//     navigate("/");
//   };

//   return (
//     <>
//       {/* 🔝 TOP HEADER */}
//       <div className="bg-black text-white text-xs md:text-sm px-4 py-2">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <span>📢 Free Shipping On Orders Above ₹1499/-</span>
//         </div>
//       </div>

//       {/* 🔹 MAIN NAVBAR */}
//       <header ref={navbarRef} className="bg-white sticky top-0 z-40 shadow">
//         <div className="px-6 mx-auto flex items-center py-3 gap-10 justify-between">

//           {/* LOGO + BRAND */}
//           <Link to="/" className="flex items-center gap-2 shrink-0">
//             <img src={Logo} alt="Maati Munch" className="h-10 w-10 rounded-full" />
//             <span className="hidden md:block font-semibold text-lg tracking-wide">
//               MaatiMunch
//             </span>
//           </Link>

//           {/* MOBILE SEARCH */}
//           <div className="flex-1 md:hidden">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
//               />
//               <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
//             </div>
//           </div>

//           {/* MOBILE MENU TOGGLE */}
//           <button 
//             className="md:hidden z-50" 
//             onClick={() => setMobileMenu(!mobileMenu)}
//             aria-label="Toggle menu"
//           >
//             {mobileMenu ? <X size={28} /> : <RiMenu4Line size={28} />}
//           </button>

//           {/* DESKTOP SEARCH */}
//           <div className="hidden md:flex w-[420px] mx-auto">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search for products"
//                 className="w-full border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />
//               <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
//             </div>
//           </div>

//           {/* DESKTOP ICONS */}
//           <div className="hidden md:flex items-center gap-6 ml-auto">

//             {/* CART */}
//             <Link to="/cart" className="relative hover:opacity-80 transition-opacity">
//               <ShoppingCart />
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* PROFILE */}
//             <div className="relative">
//               {user ? (
//                 <>
//                   <button
//                     onClick={() => setShowDesktopProfile(!showDesktopProfile)}
//                     className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
//                     aria-label="Profile menu"
//                   >
//                     {user.name
//                       ? user.name.charAt(0).toUpperCase()
//                       : user.email.charAt(0).toUpperCase()}
//                   </button>

//                   {showDesktopProfile && (
//                     <>
//                       <div
//                         className="fixed inset-0 z-40"
//                         onClick={() => setShowDesktopProfile(false)}
//                       />
//                       <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
//                         <div className="px-4 py-3 bg-gray-100">
//                           <p className="text-sm font-semibold">{user.name}</p>
//                           <p className="text-xs text-gray-500 truncate">
//                             {user.email}
//                           </p>
//                         </div>

//                         <Link
//                           to="/profile"
//                           className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
//                           onClick={() => setShowDesktopProfile(false)}
//                         >
//                           My Profile
//                         </Link>

//                         <Link
//                           to="/my-orders"
//                           className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
//                           onClick={() => setShowDesktopProfile(false)}
//                         >
//                           My Orders
//                         </Link>

//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <Link to="/login" className="hover:opacity-80 transition-opacity">
//                   <User />
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* DESKTOP MENU */}
//         <nav className="hidden md:flex justify-center bg-black text-white text-sm font-medium">
//           {menuItems.map((item, i) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={i}
//                 to={item.path}
//                 className="relative px-5 py-3 font-medium group"
//               >
//                 <span
//                   className={`relative z-10 transition-colors ${
//                     isActive ? "text-orange-400" : "text-white group-hover:text-orange-300"
//                   }`}
//                 >
//                   {item.label}
//                 </span>

//                 <span
//                   className={`
//                     absolute left-1/2 -translate-x-1/2 bottom-[6px]
//                     h-[2px] bg-[#FFA500]
//                     transition-all duration-300 ease-out
//                     ${isActive ? "w-6" : "w-0 group-hover:w-10"}
//                   `}
//                 />
//               </Link>
//             );
//           })}
//         </nav>

//       </header>

//       {/* 📱 MOBILE SLIDE MENU - FIXED BELOW NAVBAR */}
//       {mobileMenu && (
//         <div 
//           className="fixed inset-0 z-30 md:hidden"
//           style={{ top: `${navbarHeight}px` }}
//         >
//           {/* Backdrop */}
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setMobileMenu(false)}
//           />
          
//           {/* Menu Content */}
//           <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-slideDown">
//             <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
//               {menuItems.map((item, i) => {
//                 const isActive = location.pathname === item.path;
                
//                 return (
//                   <Link
//                     key={i}
//                     to={item.path}
//                     onClick={() => setMobileMenu(false)}
//                     className={`block py-4 px-6 border-b border-gray-100 text-sm font-medium transition-all ${
//                       isActive 
//                         ? "bg-orange-50 text-orange-400" 
//                         : "hover:bg-gray-50 text-gray-700"
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 📱 MOBILE BOTTOM NAV */}
//      <div className="
//   fixed 
//   bottom-3 
//   left-3 
//   right-3 
//   bg-black/70 
//   text-gray-200 
//   md:hidden 
//   z-50 
//   shadow-2xl 
//   rounded-4xl
// ">

//         <div className="flex justify-around py-2">
//           {mobileBottomNav.map((item, i) => {
//             const Icon = item.icon;
//             const active = location.pathname === item.path;

//             // For Profile: If user logged in, show slide-up menu
//             if (item.label === "Profile") {
//               return (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     if (user) {
//                       setShowProfile(true);
//                     } else {
//                       navigate("/login");
//                     }
//                   }}
//                   className={`flex flex-col items-center text-xs transition-all ${
//                     active ? "text-orange-400 scale-110" : "opacity-70 hover:opacity-100"
//                   }`}
//                 >
//                   {user ? (
//                     <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1">
//                       {user.name
//                         ? user.name.charAt(0).toUpperCase()
//                         : user.email.charAt(0).toUpperCase()}
//                     </div>
//                   ) : (
//                     <div className="relative mb-1">
//                       <Icon size={20} />
//                     </div>
//                   )}
//                   <span className="text-[10px]">{item.label}</span>
//                 </button>
//               );
//             }

//             // For other items: Normal Link
//             return (
//               <Link
//                 key={i}
//                 to={item.path}
//                 className={`flex flex-col items-center text-xs transition-all ${
//                   active ? "text-orange-400 scale-110" : "opacity-70 hover:opacity-100"
//                 }`}
//               >
//                 <div className="relative mb-1">
//                   <Icon
//                     size={20}
//                     className={
//                       item.label === "Cart" && cartAnimate
//                         ? "animate-bounce"
//                         : ""
//                     }
//                   />
//                   {item.label === "Cart" && cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>
//                 <span className="text-[10px]">{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//       {/* 👤 MOBILE PROFILE SLIDE-UP */}
//       {showProfile && user && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
//             onClick={() => setShowProfile(false)}
//           />
//           <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl animate-slideUp">
//             <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            
//             <div className="flex items-center gap-3 mb-6 pb-4 border-b">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//                 {user.name
//                   ? user.name.charAt(0).toUpperCase()
//                   : user.email.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-semibold text-base">{user.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{user.email}</p>
//               </div>
//             </div>

//             <Link
//               to="/profile"
//               className="block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
//               onClick={() => setShowProfile(false)}
//             >
//               My Profile
//             </Link>

//             <Link
//               to="/my-orders"
//               className="block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
//               onClick={() => setShowProfile(false)}
//             >
//               My Orders
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="w-full text-left py-3 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
//             >
//               Logout
//             </button>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(100%);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }

//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;





import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  Search,
  ShoppingCart,
  User,
  Home,
  Grid,
  Loader2,
} from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import Logo from "../../../assets/Logo.png";
import { RiMenu4Line } from "react-icons/ri";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const mobileBottomNav = [
  { label: "Home", path: "/", icon: Home },
  { label: "Shop", path: "/shop", icon: Grid },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Profile", path: "/profile", icon: User },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navbarRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showDesktopProfile, setShowDesktopProfile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  
  // Search states
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [desktopSearchQuery, setDesktopSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [desktopSearchResults, setDesktopSearchResults] = useState([]);
  const [mobileShowDropdown, setMobileShowDropdown] = useState(false);
  const [desktopShowDropdown, setDesktopShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Calculate navbar height
  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
  }, []);

  // Mock product search function - Replace with your actual API call
  const searchProducts = async (query) => {
    if (!query.trim()) return [];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock products - Replace with actual API call
    // Example: const response = await fetch(`/api/products/search?q=${query}`);
    // const data = await response.json();
    // return data.products;
    
    const mockProducts = [
      { id: 1, name: "Organic Honey", price: 299, image: "/honey.jpg" },
      { id: 2, name: "Turmeric Powder", price: 149, image: "/turmeric.jpg" },
      { id: 3, name: "Masala Tea", price: 199, image: "/tea.jpg" },
      { id: 4, name: "Organic Jaggery", price: 249, image: "/jaggery.jpg" },
      { id: 5, name: "Herbal Coffee", price: 279, image: "/coffee.jpg" },
    ];
    
    return mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced search for mobile
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (mobileSearchQuery.trim()) {
        setIsSearching(true);
        const results = await searchProducts(mobileSearchQuery);
        setMobileSearchResults(results);
        setMobileShowDropdown(true);
        setIsSearching(false);
      } else {
        setMobileSearchResults([]);
        setMobileShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [mobileSearchQuery]);

  // Debounced search for desktop
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (desktopSearchQuery.trim()) {
        setIsSearching(true);
        const results = await searchProducts(desktopSearchQuery);
        setDesktopSearchResults(results);
        setDesktopShowDropdown(true);
        setIsSearching(false);
      } else {
        setDesktopSearchResults([]);
        setDesktopShowDropdown(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [desktopSearchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setMobileShowDropdown(false);
      }
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
        setDesktopShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cart animation
  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimate(true);
      const t = setTimeout(() => setCartAnimate(false), 700);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    setShowDesktopProfile(false);
    navigate("/");
  };

  const handleProductClick = (productId) => {
    setMobileShowDropdown(false);
    setDesktopShowDropdown(false);
    setMobileSearchQuery("");
    setDesktopSearchQuery("");
    navigate(`/product/${productId._id}`);
  };

  return (
    <>
      {/* 🔝 TOP HEADER */}
      <div className="bg-black text-white text-xs md:text-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📢 Free Shipping On Orders Above ₹1499/-</span>
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <header ref={navbarRef} className="bg-white sticky top-0 z-40 shadow">
        <div className="px-6 mx-auto flex items-center py-3 gap-10 justify-between">

          {/* LOGO + BRAND */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={Logo} alt="Maati Munch" className="h-10 w-10 rounded-full" />
            <span className="hidden md:block font-semibold text-lg tracking-wide">
              MaatiMunch
            </span>
          </Link>

          {/* MOBILE SEARCH */}
          <div className="flex-1 md:hidden relative" ref={mobileSearchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {isSearching ? (
                <Loader2 className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 animate-spin" />
              ) : (
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
              )}
            </div>

            {/* Mobile Search Dropdown */}
            {mobileShowDropdown && mobileSearchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                {mobileSearchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-orange-600 font-semibold">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mobileShowDropdown && mobileSearchQuery && mobileSearchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
                <p className="text-sm text-gray-500 text-center">No products found</p>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden z-50" 
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={28} /> : <RiMenu4Line size={28} />}
          </button>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex w-[420px] mx-auto relative" ref={desktopSearchRef}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products"
                value={desktopSearchQuery}
                onChange={(e) => setDesktopSearchQuery(e.target.value)}
                className="w-full border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              {isSearching ? (
                <Loader2 className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 animate-spin" />
              ) : (
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
              )}
            </div>

            {/* Desktop Search Dropdown */}
            {desktopShowDropdown && desktopSearchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {desktopSearchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-orange-600 font-semibold mt-1">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {desktopShowDropdown && desktopSearchQuery && desktopSearchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50">
                <p className="text-sm text-gray-500 text-center">No products found</p>
              </div>
            )}
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-6 ml-auto">

            {/* CART */}
            <Link to="/cart" className="relative hover:opacity-80 transition-opacity">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setShowDesktopProfile(!showDesktopProfile)}
                    className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
                    aria-label="Profile menu"
                  >
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </button>

                  {showDesktopProfile && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDesktopProfile(false)}
                      />
                      <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-gray-100">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          to="/profile"
                          className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDesktopProfile(false)}
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/my-orders"
                          className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDesktopProfile(false)}
                        >
                          My Orders
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link to="/login" className="hover:opacity-80 transition-opacity">
                  <User />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex justify-center bg-black text-white text-sm font-medium">
          {menuItems.map((item, i) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={i}
                to={item.path}
                className="relative px-5 py-3 font-medium group"
              >
                <span
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-orange-400" : "text-white group-hover:text-orange-300"
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`
                    absolute left-1/2 -translate-x-1/2 bottom-[6px]
                    h-[2px] bg-[#FFA500]
                    transition-all duration-300 ease-out
                    ${isActive ? "w-6" : "w-0 group-hover:w-10"}
                  `}
                />
              </Link>
            );
          })}
        </nav>

      </header>

      {/* 📱 MOBILE SLIDE MENU - FIXED BELOW NAVBAR */}
      {mobileMenu && (
        <div 
          className="fixed inset-0 z-30 md:hidden"
          style={{ top: `${navbarHeight}px` }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenu(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-slideDown">
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={i}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`block py-4 px-6 border-b border-gray-100 text-sm font-medium transition-all ${
                      isActive 
                        ? "bg-orange-50 text-orange-400" 
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 📱 MOBILE BOTTOM NAV */}
      <div className="fixed bottom-3 left-3 right-3 bg-black/70 text-gray-200 md:hidden z-50 shadow-2xl rounded-4xl">
        <div className="flex justify-around py-2">
          {mobileBottomNav.map((item, i) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            // For Profile: If user logged in, show slide-up menu
            if (item.label === "Profile") {
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (user) {
                      setShowProfile(true);
                    } else {
                      navigate("/login");
                    }
                  }}
                  className={`flex flex-col items-center text-xs transition-all ${
                    active ? "text-orange-400 scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {user ? (
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <div className="relative mb-1">
                      <Icon size={20} />
                    </div>
                  )}
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            }

            // For other items: Normal Link
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex flex-col items-center text-xs transition-all ${
                  active ? "text-orange-400 scale-110" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="relative mb-1">
                  <Icon
                    size={20}
                    className={
                      item.label === "Cart" && cartAnimate
                        ? "animate-bounce"
                        : ""
                    }
                  />
                  {item.label === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 👤 MOBILE PROFILE SLIDE-UP */}
      {showProfile && user && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowProfile(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 shadow-2xl animate-slideUp">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : user.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-base">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <Link
              to="/profile"
              className="block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowProfile(false)}
            >
              My Profile
            </Link>

            <Link
              to="/my-orders"
              className="block py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setShowProfile(false)}
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left py-3 px-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
            >
              Logout
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;