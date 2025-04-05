"use client";
import Link from 'next/link'
import HoneyVarieties from './_components/HoneyVarieties'

export default function Home() {
  return (
    <div className="relative overflow-hidden text-gray-800 dark:text-gray-100 transition-theme duration-theme">
      {/* Hero Section */}
      <section className="relative bg-primary dark:bg-dark py-20 transition-theme duration-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-secondary dark:text-gold mb-6">
            Pure Organic Honey From The Heart Of India
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
            Discover nature's sweetness with our 100% NATURAL, CHEMICAL and ADULTERATION-FREE honey. Sustainably harvested, from hive to bottle.
          </p>
          <Link 
            href="/shop" 
            className="inline-block text-gray-800 dark:text-dark px-8 py-3 rounded-lg bg-gold hover:bg-amber-500 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 bg-light dark:bg-dark transition-theme duration-theme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-gold mb-12">
            Our Popular Variants
          </h2>
          <HoneyVarieties />
        </div>
      </section>
    </div>
  )
}