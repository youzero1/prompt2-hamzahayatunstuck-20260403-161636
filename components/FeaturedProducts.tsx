'use client';

import { useState } from 'react';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const tabs = ['All', 'Electronics', 'Clothing', 'Accessories'];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Featured Products</h2>
            <p className="text-gray-500">Handpicked just for you</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
