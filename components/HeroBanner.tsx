import Link from 'next/link';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500 bg-opacity-50 rounded-full px-4 py-2 text-sm mb-6">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>Rated #1 Online Store 2024</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Shop the
              <span className="block text-yellow-400">Future Today</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Discover thousands of premium products with unbeatable prices, fast shipping, and exceptional customer service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <ShoppingBag size={20} />
                Shop Now
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-colors"
              >
                View Deals
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { value: '50K+', label: 'Products' },
                { value: '200K+', label: 'Customers' },
                { value: '4.9★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <ShoppingBag size={80} className="text-white opacity-80" />
                  </div>
                </div>
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-8 bg-white rounded-xl p-3 shadow-xl text-gray-900">
                <p className="text-xs font-medium">New Arrivals</p>
                <p className="text-lg font-bold text-blue-600">+120 Items</p>
              </div>
              <div className="absolute -bottom-4 -left-8 bg-white rounded-xl p-3 shadow-xl text-gray-900">
                <p className="text-xs font-medium">Flash Sale</p>
                <p className="text-lg font-bold text-red-500">Up to 50% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
