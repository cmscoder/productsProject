'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: string;
  colorHex: string;
  storage: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  selectedCartItemId: string | null;
  setSelectedCartItemId: (id: string | null) => void;
  cartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedCartItemId, setSelectedCartItemId] = useState<string | null>(
    null
  );
  const [cartLoading, setCartLoading] = useState(true);

  // Sync with localStorage on mount and when localStorage changes (cross-tab)
  React.useEffect(() => {
    const syncCart = () => {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          setItems(JSON.parse(stored));
        } catch {
          setItems([]);
        }
      } else {
        setItems([]);
      }
      setCartLoading(false);
    };
    syncCart();
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  // Update localStorage whenever items change
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
  }, [items]);

  function addToCart(item: CartItem) {
    setItems(prev => [...prev, item]);
    setSelectedCartItemId(item.id);
  }

  function removeFromCart(id: string) {
    setItems(prev => {
      const idx = prev.findIndex(item => item.id === id);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        selectedCartItemId,
        setSelectedCartItemId,
        cartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
