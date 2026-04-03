'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { ChevronRight, CreditCard, Lock, CheckCircle } from 'lucide-react';

type Step = 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('shipping');
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    clearCart();
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
          <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase, {shippingData.firstName}!</p>
          <p className="text-gray-500 mb-8">A confirmation email has been sent to {shippingData.email}</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-600">Order #: <span className="font-medium">{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></p>
            <p className="text-sm text-gray-600 mt-1">Estimated delivery: <span className="font-medium">3-5 business days</span></p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {(['shipping', 'payment'] as Step[]).map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s ? 'bg-blue-600 text-white' :
              (step === 'payment' && s === 'shipping') ? 'bg-green-500 text-white' :
              'bg-gray-200 text-gray-500'
            }`}>
              {step === 'payment' && s === 'shipping' ? '✓' : idx + 1}
            </div>
            <span className={`text-sm font-medium capitalize ${
              step === s ? 'text-blue-600' : 'text-gray-500'
            }`}>{s}</span>
            {idx === 0 && <ChevronRight size={16} className="text-gray-400" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={shippingData.firstName}
                    onChange={e => setShippingData({...shippingData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={shippingData.lastName}
                    onChange={e => setShippingData({...shippingData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={shippingData.email}
                    onChange={e => setShippingData({...shippingData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={shippingData.phone}
                    onChange={e => setShippingData({...shippingData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={shippingData.address}
                    onChange={e => setShippingData({...shippingData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={e => setShippingData({...shippingData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={shippingData.state}
                    onChange={e => setShippingData({...shippingData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={shippingData.zipCode}
                    onChange={e => setShippingData({...shippingData, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={shippingData.country}
                    onChange={e => setShippingData({...shippingData, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Payment Information</h2>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <Lock size={14} />
                  <span>Secure Payment</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={paymentData.cardNumber}
                      onChange={e => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <CreditCard size={18} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={paymentData.cardName}
                    onChange={e => setPaymentData({...paymentData, cardName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={paymentData.expiry}
                      onChange={e => setPaymentData({...paymentData, expiry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={paymentData.cvv}
                      onChange={e => setPaymentData({...paymentData, cvv: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
