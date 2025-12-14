// import React, { useState } from "react";
// import { Menu, Search, ShoppingCart, User, Heart, Home, Grid, Store } from "lucide-react";

// const topLinks = [
//   "Track Order",
//   "Backtoure Certificate",
//   "Franchise",
//   "Bulk Order",
//   "Contact Us",
// ];

// const navItems = [
//   { label: "Shop" },
//   { label: "Jumbo Nuts" },
//   { label: "Snacking" },
//   { label: "Dates" },
//   { label: "Combos" },
//   { label: "Seeds" },
//   { label: "Berries" },
//   { label: "Exotic Nuts" },
//   { label: "Spices" },
//   { label: "Bulk Shop" },
// ];

// const categories = ["Almond", "Cashew", "Pista", "Raisin", "Walnut"];

// const Navbar = () => {
//   const [showSearch, setShowSearch] = useState(false);

//   return (
//     <>
//       {/* 🔹 TOP HEADER */}
//       <div className="hidden md:flex justify-between items-center px-6 py-2 bg-black text-white text-sm">
//         <span>📢 Free Shipping On Orders Above ₹1499/-</span>
//         <div className="flex gap-4">
//           {topLinks.map((item, i) => (
//             <span key={i} className="cursor-pointer hover:underline">
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 MAIN NAVBAR */}
//       <div className="sticky top-0 z-50 bg-white border-b">
//         <div className="flex items-center justify-between px-4 md:px-8 py-3">
//           {/* Mobile menu */}
//           <button className="md:hidden">
//             <Menu />
//           </button>

//           {/* Logo */}
//           <img src="https://thepixel.ai/wp-content/uploads/2024/04/Munch-logo.jpg" alt="Nutraj" className="h-8 md:h-10" />

//           {/* Desktop Search */}
//           <div className="hidden md:flex flex-1 mx-8 border rounded-full overflow-hidden">
//             <select className="px-4 outline-none">
//               <option>All Categories</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Search For Raisin"
//               className="flex-1 px-4 outline-none"
//             />
//             <button className="px-4">
//               <Search />
//             </button>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-4">
//             <Search
//               className="md:hidden cursor-pointer"
//               onClick={() => setShowSearch(!showSearch)}
//             />
//             <User className="hidden md:block cursor-pointer" />
//             <Heart className="hidden md:block cursor-pointer" />
//             <ShoppingCart className="cursor-pointer" />
//           </div>
//         </div>

//         {/* Mobile Search Dropdown */}
//         {showSearch && (
//           <div className="md:hidden px-4 pb-3">
//             <input
//               type="text"
//               placeholder="Search products"
//               className="w-full border rounded-full px-4 py-2"
//             />
//             <div className="grid grid-cols-2 gap-2 mt-2">
//               {categories.map((cat, i) => (
//                 <button
//                   key={i}
//                   className="border rounded-lg py-2 text-sm"
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Desktop Menu */}
//         <div className="hidden md:flex justify-center gap-6 py-3 bg-black text-white text-sm">
//           {navItems.map((item, i) => (
//             <span key={i} className="cursor-pointer hover:underline">
//               {item.label}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 MOBILE BOTTOM NAV (4 items only) */}
//       <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black text-white flex justify-around py-3 z-50">
//         <div className="flex flex-col items-center text-xs">
//           <Home size={18} /> Home
//         </div>
//         <div className="flex flex-col items-center text-xs">
//           <Grid size={18} /> Shop
//         </div>
//         <div className="flex flex-col items-center text-xs">
//           <ShoppingCart size={18} /> Cart
//         </div>
//         <div className="flex flex-col items-center text-xs">
//           <User size={18} /> Login
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;










import React, { useState } from "react";
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

const topHeaderLinks = [
  { label: "Track Order", path: "/track-order" },
  { label: "Backtopure Certificate", path: "/certificate" },
  { label: "Franchise", path: "/franchise" },
  { label: "Bulk Order", path: "/bulk-order" },
  { label: "Contact Us", path: "/contact" },
];

const menuItems = [
  { label: "Shop", path: "/shop" },
  { label: "Jumbo Nuts", path: "/jumbo-nuts" },
  { label: "Snacking", path: "/snacking" },
  { label: "Dates", path: "/dates" },
  { label: "Combos", path: "/combos" },
  { label: "Seeds", path: "/seeds" },
  { label: "Berries", path: "/berries" },
  { label: "Exotic Nuts", path: "/exotic-nuts" },
  { label: "Spices", path: "/spices" },
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
                src="https://thepixel.ai/wp-content/uploads/2024/04/Munch-logo.jpg"
                alt="Nutraj"
                className="h-8 md:h-10"
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

  {/* Login */}
  <Link to="/login" className="hover:text-gray-600">
    <User />
  </Link>

  {/* Cart */}
  <Link to="/cart" className="hover:text-gray-600 relative">
    <ShoppingCart />
    {/* Cart count (optional) */}
    {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">0</span> */}
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
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex flex-col items-center text-xs ${
                  active ? "text-yellow-400" : "text-white"
                }`}
              >
                <Icon size={18} />
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
