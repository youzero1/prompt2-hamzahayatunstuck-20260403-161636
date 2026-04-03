'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { useCart } from '@/components/CartContext';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id));
  
  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images = product.images || [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <Link href="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ChevronLeft size={18} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full border transition-colors ${
                  isWishlisted ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2 rounded-full border border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={18}
                  className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-medium">✗ Out of Stock</span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm font-medium text-gray-700">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-medium"
              >
                -
              </button>
              <span className="px-6 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-medium"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg transition-all ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.stock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <ShoppingCart size={22} />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={24} className="text-blue-600" />
              <span className="text-xs text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Shield size={24} className="text-blue-600" />
              <span className="text-xs text-gray-600">2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw size={24} className="text-blue-600" />
              <span className="text-xs text-gray-600">30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
