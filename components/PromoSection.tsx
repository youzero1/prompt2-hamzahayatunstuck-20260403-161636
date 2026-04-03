import Link from 'next/link';
import { Zap, Truck, Shield, Headphones } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'text-blue-600 bg-blue-50' },
            { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions', color: 'text-green-600 bg-green-50' },
            { icon: Zap, title: 'Fast Delivery', desc: '2-3 business days', color: 'text-yellow-600 bg-yellow-50' },
            { icon: Headphones, title: '24/7 Support', desc: 'Always here to help', color: 'text-purple-600 bg-purple-50' },
          ].map(feature => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <p className="text-blue-200 text-sm font-medium mb-2">Limited Time Offer</p>
            <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
            <p className="text-blue-100 mb-6">Up to 40% off on all electronics</p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <p className="text-purple-200 text-sm font-medium mb-2">New Collection</p>
            <h3 className="text-2xl font-bold mb-2">Fashion Week</h3>
            <p className="text-purple-100 mb-6">Latest trends, best prices</p>
            <Link
              href="/products"
              className="inline-block bg-white text-purple-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
