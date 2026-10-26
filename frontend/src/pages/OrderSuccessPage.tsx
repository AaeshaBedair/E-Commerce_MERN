
import { Box, Button, Container, Typography } from "@mui/material";
import { CheckCircleOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderSuccessState {
  orderId: string;
}

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as OrderSuccessState | null;
  const orderId = state?.orderId;

  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        alignItems: "center",
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              color: "#A47C58",
              fontSize: 11,
              letterSpacing: "3px",
              fontWeight: 500,
              mb: 4,
            }}
          >
            ELVÉORA · ORDER CONFIRMATION
          </Typography>

          <CheckCircleOutlined
            sx={{
              fontSize: 75,
              color: "#A47C58",
              mb: 3,
            }}
          />

          <Typography
            component="h1"
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: 36, md: 46 },
              fontWeight: 400,
              color: "#33251C",
              mb: 2,
            }}
          >
            Thank You for Your Order
          </Typography>

          <Typography
            sx={{
              color: "#786A5F",
              fontSize: 15,
              lineHeight: 1.9,
              mb: 4,
            }}
          >
            Your order has been placed successfully.
            Thank you for choosing ELVÉORA.
          </Typography>

          {orderId && (
            <Box
              sx={{
                borderTop: "1px solid #D9C9B8",
                borderBottom: "1px solid #D9C9B8",
                py: 3,
                mb: 5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: "2px",
                  color: "#786A5F",
                  mb: 1,
                }}
              >
                ORDER NUMBER
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  color: "#33251C",
                  overflowWrap: "anywhere",
                }}
              >
                {orderId}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            sx={{
              bgcolor: "#33251C",
              color: "#F8F5F0",
              borderRadius: 0,
              px: 6,
              py: 1.8,
              fontSize: 12,
              letterSpacing: "2px",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#A47C58",
                boxShadow: "none",
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default OrderSuccessPage;
