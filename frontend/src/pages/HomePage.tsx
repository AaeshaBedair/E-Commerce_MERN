import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import Alert from "@mui/material/Alert";

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
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard
              {...p}
              image={`http://localhost:3001${p.image}`}
              //onAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
