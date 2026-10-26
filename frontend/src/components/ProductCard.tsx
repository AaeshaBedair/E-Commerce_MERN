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
import { useFavorites } from "../context/Favorites/FavoritesContext";
import { useNavigate } from "react-router";
import { useAuth } from "../context/Auth/AuthContext";
import { productCardStyles } from "../styles/productCardStyles";
import { useCart } from "../context/Cart/CartContext";

type Props = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ _id, title, price, image }: Props) {
  const { addItemToCart } = useCart();
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    isFavorite: checkIsFavorite,
    toggleFavorite,
    updatingId,
    loading,
  } = useFavorites();
  const isFavorite = checkIsFavorite(_id);
  const isUpdating = updatingId === _id;
  const handleFavorite = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    await toggleFavorite(_id);
  };
  return (
    <Card elevation={0} sx={productCardStyles.card}>
      <Box sx={productCardStyles.imageArea}>
        <CardActionArea
          onClick={() => navigate(`/products/${_id}`)}
          sx={productCardStyles.cardActionArea}
        >
          <Box
            className="image-container"
            sx={productCardStyles.imageContainer}
          >
            <CardMedia
              className="product-image"
              component="img"
              image={image}
              alt={title}
              sx={productCardStyles.productImage}
            />
          </Box>
        </CardActionArea>
        <IconButton
          onClick={handleFavorite}
          disabled={isUpdating || loading}
          aria-label={
            isFavorite
              ? `Remove ${title} from favorites`
              : `Add ${title} to favorites`
          }
          sx={[
            productCardStyles.favoriteButton,
            {
              color: isFavorite ? "#A47C58" : "#6D625A",
            },
          ]}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
      <CardActionArea
        onClick={() => navigate(`/products/${_id}`)}
        sx={productCardStyles.cardActionArea}
      >
        <CardContent sx={productCardStyles.cardContent}>
          <Typography sx={productCardStyles.title}>{title}</Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={productCardStyles.priceAndCart}>
        <Typography sx={productCardStyles.price}>LE {price}</Typography>

        <IconButton
          onClick={() => addItemToCart(_id)}
          aria-label={`Add ${title} to cart`}
          sx={productCardStyles.cartButton}
        >
          <AddShoppingCartIcon fontSize="small" />
        </IconButton>
      </Box>
    </Card>
  );
}
