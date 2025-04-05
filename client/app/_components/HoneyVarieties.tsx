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
    description: 'Honey Straight Outta Jamuns'
  },
  {
    name: 'Kashmir Solai Honey',
    price: '₹899',
    image: '/products/solai.jpg',
    description: 'Premium honey from the wild kashmir solai'
  },
  {
    name: 'Eucalyptus Honey',
    price: '₹599',
    image: '/products/eucalyptus.jpg',
    description: 'Distinctive bold flavor with herbal notes'
  }
]

export default function HoneyVarieties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {variants.map((honey) => (
        <div
          key={honey.name}
          className="rounded-xl shadow-lg overflow-hidden"
        >
          <div className="relative h-64">
            <Image
              src={honey.image}
              alt={honey.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary">{honey.name}</h3>
            <p className="text-gray-600 mt-2">{honey.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-accent">{honey.price}</span>
              <button className="bg-gold text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}