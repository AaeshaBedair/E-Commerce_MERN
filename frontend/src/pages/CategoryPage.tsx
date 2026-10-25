import { useEffect, useState } from "react";
import { Box, Container, Typography, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  const selectedCategory =
    category === "for-her" ? "Women" : category === "for-him" ? "Men" : null;

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory !== null &&
      product.category.includes(selectedCategory) &&
      product.title.toLowerCase().includes(search.toLowerCase().trim()),
  );

  if (!selectedCategory) {
    return <Alert severity="error">Category not found.</Alert>;
  }

  return (
    <Box sx={{ bgcolor: "#F8F5F0", minHeight: "100vh" }}>
      <Container
        maxWidth={false}
        sx={{
          py: 7,
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
          <ProductSearch search={search} onSearchChange={setSearch} />
        </Box>

        {error ? (
          <Alert severity="error">
            Failed to load products. Please try again later.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((p) => (
              <Grid key={p._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProductCard {...p} image={`${BASE_URL}${p.image}`} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;
