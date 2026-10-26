import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useParams } from "react-router";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { useFavorites } from "../context/Favorites/FavoritesContext";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router";
import { useCart } from "../context/Cart/CartContext";

const ProductDetailsPage = () => {
  const { addItemToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    isFavorite: checkIsFavorite,
    toggleFavorite,
    updatingId,
    loading: favoritesLoading,
  } = useFavorites();

  const isFavorite = id ? checkIsFavorite(id) : false;
  const isUpdating = updatingId === id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      setLoading(true);
      setError(false);
      setProduct(null);
      try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();
        const selectedProduct = products.find((p) => p._id === id);
        if (!cancelled) {
          setProduct(selectedProduct ?? null);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!id) return;
    if (!token) {
      navigate("/login");
      return;
    }
    await toggleFavorite(id);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">Failed to load product.</Alert>
      </Container>
    );
  }
  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="warning">Product not found.</Alert>
      </Container>
    );
  }
  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
          },
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src={`${BASE_URL}${product.image.replace(/\.png$/i, "-notes.png")}`}
            alt={`${product.title} fragrance notes`}
            sx={{
              display: "block",
              width: "100%",
              height: "auto",
              boxShadow: "10px 0 25px -12px rgba(51, 37, 28, 0.3)",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
            px: {
              xs: 3,
              sm: 4,
              md: 5,
              lg: 8,
            },
            py: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#A47C58",
              letterSpacing: 3,
            }}
          >
            ELVÉORA FRAGRANCES
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Georgia, serif",
              color: "#33251C",
              mt: 2,
              fontSize: {
                xs: "32px",
                sm: "40px",
                md: "42px",
                lg: "52px",
              },
              overflowWrap: "break-word",
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              color: "#A47C58",
            }}
          >
            LE {product.price}
          </Typography>
          <Typography
            sx={{
              mt: 4,
              color: "#6D625A",
              lineHeight: 2,
            }}
          >
            {product.description}
          </Typography>
          <Typography
            sx={{
              mt: 3,
              mb: 3,
              color: product.stock > 0 ? "#587A56" : "#B94A48",
            }}
          >
            {product.stock === 0
              ? "Out of Stock"
              : product.stock <= 5
                ? `Only ${product.stock} Left!`
                : "In Stock"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              disabled={product.stock === 0}
              onClick={() => addItemToCart(product._id)}
              sx={{
                height: 50,
                px: 8,
                flex: {
                  xs: "1 1 100%",
                  sm: "0 1 auto",
                },
                bgcolor: "#33251C",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "#A47C58",
                },
              }}
            >
              Add to Cart
            </Button>

            <IconButton
              onClick={handleAddToFavorites}
              disabled={isUpdating || favoritesLoading}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              sx={{
                width: 50,
                height: 50,
                border: "1px solid #D8C8B8",
                borderRadius: 0,
                color: isFavorite ? "#B85C65" : "#33251C",
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
