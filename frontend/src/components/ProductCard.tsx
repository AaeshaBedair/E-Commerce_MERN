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
import { useNavigate } from "react-router";

type Props = {
  _id: string;
  title: string;
  price: number;
  image: string;
  //onAddToCart: (id: string) => void;
};

export default function ProductCard({
  _id,
  title,
  price,
  image,
  //onAddToCart,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${_id}`)}>
        <Box
          sx={{
            height: 300,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 2,
              boxSizing: "border-box",
            }}
          />
        </Box>

        <CardContent>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
      </CardActionArea>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: 2,
        }}
      >
        <Typography variant="body1">LE {price}</Typography>

        <IconButton
          aria-label={`Add ${name} to cart`}
          //onClick={() => onAddToCart(id)}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
