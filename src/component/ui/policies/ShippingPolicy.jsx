import React, { useEffect } from 'react';
import { Package, Truck, Globe, MapPin, Clock, Mail, Phone, CheckCircle, AlertTriangle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ShippingPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const deliveryInfo = [
    {
      icon: Globe,
      title: "International Shipping",
      description: "Orders shipped via registered international courier companies and/or International speed post",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Truck,
      title: "Domestic Shipping",
      description: "Orders shipped through registered domestic courier companies and/or speed post",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Processing Time",
      description: "Orders shipped within 0-7 days or as per delivery date agreed at order confirmation",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: MapPin,
      title: "Delivery Address",
      description: "All orders delivered to the address provided by buyer at the time of purchase",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const importantNotes = [
    {
      icon: AlertTriangle,
      text: "MaatiMunch is not liable for delays by courier company/postal authorities"
    },
    {
      icon: CheckCircle,
      text: "We guarantee handover to courier within 0-7 days from order date"
    },
    {
      icon: Mail,
      text: "Service delivery confirmation sent to your registered email ID"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4" data-aos="fade-down">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-16 h-16 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Shipping & Delivery</h1>
          </div>
          <p className="text-center text-blue-100 text-lg mt-4">
            Last updated: December 16, 2025
          </p>
          <p className="text-center text-white/90 mt-2 max-w-2xl mx-auto">
            Fast, reliable, and secure delivery to your doorstep
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Delivery Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {deliveryInfo.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`bg-gradient-to-r ${item.color} p-6`}>
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Important Information</h2>
          </div>
          <div className="space-y-4">
            {importantNotes.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
                <note.icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">{note.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Process Timeline */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Delivery Process</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-600 hidden md:block"></div>
            <div className="space-y-8">
              {[
                { step: "1", title: "Order Placed", desc: "Your order is confirmed and payment processed" },
                { step: "2", title: "Processing", desc: "Order prepared within 0-7 days or agreed delivery date" },
                { step: "3", title: "Shipped", desc: "Handed over to courier company/postal service" },
                { step: "4", title: "In Transit", desc: "Package on the way to your delivery address" },
                { step: "5", title: "Delivered", desc: "Order successfully delivered to your doorstep" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-500" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-800">Delivery Timeline:</strong> Orders are shipped within 0-7 days from the date of order and payment, 
              or as per the delivery date agreed at the time of order confirmation. Final delivery is subject to courier company/post office norms.
            </p>
            <p>
              <strong className="text-gray-800">Liability:</strong> MaatiMunch guarantees to hand over the consignment to the courier company 
              or postal authorities within the specified timeframe but is not liable for any subsequent delays in delivery by the courier company 
              or postal authorities.
            </p>
            <p>
              <strong className="text-gray-800">Delivery Address:</strong> All orders will be delivered to the address provided by the buyer 
              at the time of order placement. Please ensure your delivery address is accurate and complete.
            </p>
            <p>
              <strong className="text-gray-800">Service Confirmation:</strong> Delivery of our services will be confirmed via email to the 
              address specified during registration.
            </p>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Need Help?</h2>
          </div>
          <p className="mb-6 text-blue-50 leading-relaxed">
            For any issues in utilizing our services or tracking your delivery, feel free to contact our helpdesk. 
            We're here to assist you!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6" />
                <h4 className="font-semibold text-lg">Phone Support</h4>
              </div>
              <a href="tel:8826448538" className="text-blue-100 hover:text-white transition-colors text-lg font-medium">
                8826448538
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6" />
                <h4 className="font-semibold text-lg">Email Support</h4>
              </div>
              <a href="mailto:maatiimunch@gmail.com" className="text-blue-100 hover:text-white transition-colors break-all">
                maatiimunch@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm" data-aos="fade-up">
          <p>© 2025 MaatiMunch. All rights reserved. This policy is subject to change without prior notice.</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;