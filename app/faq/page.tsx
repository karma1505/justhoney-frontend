"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is your honey 100% natural and pure?",
    answer: "Yes, all our honey is 100% natural, raw, and unprocessed. We never add any artificial ingredients, preservatives, or chemicals. Our honey is directly harvested from beehives and bottled without any processing."
  },
  {
    question: "How should I store my honey?",
    answer: "Store your honey in a cool, dry place away from direct sunlight. Keep the container tightly sealed. Honey doesn't need refrigeration and can last indefinitely when stored properly."
  },
  {
    question: "What's the difference between your honey varieties?",
    answer: "Each variety comes from different floral sources: Eucalyptus from eucalyptus forests, Jamun from black plum flowers, Solai from high-altitude wildflowers, Multi-Floral from various garden flowers, Wild Forest from untouched wilderness, and Premium Gold from our finest selection."
  },
  {
    question: "Is your honey suitable for diabetics?",
    answer: "While honey is a natural sweetener, it still contains sugars. We recommend consulting with your healthcare provider before consuming honey if you have diabetes. Our Jamun honey is traditionally known for its blood sugar regulating properties."
  },
  {
    question: "Do you ship nationwide?",
    answer: "Yes, we ship our honey products across India. We use secure packaging to ensure your honey arrives in perfect condition. Shipping charges and delivery times vary by location."
  },
  {
    question: "What if my honey crystallizes?",
    answer: "Crystallization is a natural process and indicates pure, unprocessed honey. To return it to liquid form, place the jar in warm water (not hot) or leave it in sunlight. Never microwave honey as it destroys beneficial enzymes."
  },
  {
    question: "How do I know your honey is authentic?",
    answer: "We are committed to transparency and quality. Our honey is sourced directly from trusted beekeepers, and we provide detailed information about origin and processing. We also offer batch tracking for premium products."
  },
  {
    question: "What's your return policy?",
    answer: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your honey, contact us within 30 days of purchase for a full refund or exchange."
  },
  {
    question: "Can I visit your apiary?",
    answer: "We occasionally offer apiary tours for educational purposes. Contact us to inquire about upcoming tour dates and availability. Tours are subject to weather conditions and seasonal factors."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer special pricing for bulk orders (10+ jars). Contact us directly for custom pricing and to discuss your requirements. We also provide corporate gifting solutions."
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="relative overflow-hidden text-gray-800 dark:text-gray-100 transition-theme duration-theme">
      {/* Hero Section */}
      <section className="relative bg-primary dark:bg-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-secondary dark:text-gold mb-6 font-montserrat"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white dark:text-gray-200 font-montserrat"
          >
            Find answers to common questions about our honey products, shipping, storage, and more.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-light dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-white dark:text-black rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-primary pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openItems.includes(index) ? "auto" : 0,
                    opacity: openItems.includes(index) ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary dark:text-gold mb-6"
          >
            Still Have Questions?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Can&apos;t find the answer you&apos;re looking for? Our honey experts are here to help you with any questions about our products.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="mailto:info@justhoney.com"
              className="inline-block bg-gold hover:bg-yellow-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Email Us
            </a>
            <a
              href="tel:+91-9876543210"
              className="inline-block bg-gold hover:bg-yellow-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Call Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
