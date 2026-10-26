import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";
import type { Product } from "../../types/Product";
interface FavoritesContextType {
  favorites: Product[];
  loading: boolean;
  error: boolean;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  updatingId: string | null;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setFavorites([]);
    setError(false);
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const data: Product[] = await response.json();
        if (!cancelled) {
          setFavorites(data);
        }
      } catch (error) {
        console.error("Fetch favorites error:", error);
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchFavorites();
    return () => {
      cancelled = true;
    };
  }, [token]);
  const isFavorite = (productId: string): boolean => {
    return favorites.some((product) => product._id === productId);
  };
  const toggleFavorite = async (productId: string): Promise<void> => {
    if (!token || updatingId) return;
    const alreadyFavorite = isFavorite(productId);
    setUpdatingId(productId);
    try {
      const response = await fetch(`${BASE_URL}/user/favorites/${productId}`, {
        method: alreadyFavorite ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
      const favoritesResponse = await fetch(`${BASE_URL}/user/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!favoritesResponse.ok) {
        throw new Error("Failed to refresh favorites");
      }
      const updatedFavorites: Product[] = await favoritesResponse.json();
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Update favorites error:", error);
      setError(true);
    } finally {
      setUpdatingId(null);
    }
  };
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        isFavorite,
        toggleFavorite,
        updatingId,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
};
