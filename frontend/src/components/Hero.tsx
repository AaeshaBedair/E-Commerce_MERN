import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 400, md: 600 },
        backgroundImage: "url('/images/Hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        zIndex: 1,
        boxShadow: "0px 12px 28px -12px rgba(51, 37, 28, 0.28)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(248,245,240,0.75), transparent 65%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          ml: { xs: 3, md: 10 },
          maxWidth: 450,
        }}
      >
        <Typography
          sx={{
            letterSpacing: 3,
            fontSize: 12,
            color: "#8C694B",
            mb: 2,
          }}
        >
          ELVÉORA — THE ART OF FRAGRANCE
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: 36, md: 58 },
            color: "#38271D",
            mb: 2,
          }}
        >
          Elegance in Every Note.
        </Typography>

        <Typography sx={{ color: "#59483B", mb: 4 }}>
          Discover fragrances that tell your story, crafted to leave a lasting
          impression.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{
            bgcolor: "#38271D",
            borderRadius: 0,
            px: 4,
            py: 1.5,
            "&:hover": { bgcolor: "#5A4030" },
          }}
        >
          Explore Collection
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
