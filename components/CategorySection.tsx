import Link from 'next/link';
import { Laptop, Shirt, Watch, Home, Dumbbell, Headphones } from 'lucide-react';

const categories = [
  { name: 'Electronics', icon: Laptop, color: 'bg-blue-100 text-blue-600', count: 120 },
  { name: 'Clothing', icon: Shirt, color: 'bg-pink-100 text-pink-600', count: 85 },
  { name: 'Accessories', icon: Watch, color: 'bg-purple-100 text-purple-600', count: 64 },
  { name: 'Home & Garden', icon: Home, color: 'bg-green-100 text-green-600', count: 93 },
  { name: 'Sports', icon: Dumbbell, color: 'bg-orange-100 text-orange-600', count: 47 },
  { name: 'Audio', icon: Headphones, color: 'bg-indigo-100 text-indigo-600', count: 38 },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-gray-500">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href="/products"
                className="group flex flex-col items-center p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-gray-50 hover:bg-white"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <span className="text-sm font-semibold text-gray-900 text-center">{cat.name}</span>
                <span className="text-xs text-gray-400 mt-1">{cat.count} items</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
