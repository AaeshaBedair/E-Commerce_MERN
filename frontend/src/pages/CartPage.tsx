import { Box, Container, Typography, Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer${token} `,
        },
      });
      if (!response.ok) {
        setError("Failed to fetch user cart. Please Try again");
      }
      const data = await response.json();
      setCart(data);
    };
    fetchCart();
  }, [token]);
  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "calc(100vh - 70px)",
        py: { xs: 6, md: 9 },
      }}
    >
      <Container maxWidth="lg">
        {/* PAGE HEADING */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            sx={{
              color: "#A47C58",
              fontSize: "11px",
              letterSpacing: "3px",
              fontWeight: 500,
              mb: 1.5,
            }}
          >
            YOUR SELECTION
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: "36px", md: "48px" },
              fontWeight: 400,
              color: "#33251C",
            }}
          >
            Shopping Cart
          </Typography>
        </Box>

        {/* EMPTY CART */}
        <Box
          sx={{
            minHeight: 350,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{
              fontSize: 65,
              color: "#A47C58",
              strokeWidth: 0.5,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: "25px", md: "30px" },
              fontWeight: 400,
              color: "#33251C",
              mb: 2,
            }}
          >
            Your Shopping Cart Is Empty
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              color: "#786A5F",
              lineHeight: 1.8,
              maxWidth: 420,
              mb: 4,
            }}
          >
            Your next signature scent is waiting to be discovered. Explore our
            collection and find something extraordinary.
          </Typography>

          <Button
            component={Link}
            to="/products"
            variant="contained"
            sx={{
              bgcolor: "#33251C",
              color: "#F8F5F0",
              borderRadius: 0,
              px: 5,
              py: 1.7,
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#A47C58",
                boxShadow: "none",
              },
            }}
          >
            Explore Collection
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
