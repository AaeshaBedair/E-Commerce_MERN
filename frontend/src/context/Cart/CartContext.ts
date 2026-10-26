import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalAmount: number;
  refreshCart: () => Promise<void>;
  addItemToCart: (productId: string) => void;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  refreshCart: async () => {},
  clearCart: async () => {},
});
export const useCart = () => useContext(CartContext);
