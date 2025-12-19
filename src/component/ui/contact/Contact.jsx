import React, { useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding, FaClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const contactInfo = [
    {
      icon: <FaBuilding className="text-3xl" />,
      title: "Legal Entity",
      content: "MaatiMunch",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone",
      content: "8826448538",
      link: "tel:8826448538",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      content: "maatiimunch@gmail.com",
      link: "mailto:maatiimunch@gmail.com",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Registered Address",
      content: "Khutanua, Village Goth, P.S. Khutanua, Madhuban Tola, Khutauna, Madhubani, Bihar, 847227 Teghra BO",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Operational Address",
      content: "Khutanua, Village Goth, P.S. Khutanua, Madhuban Tola, Khutauna, Madhubani, Bihar, 847227 Teghra BO",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] bg-black/50 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-4 text-center"
            data-aos="fade-down"
          >
            Contact Us
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-200 text-center max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We'd love to hear from you. Reach out to us for any queries or support.
          </p>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Last updated on Dec 16, 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>

                {/* Content */}
                {item.link ? (
                  <a
                    href={item.link}
                    className={`text-gray-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r ${item.color} transition-all duration-300 inline-block`}
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                )}
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-5 rounded-bl-full`} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div 
          className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <FaClock className="text-5xl mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            We're Here to Help
          </h3>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Our team is ready to assist you with any questions or concerns. Feel free to reach out through any of the channels above.
          </p>
          <a
            href="mailto:maatiimunch@gmail.com"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Send us an Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;