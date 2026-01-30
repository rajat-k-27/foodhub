'use client';

import { useState } from 'react';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Cart from './Cart';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartItemCount } = useCart();

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="text-indigo-600" size={32} />
              <span className="text-2xl font-bold text-gray-800">
                FoodHub
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                Menu
              </a>
              <a
                href="/orders"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                My Orders
              </a>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
