'use client';

import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + shipping + tax;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          <ShoppingBag size={20} />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <span className="text-gray-500">{cartCount} items</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-4 p-4 ${
                  index !== cart.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/products/${item.id}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 py-1.5 font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Link href="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePromoCode}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Tag size={16} />
                </button>
              </div>
              {promoApplied && (
                <p className="text-green-600 text-xs mt-1">✓ 10% discount applied!</p>
              )}
              {promoError && (
                <p className="text-red-500 text-xs mt-1">{promoError}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Try: SAVE10</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount (10%)</span>
                  <span className="text-green-600 font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {cartTotal <= 50 && (
              <p className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg mb-4">
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <Link
              href="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
