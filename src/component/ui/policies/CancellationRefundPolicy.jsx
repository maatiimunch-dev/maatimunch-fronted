import React, { useEffect } from 'react';
import { XCircle, RotateCcw, AlertTriangle, Package, Clock, CheckCircle, Mail, Phone, BadgeCheck } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CancellationRefundPolicy = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const policyHighlights = [
    {
      icon: XCircle,
      title: "Cancellation Window",
      description: "Request cancellation within 7 days of placing order",
      color: "from-red-500 to-rose-600",
      details: "Cancellations may not be entertained if vendors have initiated shipping"
    },
    {
      icon: Package,
      title: "Perishable Items",
      description: "No cancellations for flowers, eatables, etc.",
      color: "from-orange-500 to-amber-600",
      details: "Refund/replacement available if quality is not good"
    },
    {
      icon: AlertTriangle,
      title: "Damaged/Defective Items",
      description: "Report within 7 days of receipt",
      color: "from-yellow-500 to-orange-600",
      details: "Merchant will verify before processing request"
    },
    {
      icon: RotateCcw,
      title: "Refund Processing",
      description: "3-5 days for approved refunds",
      color: "from-green-500 to-emerald-600",
      details: "Once approved by MaatiMunch team"
    }
  ];

  const cancellationSteps = [
    { step: "1", title: "Submit Request", desc: "Contact us within 7 days of order placement", icon: Mail },
    { step: "2", title: "Review Process", desc: "Our team reviews your cancellation request", icon: Clock },
    { step: "3", title: "Check Status", desc: "We verify if shipping has been initiated", icon: Package },
    { step: "4", title: "Confirmation", desc: "Receive cancellation confirmation or denial", icon: CheckCircle }
  ];

  const refundScenarios = [
    {
      scenario: "Product Quality Issues",
      condition: "Customer establishes quality is not good",
      action: "Refund or Replacement provided",
      timeline: "After quality verification"
    },
    {
      scenario: "Damaged/Defective Items",
      condition: "Reported within 7 days of receipt",
      action: "Merchant verifies and approves",
      timeline: "Decision after merchant check"
    },
    {
      scenario: "Product Not As Shown",
      condition: "Reported within 7 days of receipt",
      action: "Customer service reviews complaint",
      timeline: "Appropriate decision taken"
    },
    {
      scenario: "Warranty Products",
      condition: "Manufacturer warranty applies",
      action: "Refer to manufacturer directly",
      timeline: "As per manufacturer policy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-16 px-4" data-aos="fade-down">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <RotateCcw className="w-16 h-16 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Cancellation & Refund</h1>
          </div>
          <p className="text-center text-rose-100 text-lg mt-4">
            Last updated: December 16, 2025
          </p>
          <p className="text-center text-white/90 mt-2 max-w-2xl mx-auto">
            We believe in helping our customers with a liberal cancellation and refund policy
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Our Commitment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-rose-500" data-aos="fade-up">
          <div className="flex items-start gap-4">
            <BadgeCheck className="w-8 h-8 text-rose-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment to You</h2>
              <p className="text-gray-600 leading-relaxed">
                MaatiMunch believes in helping its customers as far as possible, and has therefore adopted a liberal 
                cancellation and refund policy. We understand that circumstances change, and we're here to support you 
                through the process with transparency and fairness.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {policyHighlights.map((item, index) => (
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
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-white/90 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cancellation Process */}
        <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl shadow-lg p-8 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Cancellation Process</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 to-red-600 hidden md:block"></div>
            <div className="space-y-6">
              {cancellationSteps.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6"
                  data-aos="fade-right"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-5 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-5 h-5 text-rose-600" />
                      <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Refund Scenarios */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8 text-rose-600" />
            <h2 className="text-2xl font-bold text-gray-800">Refund Scenarios</h2>
          </div>
          <div className="grid gap-4">
            {refundScenarios.map((scenario, index) => (
              <div
                key={index}
                className="p-5 bg-gradient-to-r from-gray-50 to-rose-50 rounded-lg border border-gray-200 hover:border-rose-300 transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="font-bold text-gray-800 mb-3 text-lg">{scenario.scenario}</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Condition</p>
                    <p className="text-gray-700">{scenario.condition}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Action</p>
                    <p className="text-gray-700">{scenario.action}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold mb-1">Timeline</p>
                    <p className="text-gray-700">{scenario.timeline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Points */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-500" data-aos="fade-up">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-800">Important to Note</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2"></div>
                <span className="text-sm leading-relaxed">Cancellation requests after vendor shipping initiation may not be entertained</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2"></div>
                <span className="text-sm leading-relaxed">All complaints must be reported within 7 days of receipt</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2"></div>
                <span className="text-sm leading-relaxed">Merchant verification required for damaged/defective items</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border-t-4 border-green-500" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-green-600" />
              <h3 className="text-xl font-bold text-gray-800">Processing Time</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700 font-medium">Refund Approval</span>
                <span className="text-green-600 font-bold">By MaatiMunch</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-gray-700 font-medium">Processing Duration</span>
                <span className="text-green-600 font-bold">3-5 Days</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mt-2">
                Once your refund is approved by MaatiMunch, it will take 3-5 days for the refund to be processed to your account.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl shadow-xl p-8 text-white" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Need Help with Cancellation or Refund?</h2>
          </div>
          <p className="mb-6 text-rose-50 leading-relaxed">
            Our Customer Service team is here to assist you. Contact us for any queries regarding cancellations, 
            refunds, or product quality issues.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6" />
                <h4 className="font-semibold text-lg">Phone Support</h4>
              </div>
              <a href="tel:8826448538" className="text-rose-100 hover:text-white transition-colors text-lg font-medium">
                8826448538
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6" />
                <h4 className="font-semibold text-lg">Email Support</h4>
              </div>
              <a href="mailto:maatiimunch@gmail.com" className="text-rose-100 hover:text-white transition-colors break-all">
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

export default CancellationRefundPolicy;