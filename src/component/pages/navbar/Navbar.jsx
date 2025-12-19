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
import { useCart } from "../../../context/CartContext";
import Logo from "../../../assets/Logo.png";

const topHeaderLinks = [
  { label: "Bulk Order", path: "/bulk-order" },
  { label: "Contact Us", path: "/contact" },
];

const menuItems = [
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
  const { cartCount } = useCart();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const [cartAnimate, setCartAnimate] = useState(false);

  // ✅ PROFILE STATES
  const [showProfile, setShowProfile] = useState(false); // mobile
  const [showDesktopProfile, setShowDesktopProfile] = useState(false); // desktop

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimate(true);
      const t = setTimeout(() => setCartAnimate(false), 700);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    setShowDesktopProfile(false);
    window.location.href = "/";
  };

  return (
    <>
      {/* 🔝 TOP HEADER */}
      <div className="bg-black text-white text-xs md:text-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>📢 Free Shipping On Orders Above ₹1499/-</span>
          <div className="hidden md:flex gap-4">
            {topHeaderLinks.map((l, i) => (
              <Link key={i} to={l.path} className="hover:underline">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <header className="bg-white sticky top-0 z-40 shadow">
        <div className="px-6 mx-auto flex items-center py-3 gap-10 justify-between">

          {/* LOGO + BRAND */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={Logo} alt="Maati Munch" className="h-10 w-10 rounded-full" />
            <span className="hidden md:block font-semibold text-lg tracking-wide">
              MaatiMunch
            </span>
          </Link>

          {/* MOBILE SEARCH */}
          <div className="flex-1 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* MOBILE MENU */}
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex w-[420px] mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full border rounded-full px-4 py-2 pr-10 text-sm"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-6 ml-auto">

            {/* CART */}
            <Link to="/cart" className="relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                    className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
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
                          className="block px-4 py-3 text-sm hover:bg-gray-50"
                          onClick={() => setShowDesktopProfile(false)}
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/orders"
                          className="block px-4 py-3 text-sm hover:bg-gray-50"
                          onClick={() => setShowDesktopProfile(false)}
                        >
                          My Orders
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <User />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex justify-center bg-black text-white text-sm">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path} className="px-4 py-3 hover:bg-gray-800">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* 📱 MOBILE SLIDE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow p-4">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className="block py-3 border-b text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* 📱 MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white md:hidden z-50">
        <div className="flex justify-around py-2">
          {mobileBottomNav.map((item, i) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link
                key={i}
                to={item.path}
                onClick={(e) => {
                  if (item.label === "Profile" && user) {
                    e.preventDefault();
                    setShowProfile(true);
                  }
                }}
                className={`flex flex-col items-center text-xs transition-all ${
                  active ? "text-yellow-400 scale-110" : "opacity-70"
                }`}
              >
                {item.label === "Profile" && user ? (
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name
                      ? user.name.charAt(0).toUpperCase()
                      : user.email.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <Icon
                    size={18}
                    className={
                      item.label === "Cart" && cartAnimate
                        ? "animate-cartBounce"
                        : ""
                    }
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 👤 MOBILE PROFILE SLIDE-UP */}
      {showProfile && user && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowProfile(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 z-50 animate-slideUp">
            <p className="font-semibold mb-2">{user.name}</p>
            <p className="text-xs text-gray-500 mb-4">{user.email}</p>

            <Link
              to="/profile"
              className="block py-3 border-b text-sm"
              onClick={() => setShowProfile(false)}
            >
              My Profile
            </Link>

            <Link
              to="/orders"
              className="block py-3 border-b text-sm"
              onClick={() => setShowProfile(false)}
            >
              My Orders
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left py-3 text-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
