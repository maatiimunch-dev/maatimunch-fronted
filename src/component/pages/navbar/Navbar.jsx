// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Search,
//   ShoppingCart,
//   User,
//   Home,
//   Grid,
// } from "lucide-react";

// const topHeaderLinks = [
//   { label: "Track Order", path: "/track-order" },
//   { label: "Backtopure Certificate", path: "/certificate" },
//   { label: "Franchise", path: "/franchise" },
//   { label: "Bulk Order", path: "/bulk-order" },
//   { label: "Contact Us", path: "/contact" },
// ];

// const menuItems = [
//   { label: "Shop", path: "/shop" },
//   { label: "Jumbo Nuts", path: "/jumbo-nuts" },
//   { label: "Snacking", path: "/snacking" },
//   { label: "Dates", path: "/dates" },
//   { label: "Combos", path: "/combos" },
//   { label: "Seeds", path: "/seeds" },
//   { label: "Berries", path: "/berries" },
//   { label: "Exotic Nuts", path: "/exotic-nuts" },
//   { label: "Spices", path: "/spices" },
// ];

// const mobileBottomNav = [
//   { label: "Home", path: "/", icon: Home },
//   { label: "Shop", path: "/shop", icon: Grid },
//   { label: "Cart", path: "/cart", icon: ShoppingCart },
//   { label: "Login", path: "/login", icon: User },
// ];

// const Navbar = () => {
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setShowUserMenu(false);
//     window.location.href = "/";
//   };

//   return (
//     <>
//       {/* 🔝 TOP HEADER */}
//       <div className="bg-black text-white text-xs md:text-sm px-4 py-2 flex justify-between items-center">
//         <span>📢 Free Shipping On Orders Above ₹1499/-</span>
//         <div className="hidden md:flex gap-4">
//           {topHeaderLinks.map((item, i) => (
//             <Link key={i} to={item.path} className="hover:underline">
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 MAIN NAVBAR */}
//       <header className="bg-white sticky top-0 z-50 shadow">
//         <div className="w-full px-4 py-3 flex items-center justify-between gap-2">

//           {/* LEFT: Burger + Logo */}
//           <div className="flex items-center gap-3">
//             <button
//               className="md:hidden"
//               onClick={() => setMobileMenu(!mobileMenu)}
//             >
//               {mobileMenu ? <X /> : <Menu />}
//             </button>

//             <Link to="/" className="flex-shrink-0">
//               <img
//                 src="https://thepixel.ai/wp-content/uploads/2024/04/Munch-logo.jpg"
//                 alt="Maati Munch"
//                 className="h-8 md:h-10"
//               />
//             </Link>
//           </div>

//           {/* CENTER: SEARCH */}
//           <div className="hidden md:flex flex-1 max-w-md mx-4">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search for products"
//                 className="w-full border rounded-full px-4 py-2 pr-10 text-sm"
//               />
//               <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
//             </div>
//           </div>

//           {/* RIGHT: ICONS */}
//           <div className="flex items-center gap-4">
            
//             {/* Mobile Search */}
//             <Search className="md:hidden" />

//             {/* Login / User Dropdown */}
//             <div className="relative">
//               {user ? (
//                 <>
//                   {/* Logged-in user */}
//                   <button
//                     onClick={() => setShowUserMenu(!showUserMenu)}
//                     className="flex items-center gap-2 hover:opacity-80 transition-opacity"
//                   >
//                     <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
//                       {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
//                     </div>
//                   </button>

//                   {showUserMenu && (
//                     <>
//                       {/* Backdrop */}
//                       <div 
//                         className="fixed inset-0 z-40" 
//                         onClick={() => setShowUserMenu(false)}
//                       />
                      
//                       {/* Dropdown Menu */}
//                       <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
//                         {/* User Info */}
//                         <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-4 text-white">
//                           <div className="flex items-center gap-3">
//                             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
//                               {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               {user.name && (
//                                 <div className="font-semibold text-sm truncate">
//                                   {user.name}
//                                 </div>
//                               )}
//                               <div className="text-xs text-white/90 truncate">
//                                 {user.email}
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Logout Button */}
//                         <div className="p-2">
//                           <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                             </svg>
//                             Logout
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 /* Not logged in */
//                 <Link to="/login" className="hover:text-gray-600 transition-colors">
//                   <User className="w-6 h-6" />
//                 </Link>
//               )}
//             </div>

//             {/* Cart */}
//             <Link to="/cart" className="hover:text-gray-600 relative">
//               <ShoppingCart />
//             </Link>

