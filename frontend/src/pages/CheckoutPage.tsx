import { useRef, useState } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

interface CheckoutOrder {
  _id: string;
}

const CheckoutPage = () => {
  const { token } = useAuth();
  const { cartItems, totalAmount, refreshCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submittingRef = useRef(false);

  const handleCheckout = async (): Promise<void> => {
    if (submittingRef.current) return;

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (!token) {
      setError("Please log in to complete your order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: address.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      // The backend returns the created order directly.
      const order: CheckoutOrder = await response.json();

      if (!order._id) {
        throw new Error("Order ID was not returned");
      }

      // The checkout was successful.
      // Refresh the active cart and navbar count.
      try {
        await refreshCart();
      } catch (refreshError) {
        console.error("Failed to refresh cart:", refreshError);
      }

      // Navigate to the order confirmation page.
      navigate("/order-success", {
        replace: true,
        state: {
          orderId: order._id,
        },
      });
    } catch (error) {
      console.error(error);
      setError("Failed to place your order. Please try again.");
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "100vh",
        py: 9,
      }}
    >
      <Container maxWidth="lg">
        {/* PAGE HEADING */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            sx={{
              color: "#A47C58",
              letterSpacing: "3px",
              fontSize: 11,
              mb: 1.5,
            }}
          >
            ELVÉORA · ALMOST YOURS
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: 36, md: 48 },
              color: "#33251C",
            }}
          >
            Complete Your Order
          </Typography>
        </Box>

        {/* CHECKOUT CONTENT */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.4fr 1fr",
            },
            gap: 6,
          }}
        >
          {/* DELIVERY DETAILS */}
          <Box>
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: 26,
                color: "#33251C",
                mb: 3,
              }}
            >
              Delivery Details
            </Typography>

            <Typography
              sx={{
                color: "#786A5F",
                mb: 2,
              }}
            >
              Delivery Address
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Enter your full delivery address"
              value={address}
              disabled={loading}
              onChange={(event) => {
                setAddress(event.target.value);
                if (error) setError("");
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  bgcolor: "#FFFFFF",
                  "&.Mui-focused fieldset": {
                    borderColor: "#A47C58",
                  },
                },
              }}
            />

            {error && (
              <Typography color="error" role="alert" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>

          {/* ORDER SUMMARY */}
          <Box
            sx={{
              bgcolor: "#F0EBE5",
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: 26,
                color: "#33251C",
                mb: 3,
              }}
            >
              Order Summary
            </Typography>

            {cartItems.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#786A5F",
                    fontSize: 14,
                  }}
                >
                  {item.title} × {item.quantity}
                </Typography>

                <Typography
                  sx={{
                    color: "#33251C",
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                >
                  LE {item.unitPrice * item.quantity}
                </Typography>
              </Box>
            ))}

            {/* TOTAL */}
            <Box
              sx={{
                borderTop: "1px solid #D9C9B8",
                mt: 3,
                pt: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  color: "#33251C",
                  fontWeight: 600,
                }}
              >
                Total
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: 24,
                  color: "#33251C",
                }}
              >
                LE {totalAmount}
              </Typography>
            </Box>

            {/* PLACE ORDER BUTTON */}
            <Button
              fullWidth
              variant="contained"
              disabled={loading || !token || cartItems.length === 0}
              onClick={handleCheckout}
              sx={{
                mt: 4,
                height: 58,
                bgcolor: "#33251C",
                color: "#F8F5F0",
                borderRadius: 0,
                fontSize: 13,
                letterSpacing: "2px",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#A47C58",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "PLACING ORDER..." : "PLACE ORDER"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
