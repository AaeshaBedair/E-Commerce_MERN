import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const MyOrdersPage = () => {
  const { myOrders, getMyOrders, token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async (): Promise<void> => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        await getMyOrders();
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setError("Failed to load your orders. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "100vh",
        pt: { xs: 7, md: 10 },
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* PAGE HEADING */}
        <Box sx={{ textAlign: "center", mb: 7 }}>
          <Typography
            sx={{
              color: "#A47C58",
              fontSize: 11,
              letterSpacing: "3px",
              mb: 1.5,
            }}
          >
            ELVÉORA · YOUR PURCHASES
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: 36, md: 48 },
              color: "#33251C",
            }}
          >
            My Orders
          </Typography>
        </Box>

        {/* LOADING */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#A47C58" }} />
          </Box>
        )}

        {/* ERROR */}
        {!loading && error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* EMPTY ORDERS */}
        {!loading && !error && myOrders.length === 0 && (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
            }}
          >
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 65, color: "#A47C58", mb: 1 }}
            />

            <Typography
              sx={{
                fontFamily: "Georgia, serif",
                fontSize: { xs: 26, md: 32 },
                color: "#33251C",
              }}
            >
              No Orders Yet
            </Typography>

            <Typography sx={{ color: "#786A5F", maxWidth: 420 }}>
              Your fragrance journey begins here. Explore our collection and
              discover your next signature scent.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                mt: 2,
                bgcolor: "#33251C",
                borderRadius: 0,
                px: 5,
                py: 1.5,
                letterSpacing: "1px",
                "&:hover": { bgcolor: "#A47C58" },
              }}
            >
              Explore Collection
            </Button>
          </Box>
        )}

        {/* ORDERS LIST */}
        {!loading && !error && myOrders.length > 0 && (
          <Box
            sx={{
              maxWidth: 950,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {myOrders.map((order) => (
              <Box
                key={order._id}
                sx={{
                  bgcolor: "#F0EBE5",
                  p: { xs: 3, md: 4 },
                }}
              >
                {/* ORDER HEADER */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#A47C58",
                        fontSize: 11,
                        letterSpacing: "1.5px",
                        mb: 1,
                      }}
                    >
                      ORDER #{order._id.slice(-8).toUpperCase()}
                    </Typography>

                    {order.createdAt && (
                      <Typography sx={{ color: "#786A5F", fontSize: 13 }}>
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Typography>
                    )}
                  </Box>

                  <Typography
                    sx={{
                      fontFamily: "Georgia, serif",
                      fontSize: 24,
                      color: "#33251C",
                    }}
                  >
                    LE {order.total}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    borderTop: "1px solid #D9C9B8",
                    pt: 3,
                  }}
                >
                  {/* ORDER PRODUCTS */}
                  {order.orderItems.map((item, index) => (
                    <Box
                      key={`${order._id}-${index}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 3,
                      }}
                    >
                      <Box
                        component="img"
                        src={
                          item.productImage.startsWith("http")
                            ? item.productImage
                            : `http://localhost:3001${item.productImage}`
                        }
                        alt={item.productTitle}
                        sx={{
                          width: { xs: 75, sm: 90 },
                          height: 100,
                          objectFit: "contain",
                          flexShrink: 0,
                        }}
                      />

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: "Georgia, serif",
                            fontSize: { xs: 18, md: 21 },
                            color: "#33251C",
                            mb: 0.5,
                          }}
                        >
                          {item.productTitle}
                        </Typography>

                        <Typography sx={{ color: "#786A5F", fontSize: 13 }}>
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          color: "#33251C",
                          fontSize: 15,
                          whiteSpace: "nowrap",
                        }}
                      >
                        LE {item.unitPrice * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* DELIVERY ADDRESS */}
                <Box
                  sx={{
                    borderTop: "1px solid #D9C9B8",
                    pt: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#A47C58",
                      fontSize: 11,
                      letterSpacing: "1.5px",
                      mb: 1,
                    }}
                  >
                    DELIVERY ADDRESS
                  </Typography>

                  <Typography
                    sx={{
                      color: "#786A5F",
                      fontSize: 14,
                      lineHeight: 1.8,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {order.address}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MyOrdersPage;
