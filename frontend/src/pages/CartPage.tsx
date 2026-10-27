import { Box, Container, Typography, Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { IconButton } from "@mui/material";
import { Add, Remove, DeleteOutlined } from "@mui/icons-material";
import { useCart } from "../context/Cart/CartContext";

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
  const { refreshCart, clearCart } = useCart();
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
  const updateCartQuantity = async (productId: string, quantity: number) => {
    try {
      setError("");

      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const result = await response.json();
      const updatedCart: CartResponse = result.data ?? result;

      setCart(updatedCart);
      await refreshCart();
    } catch (error) {
      console.error(error);
      setError("Failed to update cart quantity.");
    }
  };
  const handleQuantityPlus = async (
    productId: string,
    currentQuantity: number,
  ) => {
    await updateCartQuantity(productId, currentQuantity + 1);
  };

  const handleQuantityMinus = async (
    productId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity <= 1) return;

    await updateCartQuantity(productId, currentQuantity - 1);
  };
  const handleRemoveItem = async (productId: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      const updatedCart: CartResponse = await response.json();

      setCart(updatedCart);
      await refreshCart();
    } catch (error) {
      console.error(error);
      setError("Failed to remove item from cart.");
    }
  };
  const handleClearCart = async (): Promise<void> => {
    try {
      setError("");

      await clearCart();

      setCart({
        items: [],
        totalAmount: 0,
      });
    } catch (error) {
      console.error(error);
      setError("Failed to clear cart.");
    }
  };

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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 2, md: 4 },
                  py: 3,
                  px: { xs: 1, md: 3 },
                  mb: 2,
                  borderBottom: "1px solid #DDD3C8",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "#F0EBE5",
                  },
                }}
              >
                {/* PRODUCT IMAGE */}
                <Box
                  onClick={() => navigate(`/products/${item.product._id}`)}
                  sx={{
                    width: { xs: 110, sm: 150 },
                    height: { xs: 140, sm: 170 },
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
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

                {/* PRODUCT INFO */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    onClick={() => navigate(`/products/${item.product._id}`)}
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: { xs: 21, md: 26 },
                      color: "#33251C",
                      mb: 1,
                      cursor: "pointer",
                    }}
                  >
                    {item.product.title}
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

                {/* QUANTITY & REMOVE */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    gap: 1.5,
                  }}
                >
                  <IconButton
                    onClick={() => handleRemoveItem(item.product._id)}
                    aria-label="Remove from cart"
                    sx={{ color: "#786A5F" }}
                  >
                    <DeleteOutlined />
                  </IconButton>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #D9C9B8",
                      width: 120,
                      height: 38,
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        handleQuantityMinus(item.product._id, item.quantity)
                      }
                      disabled={item.quantity <= 1}
                      sx={{ color: "#33251C" }}
                    >
                      <Remove />
                    </IconButton>

                    <Typography sx={{ flex: 1, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>

                    <IconButton
                      onClick={() =>
                        handleQuantityPlus(item.product._id, item.quantity)
                      }
                      sx={{ color: "#33251C" }}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
                gap: 2,
              }}
            >
              {/* CLEAR CART BUTTON */}
              <Button
                variant="outlined"
                onClick={handleClearCart}
                sx={{
                  color: "#786A5F",
                  borderColor: "#D9C9B8",
                  borderRadius: 0,
                  px: 3,
                  py: 1.2,
                  fontSize: 12,
                  letterSpacing: "1px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#B94A48",
                    color: "#B94A48",
                    bgcolor: "transparent",
                  },
                }}
              >
                Clear Cart
              </Button>

              {/* SUBTOTAL */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#786A5F",
                  }}
                >
                  Subtotal
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: 30,
                    color: "#33251C",
                  }}
                >
                  LE {cart.totalAmount}
                </Typography>
              </Box>
            </Box>
            {/* CHECKOUT BUTTON */}
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/checkout")}
              sx={{
                mt: 5,
                height: 60,
                bgcolor: "#33251C",
                color: "#F8F5F0",
                borderRadius: 0,
                fontSize: { xs: 12, sm: 14 },
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
              Proceed to Checkout
            </Button>
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
