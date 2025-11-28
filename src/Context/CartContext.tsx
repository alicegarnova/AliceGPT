import { createContext, ReactNode, useEffect, useState } from "react";

const CART_STORAGE_KEY = "pizza-cart";

export interface Pizza {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
  ingredients?: string[];
  compound?: string;
  calorie?: string;
}

export interface CartItem extends Pizza {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: number) => void;
  getItemQuantity: (pizzaId: number) => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to local storage:", error);
      }
    }
  }, [cart]);

  const addToCart = (pizza: Pizza): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pizza.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (pizzaId: number): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pizzaId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== pizzaId);
    });
  };

  const getItemQuantity = (pizzaId: number): number => {
    const item = cart.find((item) => item.id === pizzaId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const value: CartContextType = {
    cart,
    removeFromCart,
    getItemQuantity,
    getTotalItems,
    clearCart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
