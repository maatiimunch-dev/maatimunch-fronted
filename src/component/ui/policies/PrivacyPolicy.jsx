import React, { useEffect } from 'react';
import { Shield, Lock, Cookie, Mail, FileText, UserCheck, AlertCircle, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Name and contact information including email address",
        "Demographic information such as postcode, preferences and interests",
        "Other information relevant to customer surveys and/or offers"
      ]
    },
    {
      icon: FileText,
      title: "How We Use Your Information",
      content: [
        "Internal record keeping and service improvement",
        "Sending promotional emails about new products and special offers",
        "Market research purposes via email, phone, fax or mail",
        "Customizing the website according to your interests"
      ]
    },
    {
      icon: Lock,
      title: "Security Measures",
      content: [
        "We are committed to ensuring that your information is secure",
        "Suitable measures are in place to prevent unauthorised access or disclosure",
        "Your data is protected with industry-standard security protocols"
      ]
    },
    {
      icon: Cookie,
      title: "Cookie Policy",
      content: [
        "We use traffic log cookies to identify which pages are being used",
        "Cookies help us analyze data about webpage traffic",
        "Information is used for statistical analysis only",
        "You can choose to accept or decline cookies in your browser settings"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Control",
      content: [
        "Opt-out of direct marketing by unchecking boxes on forms",
        "Change your marketing preferences anytime by contacting us",
        "Request correction of incorrect or incomplete information",
        "We will not sell, distribute or lease your information without permission"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-16 px-4" data-aos="fade-down">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-16 h-16 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-center text-emerald-100 text-lg mt-4">
            Last updated: December 16, 2025
          </p>
          <p className="text-center text-white/90 mt-2 max-w-2xl mx-auto">
            MaatiMunch is committed to protecting your privacy and ensuring your personal information is handled responsibly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-emerald-500" data-aos="fade-up">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment to You</h2>
              <p className="text-gray-600 leading-relaxed">
                This privacy policy outlines how MaatiMunch uses and protects any information you provide when visiting our website 
                or making a purchase. We are dedicated to ensuring your privacy is protected and will only use your information 
                in accordance with this privacy statement. We may update this policy periodically, so please check this page regularly.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <section.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <ChevronRight className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8 text-white" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Contact Us</h2>
          </div>
          <p className="mb-6 text-emerald-50 leading-relaxed">
            If you believe any information we hold is incorrect or incomplete, or if you wish to change your marketing 
            preferences, please contact us. We will promptly correct any information found to be incorrect.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </h4>
              <a href="mailto:maatiimunch@gmail.com" className="text-emerald-100 hover:text-white transition-colors text-sm">
                maatiimunch@gmail.com
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Phone
              </h4>
              <a href="tel:8826448538" className="text-emerald-100 hover:text-white transition-colors text-sm">
                8826448538
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Address
              </h4>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Khutanua, Village Goth, Madhubani, Bihar, 847227
              </p>
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

export default PrivacyPolicy;