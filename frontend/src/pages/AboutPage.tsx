import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F8F5F0",
        minHeight: "calc(100vh - 70px)",
        color: "#33251C",
      }}
    >
      {/* INTRO */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 9, md: 14 },
          px: 3,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#A47C58",
            letterSpacing: 4,
          }}
        >
          THE WORLD OF ELVÉORA
        </Typography>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: {
              xs: "38px",
              md: "64px",
            },
            mt: 3,
            mb: 3,
          }}
        >
          More Than a Fragrance.
        </Typography>

        <Typography
          sx={{
            maxWidth: 650,
            mx: "auto",
            color: "#6D625A",
            lineHeight: 2,
            fontSize: "17px",
          }}
        >
          At ELVÉORA, we believe fragrance is more than a scent. It is a
          feeling, a memory, and a reflection of who you are.
        </Typography>
      </Box>

      {/* OUR STORY */}
      <Box
        sx={{
          bgcolor: "#EFE8DF",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{
              color: "#A47C58",
              letterSpacing: 3,
            }}
          >
            OUR STORY
          </Typography>

          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: { xs: "30px", md: "44px" },
              mt: 2,
              mb: 4,
            }}
          >
            Crafted to Leave an Impression.
          </Typography>

          <Typography
            sx={{
              color: "#6D625A",
              lineHeight: 2.2,
              fontSize: "16px",
            }}
          >
            ELVÉORA was imagined as a world where elegance meets individuality.
            Inspired by timeless beauty and the power of scent, our collection
            brings together delicate florals, warm amber, rich woods, and
            refreshing citrus notes.
          </Typography>

          <Typography
            sx={{
              color: "#6D625A",
              lineHeight: 2.2,
              fontSize: "16px",
              mt: 3,
            }}
          >
            Every fragrance in our collection tells a different story, inviting
            you to discover the scent that feels uniquely yours.
          </Typography>
        </Container>
      </Box>

      {/* PHILOSOPHY */}
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          py: { xs: 9, md: 13 },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#A47C58",
            letterSpacing: 3,
          }}
        >
          OUR PHILOSOPHY
        </Typography>

        <Typography
          sx={{
            fontFamily: "Georgia, serif",
            fontSize: { xs: "30px", md: "44px" },
            mt: 2,
            mb: 3,
          }}
        >
          Elegance in Every Note.
        </Typography>

        <Typography
          sx={{
            color: "#6D625A",
            lineHeight: 2,
            mb: 5,
          }}
        >
          From the first impression to the final lingering note, we celebrate
          the beauty of fragrance and the moments it creates.
        </Typography>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            bgcolor: "#33251C",
            borderRadius: 0,
            px: 6,
            py: 1.8,
            "&:hover": {
              bgcolor: "#A47C58",
            },
          }}
        >
          Explore Our Collection
        </Button>
      </Container>
    </Box>
  );
};

export default AboutPage;
