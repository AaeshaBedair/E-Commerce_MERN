
import type { SxProps, Theme } from "@mui/material/styles";

export const productCardStyles = {
  card: {
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
  },

  imageArea: {
    position: "relative",
  },

  cardActionArea: {
    "& .MuiCardActionArea-focusHighlight": {
      opacity: 0,
    },
  },

  imageContainer: {
    height: 300,
    width: "100%",
    bgcolor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    transition: "background-color 0.4s ease",
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    p: 2,
    boxSizing: "border-box",
    transition: "transform 0.4s ease",
  },

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    bgcolor: "rgba(248,245,240,0.8)",

    "&:hover": {
      bgcolor: "#F8F5F0",
    },
  },

  cardContent: {
    px: 0,
    pt: 2,
    pb: "4px !important",
  },

  title: {
    fontFamily: "Georgia, serif",
    fontSize: "20px",
    fontWeight: 400,
    color: "#33251C",
  },

  priceAndCart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    pb: 1,
  },

  price: {
    color: "#786A5F",
    fontSize: "15px",
    fontWeight: 400,
  },

  cartButton: {
    color: "#A47C58",

    "&:hover": {
      bgcolor: "#EFE8DF",
    },
  },
} satisfies Record<string, SxProps<Theme>>;
