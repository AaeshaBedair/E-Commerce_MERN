import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ _id, title, price, image }: Props) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    setIsFavorite(savedFavorites.includes(_id));
  }, [_id]);

  const handleFavorite = () => {
    const savedFavorites: string[] = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );

    const updatedFavorites = savedFavorites.includes(_id)
      ? savedFavorites.filter((id) => id !== _id)
      : [...savedFavorites, _id];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    setIsFavorite(updatedFavorites.includes(_id));
  };

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        overflow: "visible",

        "&:hover .product-image": {
          transform: "scale(1.04)",
        },

        "&:hover .image-container": {
          bgcolor: "rgba(164, 124, 88, 0.035)",
        },
      }}
    >
      {/* IMAGE AREA */}
      <Box sx={{ position: "relative" }}>
        <CardActionArea
          onClick={() => navigate(`/products/${_id}`)}
          sx={{
            "& .MuiCardActionArea-focusHighlight": {
              opacity: 0,
            },
          }}
        >
          <Box
            className="image-container"
            sx={{
              height: 300,
              width: "100%",
              bgcolor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              transition: "background-color 0.4s ease",
            }}
          >
            <CardMedia
              className="product-image"
              component="img"
              image={image}
              alt={title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                p: 2,
                boxSizing: "border-box",
                transition: "transform 0.4s ease",
              }}
            />
          </Box>
        </CardActionArea>

        {/* FAVORITE ICON */}
        <IconButton
          onClick={handleFavorite}
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: isFavorite ? "#A47C58" : "#6D625A",
            bgcolor: "rgba(248,245,240,0.8)",
            "&:hover": {
              bgcolor: "#F8F5F0",
            },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      {/* PRODUCT INFORMATION */}
      <CardActionArea
        onClick={() => navigate(`/products/${_id}`)}
        sx={{
          "& .MuiCardActionArea-focusHighlight": {
            opacity: 0,
          },
        }}
      >
        <CardContent
          sx={{
            px: 0,
            pt: 2,
            pb: "4px !important",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              fontWeight: 400,
              color: "#33251C",
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>

      {/* PRICE AND CART */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography
          sx={{
            color: "#786A5F",
            fontSize: "15px",
            fontWeight: 400,
          }}
        >
          LE {price}
        </Typography>

        <IconButton
          aria-label={`Add ${title} to cart`}
          sx={{
            color: "#A47C58",
            "&:hover": {
              bgcolor: "#EFE8DF",
            },
          }}
        >
          <AddShoppingCartIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
}
