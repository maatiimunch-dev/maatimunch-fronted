import React, { useEffect } from 'react';
import { FileText, Shield, AlertCircle, Link2, Copyright, Scale, CreditCard, Info, CheckCircle2 } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TermsConditions = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const definitions = [
    {
      term: '"We", "Us", "Our"',
      definition: 'Refers to MaatiMunch, registered at Khutanua, Village Goth, Madhubani, Bihar, 847227'
    },
    {
      term: '"You", "Your", "User", "Visitor"',
      definition: 'Any natural or legal person visiting our website and/or purchasing from us'
    }
  ];

  const termsSection = [
    {
      icon: AlertCircle,
      title: "Website Content",
      color: "from-red-500 to-orange-600",
      points: [
        "Content on website pages is subject to change without notice",
        "No warranty provided for accuracy, timeliness, or completeness of information",
        "Information may contain inaccuracies or errors",
        "We exclude liability for inaccuracies to the fullest extent permitted by law"
      ]
    },
    {
      icon: Shield,
      title: "User Responsibility",
      color: "from-blue-500 to-indigo-600",
      points: [
        "Use of information or materials is entirely at your own risk",
        "We shall not be liable for any consequences of use",
        "Your responsibility to ensure products/services meet your requirements",
        "Verify suitability before making any purchase decisions"
      ]
    },
    {
      icon: Copyright,
      title: "Intellectual Property",
      color: "from-purple-500 to-pink-600",
      points: [
        "Website material is owned by or licensed to us",
        "Includes design, layout, look, appearance, and graphics",
        "Reproduction prohibited except as per copyright notice",
        "All trademarks reproduced are duly acknowledged"
      ]
    },
    {
      icon: Link2,
      title: "Links & External Sites",
      color: "from-green-500 to-emerald-600",
      points: [
        "Website may include links to other websites for convenience",
        "External links provided for additional information only",
        "Cannot create links to our website without prior written consent",
        "Not responsible for content on external websites"
      ]
    },
    {
      icon: Scale,
      title: "Legal Jurisdiction",
      color: "from-amber-500 to-yellow-600",
      points: [
        "All disputes subject to the laws of India",
        "Unauthorized use may result in claim for damages",
        "Unauthorized use may be a criminal offense",
        "Legal proceedings will be under Indian jurisdiction"
      ]
    },
    {
      icon: CreditCard,
      title: "Payment & Transactions",
      color: "from-cyan-500 to-blue-600",
      points: [
        "No liability for declined authorization due to preset limits",
        "Limits mutually agreed with our acquiring bank",
        "Cardholder responsible for staying within limits",
        "No liability for loss/damage from declined transactions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 text-white py-16 px-4" data-aos="fade-down">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-16 h-16 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
          </div>
          <p className="text-center text-gray-300 text-lg mt-4">
            Last updated: December 16, 2025
          </p>
          <p className="text-center text-white/90 mt-2 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website or services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Definitions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-slate-600" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-slate-600" />
            <h2 className="text-2xl font-bold text-gray-800">Definitions</h2>
          </div>
          <div className="space-y-4">
            {definitions.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 rounded-lg"
                data-aos="fade-right"
                data-aos-delay={index * 100}
              >
                <h3 className="font-bold text-slate-800 mb-2">{item.term}</h3>
                <p className="text-gray-600 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 mb-8 border border-blue-200" data-aos="fade-up">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              Your use of the website and/or purchase from us are governed by the following Terms and Conditions. 
              By accessing our website or making a purchase, you agree to be bound by these terms.
            </p>
          </div>
        </div>

        {/* Terms Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {termsSection.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`bg-gradient-to-r ${section.color} p-6`}>
                <div className="flex items-center gap-3 text-white">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <section.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2"></div>
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notices */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-800">Important Notices</h2>
          </div>
          <div className="space-y-6">
            <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Disclaimer of Warranties</h3>
              <p className="text-gray-700 leading-relaxed">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, 
                performance, completeness or suitability of the information and materials found or offered on this 
                website for any particular purpose. You acknowledge that such information and materials may contain 
                inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the 
                fullest extent permitted by law.
              </p>
            </div>

            <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Unauthorized Use</h3>
              <p className="text-gray-700 leading-relaxed">
                Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a 
                criminal offense. This includes but is not limited to reproduction, distribution, or commercial use 
                of our content without proper authorization.
              </p>
            </div>

            <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Third-Party Links</h3>
              <p className="text-gray-700 leading-relaxed">
                From time to time our website may also include links to other websites. These links are provided 
                for your convenience to provide further information. They do not signify that we endorse the 
                website(s). We have no responsibility for the content of the linked website(s).
              </p>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-gradient-to-r from-slate-700 to-gray-800 rounded-2xl shadow-xl p-8 text-white" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
          </div>
          <p className="text-gray-200 leading-relaxed mb-4">
            By using our website, purchasing our products, or engaging with our services, you acknowledge that you 
            have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with 
            any part of these terms, please do not use our website or services.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
            <p className="text-gray-200 text-sm">
              <strong>Registered Office:</strong> Khutanua, Village Goth, P.S. Khutanua, Madhuban Tola, 
              Madhubani, Bihar, 847227 Teghra BO BIHAR 847227
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm" data-aos="fade-up">
          <p>© 2025 MaatiMunch. All rights reserved. These terms are subject to change without prior notice.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;