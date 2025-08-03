"use client";
import Image from 'next/image'

type HoneyVariant = {
  name: string
  price: string
  image: string
  description: string
}

const variants: HoneyVariant[] = [
  {
    name: 'Jamun Honey',
    price: '₹499',
    image: '/products/jamun.jpg',
    description: 'Honey Straight Outta Jamuns.If the honey is dark, its gotta be from the jamun tree'
  },
  {
    name: 'Kashmir Solai Honey',
    price: '₹899',
    image: '/products/solai.jpg',
    description: 'Premium honey from the rare wild kashmir solai, just a spoon of this for euphoria '
  },
  {
    name: 'Eucalyptus Honey',
    price: '₹599',
    image: '/products/eucalyptus.jpg',
    description: 'Distinctive bold flavor with herbal notes. The Bees had to really fly high for this one.'
  }
]

export default function HoneyVarieties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {variants.map((honey) => (
        <div
          key={honey.name}
          className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu hover:scale-105 hover:z-10"
        >
          <div className="relative h-64">
            <Image
              src={honey.image}
              alt={honey.name}
              fill
              className="object-cover rounded-t-xl"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary dark:text-black">{honey.name}</h3>
            <p className="text-gray-600 dark:text-black mt-2">{honey.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-accent dark:text-black">{honey.price}</span>
              <button className="bg-gold text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}