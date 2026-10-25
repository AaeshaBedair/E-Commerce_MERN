import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const FavoritesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const allProducts: Product[] = await response.json();
        const favoriteIds: string[] = JSON.parse(
          localStorage.getItem("favorites") || "[]",
        );
        const favoriteProducts = allProducts.filter((product) =>
          favoriteIds.includes(product._id),
        );
        setProducts(favoriteProducts);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">
          Failed to load favorites. Please try again.
        </Alert>
      </Container>
    );
  }
  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "calc(100vh - 70px)",
        py: 7,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          mt: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#A47C58",
            letterSpacing: 3,
          }}
        >
          YOUR PERSONAL SELECTION
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Georgia, serif",
            color: "#33251C",
            mt: 1,
            mb: 5,
          }}
        >
          My Favorites
        </Typography>
        {products.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <FavoriteBorderIcon
              sx={{
                fontSize: 55,
                color: "#A47C58",
                mb: 2,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Georgia, serif",
                color: "#33251C",
                mb: 2,
              }}
            >
              Your wishlist is empty
            </Typography>
            <Typography sx={{ color: "#6D625A", mb: 4 }}>
              Save the fragrances you love and find them here.
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              sx={{
                bgcolor: "#33251C",
                borderRadius: 0,
                px: 5,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#A47C58",
                },
              }}
            >
              Explore Collection
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product._id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductCard
                  {...product}
                  image={`${BASE_URL}${product.image}`}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FavoritesPage;
