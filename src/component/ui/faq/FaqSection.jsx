import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: "What types of makhana products do you offer?",
    answer: "We offer premium quality plain makhana, roasted makhana, flavored makhana, combo packs, and bulk packs suitable for daily snacking, fasting, and gifting.",
  },
  {
    question: "Is your makhana organic and natural?",
    answer: "Yes, our makhana is sourced directly from trusted farmers and is 100% natural. Selected products are organic and free from artificial preservatives.",
  },
  {
    question: "Are the makhana products roasted or raw?",
    answer: "We provide both raw makhana and hygienically roasted makhana in various flavors like salt & pepper, peri peri, pudina, and more.",
  },
  {
    question: "What is the shelf life of makhana?",
    answer: "Our makhana typically has a shelf life of 6–9 months when stored in a cool, dry place in an airtight container.",
  },
  {
    question: "Is makhana suitable for fasting (vrat) and dieting?",
    answer: "Yes, makhana is ideal for fasting, weight management, and healthy diets. It is low in calories, gluten-free, and rich in protein and fiber.",
  },
  {
    question: "Do you offer bulk or wholesale orders?",
    answer: "Yes, we accept bulk and wholesale orders for retailers, events, corporate gifting, and institutions at special pricing.",
  },
  {
    question: "Can I order makhana combos or gift packs?",
    answer: "Absolutely. We offer curated combo packs and premium gift boxes perfect for festivals, weddings, and corporate gifting.",
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are usually delivered within 3–7 working days depending on your location. Express delivery options are also available.",
  },
  {
    question: "Do you ship across India?",
    answer: "Yes, we ship pan-India using reliable courier partners to ensure safe and fresh delivery.",
  },
  {
    question: "How can I place an order or contact support?",
    answer: "You can place an order directly through our website or contact us via WhatsApp, phone, or email for any assistance.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
   return (
    <section className="bg-gray-50 py-16 px-6 md:px-20  sm:mt-4 ">
      <div className="max-w-5xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Everything you need to know about our labels, services, and processes.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-white rounded-lg shadow-sm"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                {faq.question}
                {activeIndex === index ? (
                  <FaChevronUp className="text-orange-500" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{
                  maxHeight:
                    activeIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : '0px',
                }}
                className="px-6 overflow-hidden transition-all duration-500 ease-in-out text-gray-600"
              >
                <div className="py-4">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;