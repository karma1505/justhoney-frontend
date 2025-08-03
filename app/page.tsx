"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HoneyVarieties from "./components/ui/honey-varieties";

interface Founder {
  name: string;
  role: string;
  designation: string;
  image: string;
}

const founders: Founder[] = [
  {
    name: "Ekta Upadhyay",
    role: "Beekeeping & Production",
    designation: "Co-Founder, CEO",
    image: "/founders/ekta.jpg",
  },
  {
    name: "Madhu",
    role: "Full Time Queen Bee, Part Time Mascot",
    designation: "Head of Operations",
    image: "/founders/madhu.jpg",
  },
  {
    name: "Karmanya Singh",
    role: "Customer Experience",
    designation: "Co-Founder, CTO",
    image: "/founders/karmanya.jpg",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden text-gray-800 dark:text-gray-100 transition-theme duration-theme">
      {/* Hero Section */}
      <section className="relative bg-primary dark:bg-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-secondary dark:text-gold mb-6 font-montserrat"
          >
            Pure Organic Honey From The Heart Of India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-800 dark:text-gray-200 font-montserrat"
          >
            Discover nature&apos;s sweetness with our 100% NATURAL, CHEMICAL and ADULTERATION-FREE honey. Sustainably harvested, from hive to bottle.
          </motion.p>
          <Link
            href="/shop"
            className="inline-block text-gray-800 dark:text-dark px-8 py-3 rounded-lg bg-gold hover:bg-yellow-600 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-light dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-gold mb-12">
            Our Popular Variants
          </h2>
          <HoneyVarieties />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-primary dark:text-gold mb-12"
          >
            Who We Are
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-16 text-center max-w-4xl mx-auto"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our story begins with Ekta Upadhyay, an IT professional who traded her professions for honey in 2022. After a life-changing encounter with urban beekeeping at her pomegranate orchard, she ditched her laptop for a bee suit and founded JustHoney with one mission: 
            <span className="text-gold block mt-4">&ldquo;Make honey great again!&rdquo;</span>
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
  Meet Madhu, our sassy queen bee mascot who rules our buzzing headquarters. This 🐝-con (see what we did there?) keeps our hive productive with her 
  <span className="text-gold"> &ldquo;work-hard, nectar-harder&rdquo;</span> philosophy. 
  <span className="block mt-4">Pro tip: Never challenge her to a honey-tasting contest - she&apos;s undefeated since 2022!</span>
</p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              What started as a small apiary in Ekta&apos;s orchards now spans all over India, with Karmanya Singh joining as CTO in 2021 to buzzify our tech. Together, this dynamic duo (plus our 50,000+ winged employees) have shipped nearly over 10000 jars across 8 countries!
            </p>
          </motion.div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-white dark:text-black rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary">
                    {founder.name}
                  </h3>
                  <p className="text-accent mt-2">{founder.designation}</p>
                  <p className="text-gray-600 mt-4 text-sm">{founder.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-16">
        <h3 className="text-3xl font-bold text-primary dark:text-gold mb-8 text-center">
          Our Buzzing Growth
        </h3>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold"></div>

          {[  
            {
              year: "2022",
              title: "First Hive To Home Experience",
              description:
                "First order recieved from Gurgaon, Haryana. By the end of opening week, we had 124 customers... ",
              image: "/timeline/first-hive.jpg",
            },
            {
              year: "2023",
              title: "Expanded Delivery To Delhi-NCR",
              description:
                "As word spread about our honey&apos;s exceptional quality, demand quickly grew beyond our immediate circle...",
              image: "/timeline/delhi-ncr.jpg",
            },
            {
              year: "2024",
              title: "Pan-India Operations",
              description:
                "This was our breakthrough year as we established customers from 18 states in India...",
              image: "/timeline/pan-india.jpg",
            },
            {
              year: "2025",
              title: "Global Honey Domination",
              description:
                "Today, JustHoney has evolved into India’s premier ethical honey brand with a global footprint...",
              image: "/timeline/global.jpg",
            },
          ].map((item) => (
            <div
              key={item.year}
              className="h-screen flex flex-col justify-center relative"
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gold flex items-center justify-center text-white font-bold text-xl z-10">
                {item.year}
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
                    <div className="sticky top-24">
                      <h4 className="text-2xl font-bold text-primary dark:text-gold mb-4">
                        {item.title}
                      </h4>
                      <div className="prose text-gray-600 dark:text-gray-300">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="sticky top-24">
                      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-600 dark:text-gray-300 italic">
          *Madhu claims 100% credit for our success. We let her think that - nobody argues with the queen!
        </p>
      </section>
    </div>
  );
}