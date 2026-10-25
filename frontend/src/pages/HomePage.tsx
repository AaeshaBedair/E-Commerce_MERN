import { Container, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import Alert from "@mui/material/Alert";
import Hero from "../components/Hero";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load products. Please try again later.
        </Alert>
      </Container>
    );
  }
  return (
    <Box sx={{ bgcolor: "#F8F5F0", minHeight: "100vh" }}>
      <Hero />
      <Box
        sx={{
          textAlign: "center",
          pt: { xs: 6, md: 9 },
          pb: { xs: 2, md: 3 },
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: "#A47C58",
            fontSize: "11px",
            letterSpacing: "3px",
            fontWeight: 500,
            mb: 1.5,
          }}
        >
          THE COLLECTION
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "34px", md: "46px" },
            fontWeight: 400,
            color: "#33251C",
            mb: 1.5,
          }}
        >
          Latest Drops
        </Typography>

        <Typography
          sx={{
            color: "#786A5F",
            fontSize: "15px",
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          Discover our newest fragrances, crafted to leave a lasting impression.
        </Typography>
      </Box>
      <Container
        maxWidth={false}
        sx={{
          mt: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
        }}
      >
        <Grid container spacing={3}>
          {products
            .filter((p) =>
              [
                "Coconut Bliss",
                "Rose & Musk",
                "Golden Santal",
                "Velvet Rose",
              ].includes(p.title),
            )
            .map((p) => (
              <Grid key={p._id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductCard
                  {...p}
                  image={`http://localhost:3001${p.image}`}
                  //onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
