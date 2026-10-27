import { createContext, useContext } from "react";
import type { Order } from "../../types/Order";
interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  myOrders: Order[];
getMyOrders: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  login: () => {},
  logout: () => {},
  myOrders: [],
getMyOrders: async () => {},
});
export const useAuth = () => useContext(AuthContext);
