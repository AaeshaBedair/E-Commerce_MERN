import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";

type CartApiItem = {
  product: {
    _id: string;
    title: string;
    image: string;
  };
  quantity: number;
  unitPrice: number;
};

type CartApiResponse = {
  items: CartApiItem[];
  totalAmount: number;
};

type CartResponse =
  | CartApiResponse
  | {
      data: CartApiResponse;
      statusCode: number;
    };

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [, setError] = useState("");

  const { token } = useAuth();

  const addItemToCart = async (productId: string): Promise<void> => {
    try {
      setError("");

      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart. Please try again.");
        return;
      }

      const result: CartResponse = await response.json();

      if (!result) {
        setError("Failed to parse cart data");
        return;
      }

      const cart = "data" in result ? result.data : result;

      if (!cart || !Array.isArray(cart.items)) {
        setError("Invalid cart data received");
        return;
      }

      const cartItemsMapped: CartItem[] = cart.items.map((i) => ({
        productId: i.product._id,
        title: i.product.title,
        image: i.product.image,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      }));

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
