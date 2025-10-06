"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
  benefits: string[];
  detailedDescription: string;
  nutritionalInfo: string[];
  storageInstructions: string;
  origin: string;
}

const products: Product[] = [
  {
    id: "eucalyptus",
    name: "Eucalyptus Honey",
    type: "Raw & Pure",
    price: 450,
    image: "/products/eucalyptus.jpg",
    description: "Sourced from eucalyptus forests, this honey has a distinctive flavor with natural antibacterial properties.",
    benefits: ["Antibacterial", "Respiratory Health", "Natural Sweetener"],
    detailedDescription: "Harvested from pristine eucalyptus forests of South India. Known for its distinctive menthol-like flavor and powerful antibacterial properties. Perfect for respiratory health and immune support.",
    nutritionalInfo: ["High in Antioxidants", "Natural Enzymes", "Mineral Rich", "Low Glycemic Index"],
    storageInstructions: "Store in a cool, dry place away from direct sunlight. Keep tightly sealed to maintain freshness.",
    origin: "South Indian Eucalyptus Forests"
  },
  {
    id: "jamun",
    name: "Jamun Honey",
    type: "Wild Forest",
    price: 550,
    image: "/products/jamun.jpg",
    description: "Rare honey from jamun (black plum) flowers, known for its unique taste and medicinal properties.",
    benefits: ["Antioxidant Rich", "Blood Sugar Control", "Digestive Health"],
    detailedDescription: "A rare variety from Indian black plum tree flowers. Distinctive dark color with rich, complex flavor. Traditionally used in Ayurveda for blood sugar regulation.",
    nutritionalInfo: ["Blood Sugar Friendly", "High Antioxidants", "Digestive Enzymes", "Mineral Dense"],
    storageInstructions: "Store in original container in a cool, dark place. Refrigeration not required but recommended for extended shelf life.",
    origin: "Wild Jamun Forests of Central India"
  },
  {
    id: "solai",
    name: "Solai Honey",
    type: "Mountain Pure",
    price: 650,
    image: "/products/solai.jpg",
    description: "Premium honey from high-altitude regions, known for its purity and exceptional quality.",
    benefits: ["High Altitude", "Pure & Natural", "Premium Quality"],
    detailedDescription: "Premium honey from high-altitude mountain regions above 3000 feet. Collected from diverse wildflowers, resulting in complex flavor and exceptional purity.",
    nutritionalInfo: ["Mountain Wildflower Blend", "High Purity", "Rich Minerals", "Natural Vitamins"],
    storageInstructions: "Store in a cool, dry place. The high altitude origin makes it naturally stable and long-lasting.",
    origin: "High Altitude Mountain Regions (3000+ ft)"
  },
  {
    id: "multi-floral",
    name: "Multi-Floral Honey",
    type: "Garden Blend",
    price: 350,
    image: "/products/eucalyptus.jpg",
    description: "A delightful blend of various flower nectars, offering a balanced taste and aroma.",
    benefits: ["Balanced Taste", "Versatile", "Daily Use"],
    detailedDescription: "A harmonious blend of nectar from various flowering plants and trees. Versatile honey with well-balanced flavor, perfect for daily consumption.",
    nutritionalInfo: ["Balanced Nutrition", "Multiple Flower Sources", "Daily Use Friendly", "Versatile Flavor"],
    storageInstructions: "Store at room temperature in a dry place. Perfect for daily use in teas, smoothies, and cooking.",
    origin: "Mixed Floral Sources from Organic Gardens"
  },
  {
    id: "wild-forest",
    name: "Wild Forest Honey",
    type: "Untamed Nature",
    price: 750,
    image: "/products/jamun.jpg",
    description: "Collected from wild forest areas, this honey represents the pure essence of untouched nature.",
    benefits: ["Wild Sourced", "Pure Essence", "Natural Wild"],
    detailedDescription: "Collected from untouched wilderness where bees forage on wild, uncultivated flowers. Captures the true essence of nature with raw, unprocessed character.",
    nutritionalInfo: ["Wild Sourced", "Unprocessed", "Seasonal Varieties", "Natural Wild"],
    storageInstructions: "Store in a cool, dark place. The wild nature means it may crystallize naturally - this is normal and indicates purity.",
    origin: "Untouched Wild Forest Areas"
  },
  {
    id: "premium-gold",
    name: "Premium Gold Honey",
    type: "Luxury Collection",
    price: 850,
    image: "/products/solai.jpg",
    description: "Our finest honey selection, carefully curated for the most discerning honey connoisseurs.",
    benefits: ["Luxury Grade", "Rare Collection", "Connoisseur Choice"],
    detailedDescription: "The pinnacle of our collection. Carefully selected from the finest batches, aged to perfection, and packaged in premium containers for discerning connoisseurs.",
    nutritionalInfo: ["Premium Grade", "Aged to Perfection", "Exclusive Selection", "Connoisseur Quality"],
    storageInstructions: "Store in the original premium packaging. Handle with care to preserve the luxury experience.",
    origin: "Exclusive Premium Selection"
  }
];

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
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
            Our Honey Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white dark:text-gray-200 font-montserrat"
          >
            Discover our premium collection of 100% natural, chemical-free honey varieties, each with its own unique character and health benefits.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-white dark:text-black rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.type}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">per 500g</span>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 bg-gold hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium"
                    >
                      View Details
                    </button>
                    <button className="bg-primary hover:bg-navy text-white py-2 px-4 rounded-lg transition-colors font-medium">
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary dark:text-gold mb-6"
          >
            Can&apos;t Decide? We&apos;re Here to Help!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Our honey experts are ready to help you choose the perfect honey for your needs. 
            Contact us for personalized recommendations.
          </motion.p>
          <Link
            href="/contact"
            className="inline-block bg-gold hover:bg-yellow-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            Get Personalized Recommendations
          </Link>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white dark:bg-white dark:text-black rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 md:h-full">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProduct.type}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    {selectedProduct.name}
                  </h2>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-primary">
                      ₹{selectedProduct.price}
                    </span>
                    <span className="text-gray-500">per 500g</span>
                  </div>

                  {/* Detailed Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">About This Honey</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.detailedDescription}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">Key Benefits</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 bg-gold hover:bg-yellow-600 text-white py-3 px-6 rounded-lg transition-colors font-medium">
                      Order Now
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}