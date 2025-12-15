import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

const footerLinks = {
  company: [
    { name: "About Us", path: "/about" },
    { name: "CSR Policy", path: "/csr-policy" },
    { name: "Leadership", path: "/leadership" },
    { name: "Certifications", path: "/certifications" },
    { name: "Careers", path: "/careers" },
    { name: "Awards & Recognition", path: "/awards" },
  ],
  expertise: [
    { name: "Private Label", path: "/private-label" },
    { name: "Institutional", path: "/institutional" },
    { name: "Wholesale", path: "/wholesale" },
    { name: "Modern Trade", path: "/modern-trade" },
    { name: "Export Import", path: "/export-import" },
    { name: "Quality & Safety", path: "/quality-safety" },
  ],
  quickLinks: [
    { name: "Blog", path: "/blog" },
    { name: "Gifting", path: "/gifting" },
    { name: "Bulk Order", path: "/bulk-order" },
    { name: "Franchise With Us", path: "/franchise" },
    { name: "Maati Munch Coupon Code", path: "/offers" },
  ],
  offices: ["Delhi"],
  partners: [
    "Amazon",
    "Flipkart",
    "Jiomart",
    "DMart",
    "BigBasket",
    "Paytm",
    "Reliance Retail",
    "Grofers",
    "Paytm Mall",
    "LOTS",
    "Swiggy Instamart",
    "ITC",
  ],
};

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white px-6 pt-14 pb-10">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <img src="/logo.png" alt="Maati Munch" className="w-40 mb-6" />

            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1" />
                Pegasus Tower, Office No. 702, 7th Floor, Sector 68, Noida, Uttar
                Pradesh 201307
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt /> +91-9971095414
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope /> customercare@Maati Munch.com
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
              <p>FSSAI License No. - 10016051001876</p>
              <p>FSSAI License No. - 10017061000315</p>
            </div>
          </div>
        </div>

        <hr className="my-12 border-gray-700" />

        {/* Bottom Links */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
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

          {/* Expertise */}
          <div>
            <h4 className="font-semibold mb-4">Our Expertise</h4>
            {footerLinks.expertise.map((item) => (
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

          {/* Offices */}
          <div>
            <h4 className="font-semibold mb-4">Our Regional Offices</h4>
            {footerLinks.offices.map((city) => (
              <p key={city} className="text-gray-400 mb-2">
                {city}
              </p>
            ))}
          </div>

          {/* Partners */}
          {/* <div>
            <h4 className="font-semibold mb-4">Our Partners</h4>
            {footerLinks.partners.map((partner) => (
              <p key={partner} className="text-gray-400 mb-2">
                {partner}
              </p>
            ))}
          </div> */}
        </div>
      </footer>

    </>
  );
};

export default Footer;
