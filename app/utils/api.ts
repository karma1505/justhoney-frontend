// utils/api.ts
const BASE_URL = 'http://localhost:8000/api';

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  selling_price: number;
  weight_grams: number;
  stock_quantity: number;
  sku: string;
  is_default: boolean;
  is_active?: boolean;
  image_url?: string;  // Variant-specific image
}

export interface ProductImage {
  image_url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  base_sku: string;
  base_price: number;
  base_selling_price: number;
  base_weight: number;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  categories: { id: number; name: string }[];
  has_variants: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
  rating?: number;
  created_at: string;
  min_price?: number;
  in_stock?: boolean;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products/`, {
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const products: Product[] = await response.json();
  
  return products.map(product => ({
    ...product,
    min_price: product.has_variants && product.variants.length > 0
      ? Math.min(...product.variants.map(v => v.selling_price))
      : product.base_selling_price,
    in_stock: product.has_variants && product.variants.length > 0
      ? product.variants.some(v => v.stock_quantity > 0)
      : product.stock_quantity > 0,
    // Ensure variants have image_url fallback
    variants: product.variants.map(variant => ({
      ...variant,
      image_url: variant.image_url || product.images[0]?.image_url
    }))
  }));
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/by-slug/${slug}/`, {
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error(`Product not found: ${slug}`);
  }
  
  const product: Product = await response.json();
  
  return {
    ...product,
    // Ensure variants have image_url fallback
    variants: product.variants.map(variant => ({
      ...variant,
      image_url: variant.image_url || product.images[0]?.image_url
    }))
  };
};

export const fetchFeaturedProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products/?is_featured=true`, {
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch featured products');
  }
  
  const products: Product[] = await response.json();
  
  return products.map(product => ({
    ...product,
    min_price: product.has_variants && product.variants.length > 0
      ? Math.min(...product.variants.map(v => v.selling_price))
      : product.base_selling_price
  }));
};

// Add to cart function
export const addToCart = async (
  productId: number, 
  variantId: number | null, 
  quantity: number
): Promise<{ success: boolean }> => {
  const response = await fetch(`${BASE_URL}/cart/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id: productId,
      variant_id: variantId,
      quantity
    }),
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }
  
  return response.json();
};