//           </div>

//         </div>

//         {/* DESKTOP MENU */}
//         <nav className="hidden md:flex justify-center bg-black text-white text-sm">
//           {menuItems.map((item, i) => (
//             <Link
//               key={i}
//               to={item.path}
//               className="px-4 py-3 hover:bg-gray-800"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </header>

//       {/* 📱 MOBILE SLIDE MENU */}
//       {mobileMenu && (
//         <div className="md:hidden bg-white shadow-lg p-4">
//           {menuItems.map((item, i) => (
//             <Link
//               key={i}
//               to={item.path}
//               className="block py-3 border-b text-sm"
//               onClick={() => setMobileMenu(false)}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 📱 MOBILE BOTTOM NAV (4 ITEMS) */}
//       <div className="fixed bottom-0 left-0 right-0 bg-black text-white md:hidden z-50">
//         <div className="flex justify-around py-2">
//           {mobileBottomNav.map((item, i) => {
//             const Icon = item.icon;
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={i}
//                 to={item.path}
//                 className={`flex flex-col items-center text-xs ${
//                   active ? "text-yellow-400" : "text-white"
//                 }`}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </Link>
//             );
//           })}
//         </div>
//       </div>

//     </>
//   );
// };

// export default Navbar;


// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Home,
  Grid,
} from "lucide-react";
import { useCart } from '../../../context/CartContext';
import Logo from '../../../assets/Logo.png'; 

const topHeaderLinks = [
  // { label: "Track Order", path: "/track-order" },
  // { label: "Backtopure Certificate", path: "/certificate" },
  // { label: "Franchise", path: "/franchise" },
  { label: "Bulk Order", path: "/bulk-order" },
  { label: "Contact Us", path: "/contact" },
];

const menuItems = [
  { label: "Shop", path: "/shop" },
  { label: "Blog" , path: "/blog" },
  { label: "Contact Us", path: "/contact" },
]; 

const mobileBottomNav = [
  { label: "Home", path: "/", icon: Home },
  { label: "Shop", path: "/shop", icon: Grid },
  { label: "Cart", path: "/cart", icon: ShoppingCart },
  { label: "Login", path: "/login", icon: User },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowUserMenu(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* 🔝 TOP HEADER */}
      <div className="bg-black text-white text-xs md:text-sm px-4 py-2 flex justify-between items-center">
        <span>📢 Free Shipping On Orders Above ₹1499/-</span>
        <div className="hidden md:flex gap-4">
          {topHeaderLinks.map((item, i) => (
            <Link key={i} to={item.path} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <header className="bg-white sticky top-0 z-50 shadow">
        <div className="w-full px-4 py-3 flex items-center justify-between gap-2">

          {/* LEFT: Burger + Logo */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>

            <Link to="/" className="flex-shrink-0">
              <img
                src={Logo}
                alt="Maati Munch"
                className="h-10 rounded-full w-10"
              />
            </Link>
          </div>

          {/* CENTER: SEARCH */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full border rounded-full px-4 py-2 pr-10 text-sm"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex items-center gap-4">
            
            {/* Mobile Search */}
            <Search className="md:hidden" />

            {/* Login / User Dropdown */}
            <div className="relative">
              {user ? (
                <>
                  {/* Logged-in user */}
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {showUserMenu && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                        {/* User Info */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm">
                              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              {user.name && (
                                <div className="font-semibold text-sm truncate">
                                  {user.name}
                                </div>
                              )}
                              <div className="text-xs text-white/90 truncate">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Logout Button */}
                        <div className="p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                /* Not logged in */
                <Link to="/login" className="hover:text-gray-600 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              )}
            </div>

            {/* Cart with Badge */}
            <Link to="/cart" className="hover:text-gray-600 relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex justify-center bg-black text-white text-sm">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="px-4 py-3 hover:bg-gray-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* 📱 MOBILE SLIDE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-lg p-4">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="block py-3 border-b text-sm"
              onClick={() => setMobileMenu(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* 📱 MOBILE BOTTOM NAV (4 ITEMS) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white md:hidden z-50">
        <div className="flex justify-around py-2">
          {mobileBottomNav.map((item, i) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            const isCart = item.path === '/cart';
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex flex-col items-center text-xs relative ${
                  active ? "text-yellow-400" : "text-white"
                }`}
              >
                <Icon size={18} />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1 left-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {cartCount}
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default Navbar;


