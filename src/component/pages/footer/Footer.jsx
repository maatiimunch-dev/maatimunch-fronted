import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import Logo from "../../../assets/Logo.png";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
  ],
  quickLinks: [
    { name: "Blog", path: "/blog" },
    { name: "Gifting", path: "/gifting" },
    { name: "Bulk Order", path: "/bulk-order" },
    { name: "Contact Us", path: "/contact" },
  ],
  policies: [
    { name: "Cancellation & Refund Policy", path: "/cancellation-refund-policy" },
    { name: "Terms & Conditions", path: "/terms conditions" },
    { name: "Shipping & Delivery Policy", path: "/shipping policy" },
    { name: "Privacy Policy", path: "/privacy policy" },
  ],
  offices: ["Delhi"],
};


const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white px-6 pt-14 pb-10">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <img src={Logo} alt="Maati Munch" className="w-30 h-30 rounded-full mb-6" />

            <div className="space-y-3 text-sm text-gray-300">
  <p className="flex items-start gap-3">
    <FaMapMarkerAlt className="mt-1" />
    Registered & Operational Address: Khutanua, Village Goth, P.S. Khutanua,
    Madhuban Tola, Khutauna, Madhubani, Bihar – 847227 (Teghra BO, BIHAR)
  </p>

  <p className="flex items-center gap-3">
    <FaPhoneAlt /> +91-8826448538
  </p>

  <p className="flex items-center gap-3">
    <FaEnvelope /> maatiimunch@gmail.com
  </p>
</div>

          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg mb-4">
              Subscribe to our newsletter for updates and special offers!
            </h3>
            <div className="flex rounded-full overflow-hidden border border-white">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="bg-transparent px-4 py-2 w-full outline-none"
              />
              <button className="bg-white text-black px-6 font-semibold">
                SUBSCRIBE
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>FSSAI License No. - xxxxxxxxx</p>
              <p>FSSAI License No. - xxxxxx</p>
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-700" />

        {/* Bottom Links */}
       <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
  
  {/* Company */}
  <div>
    <h4 className="font-semibold mb-4">Company</h4>
    {footerLinks.company.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="block text-gray-400 hover:text-white mb-2"
      >
        {item.name}
      </Link>
    ))}
  </div>

  {/* Quick Links */}
  <div>
    <h4 className="font-semibold mb-4">Quick Links</h4>
    {footerLinks.quickLinks.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="block text-gray-400 hover:text-white mb-2"
      >
        {item.name}
      </Link>
    ))}
  </div>

  {/* Policies */}
  <div>
    <h4 className="font-semibold mb-4">Policies</h4>
    {footerLinks.policies.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="block text-gray-400 hover:text-white mb-2"
      >
        {item.name}
      </Link>
    ))}
  </div>

  {/* Offices */}
  <div>
    <h4 className="font-semibold mb-4">Our Regional Offices</h4>
    {footerLinks.offices.map((city) => (
      <p key={city} className="text-gray-400 mb-2">
        {city}
      </p>
    ))}
  </div>

</div>

      </footer>

    </>
  );
};

export default Footer;
