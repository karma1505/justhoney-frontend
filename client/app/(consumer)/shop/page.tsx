"use client";
import { useState, useEffect, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { fetchProducts, Product, ProductVariant } from '../../utils/api';
import ProductCard from '../../_components/ProductCard';

interface FilterState {
  category: string[];
  priceRange: [number, number];
  inStock: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'rating';
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    priceRange: [0, 2000],
    inStock: false,
    sortBy: 'price-asc'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [selectedVariants, setSelectedVariants] = useState<Record<number, ProductVariant>>({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category.length > 0 && 
          !product.categories.some(cat => filters.category.includes(cat.name))) {
        return false;
      }
      
      // Price range filter
      const priceToCompare = product.min_price ?? product.base_selling_price;
      if (priceToCompare < filters.priceRange[0] || priceToCompare > filters.priceRange[1]) {
        return false;
      }
      
      // Stock filter
      if (filters.inStock && !(product.in_stock ?? true)) {
        return false;
      }
      
      return true;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      // Get comparable prices
      const priceA = a.min_price ?? a.base_selling_price;
      const priceB = b.min_price ?? b.base_selling_price;

      if (filters.sortBy === 'price-asc') return priceA - priceB;
      if (filters.sortBy === 'price-desc') return priceB - priceA;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [filteredProducts, filters.sortBy]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleVariantChange = (productId: number, variant: ProductVariant) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Category
                  </label>
                  <select 
                    className="w-full p-2 border rounded-md dark:bg-dark dark:border-gray-600 dark:text-white"
                    onChange={(e) => setFilters({...filters, category: e.target.value ? [e.target.value] : []})}
                  >
                    <option value="">All Categories</option>
                    <option value="Monofloral Honey">Monofloral Honey</option>
                    <option value="Multifloral Honey">Multifloral Honey</option>
                    <option value="Premium Honey">Premium Honey</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Price Range: ₹0 - ₹{filters.priceRange[1]}
                  </label>
                  <input 
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="stock" 
                    className="h-4 w-4 text-gold rounded focus:ring-gold border-gray-300 dark:border-gray-600"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                  />
                  <label htmlFor="stock" className="ml-2 text-sm dark:text-gray-300">
                    Show in stock only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sorting Header */}
            <div className="bg-white dark:bg-dark-light p-4 rounded-lg shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                <select
                  className="p-2 border rounded-md dark:bg-dark dark:border-gray-600 dark:text-white"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selectedVariant={selectedVariants[product.id]}
                    onVariantChange={(variant) => handleVariantChange(product.id, variant)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No products match your filters.
                </p>
                <button 
                  onClick={() => setFilters({
                    category: [],
                    priceRange: [0, 2000],
                    inStock: false,
                    sortBy: 'price-asc'
                  })}
                  className="mt-4 px-4 py-2 bg-gold text-white rounded-lg hover:bg-amber-600"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white dark:bg-dark-light hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 border border-gray-200 dark:border-gray-600"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === idx + 1 
                        ? 'bg-gold text-white' 
                        : 'bg-white dark:bg-dark-light hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
                  className="p-2 rounded-lg bg-white dark:bg-dark-light hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 border border-gray-200 dark:border-gray-600"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}