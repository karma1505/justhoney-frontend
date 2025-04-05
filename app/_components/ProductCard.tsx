"use client";
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Product } from '../utils/api';

export default function ProductCard({ product }: { product: Product }) {
    const mainImage = product.images.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url;
    const minPrice = product.has_variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.selling_price))
        : product.base_selling_price;

    return (
        <Link href={`/shop/${product.slug}`} className="group">
            <div className="bg-white dark:bg-dark-light rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative h-64">
                    <img
                        src={mainImage || '/default-product.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-xl"
                    />
                    <button 
                        className="absolute top-2 right-2 p-2 bg-white/90 rounded-full"
                        onClick={(e) => e.preventDefault()}
                    >
                        <HeartIcon className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-gold transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {product.short_description}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-gold text-xl font-bold">
                            ₹{minPrice}
                            {product.has_variants && product.variants.length > 1 && (
                                <span className="text-sm text-gray-500 ml-1">
                                    (From)
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}