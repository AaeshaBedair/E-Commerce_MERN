import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { Order } from "../../types/Order";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setMyOrders([]);
  };

  const getMyOrders = async (): Promise<void> => {
    if (!token) {
      setMyOrders([]);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/my-orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders: Order[] = await response.json();
      setMyOrders(orders);
    } catch (error) {
      console.error("Failed to fetch my orders:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ username, token, login, logout, myOrders, getMyOrders }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
