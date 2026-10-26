import { Box, Container, Typography, Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

interface CartProduct {
  _id: string;
  title: string;
  image: string;
}

interface CartItemResponse {
  product: CartProduct;
  quantity: number;
  unitPrice: number;
}

interface CartResponse {
  items: CartItemResponse[];
  totalAmount: number;
}

const CartPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${BASE_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data: CartResponse = await response.json();
        setCart(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user cart. Please try again.");
      } finally {
        setLoading(false);
      }
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

        {loading && (
          <Typography sx={{ textAlign: "center" }}>
            Loading your cart...
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {!loading && !error && cart && cart.items.length > 0 && (
          <Box>
            {cart.items.map((item) => (
              <Box
                key={item.product._id}
                onClick={() => navigate(`/products/${item.product._id}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, md: 4 },
                  py: 3,
                  px: { xs: 1, md: 3 },
                  mb: 2,
                  borderBottom: "1px solid #DDD3C8",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "#F0EBE5",
                  },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 110, sm: 150 },
                    height: { xs: 140, sm: 170 },
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={`${BASE_URL}${item.product.image}`}
                    alt={item.product.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: { xs: 21, md: 26 },
                      color: "#33251C",
                      mb: 1,
                    }}
                  >
                    {item.product.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#786A5F",
                      fontSize: 14,
                      mb: 1,
                    }}
                  >
                    Quantity: {item.quantity}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#A47C58",
                      fontSize: 17,
                      fontWeight: 500,
                    }}
                  >
                    LE {item.unitPrice * item.quantity}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Typography
              sx={{
                textAlign: "right",
                fontSize: 24,
                color: "#33251C",
                mt: 4,
              }}
            >
              Total: LE {cart.totalAmount}
            </Typography>
          </Box>
        )}
        {/* EMPTY CART */}
        {!loading && !error && (!cart || cart.items.length === 0) && (
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
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
