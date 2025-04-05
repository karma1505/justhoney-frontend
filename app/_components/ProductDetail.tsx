"use client";
import { useState } from 'react';
import { Product, ProductVariant } from '../utils/api';
import Image from 'next/image';
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function ProductDetail({ product }: { product: Product }) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
        product.variants.find(v => v.is_default) || product.variants[0] || null
    );
    
    const mainImage = product.images.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <Image
                            src={selectedVariant?.image_url || mainImage || '/default-product.jpg'}
                            alt={product.name}
                            width={600}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
                
                {/* Product Info */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    
                    {selectedVariant && (
                        <h2 className="text-xl text-gray-600">{selectedVariant.name}</h2>
                    )}
                    
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <StarIcon className="h-5 w-5 text-amber-400" />
                            <span className="ml-1">{product.rating?.toFixed(1) || '4.5'}</span>
                        </div>
                    </div>
                    
                    <div className="text-2xl font-bold">
                        ₹{selectedVariant?.selling_price || product.base_selling_price}
                    </div>
                    
                    <div className="prose max-w-none">
                        <p className="text-gray-600">{product.short_description}</p>
                        <div className="mt-4">
                            {product.description}
                        </div>
                    </div>
                    
                    {/* Variant Selector */}
                    {product.has_variants && product.variants.length > 0 && (
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Select Variant
                            </label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={selectedVariant?.id || ''}
                                onChange={(e) => {
                                    const variant = product.variants.find(v => v.id === Number(e.target.value));
                                    setSelectedVariant(variant || null);
                                }}
                            >
                                {product.variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} - ₹{variant.selling_price} ({variant.weight_grams}g)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button 
                        className={`w-full py-3 px-6 rounded-lg ${
                            (selectedVariant?.stock_quantity || product.stock_quantity) > 0
                                ? 'bg-gold hover:bg-amber-600 text-white' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={(selectedVariant?.stock_quantity || product.stock_quantity) <= 0}
                    >
                        {(selectedVariant?.stock_quantity || product.stock_quantity) > 0 
                            ? 'Add to Cart' 
                            : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}