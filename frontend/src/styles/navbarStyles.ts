import type { SxProps, Theme } from "@mui/material/styles";

export const navbarStyles = {
  appBar: {
    backgroundColor: "#FAF8F4",
    color: "#1C1C1C",
    borderBottom: "1px solid #EEE9E2",
  },

  toolbar: {
    minHeight: "70px",
    display: "flex",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: "32px",
    fontWeight: 400,
    letterSpacing: "3px",
    color: "#1C1C1C",
    textDecoration: "none",
  },

  centerLinks: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },

  navButton: {
    color: "#1C1C1C",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#9B8064",
    },
  },

  categoriesMenuPaper: {
    mt: 1,
    minWidth: 180,
    backgroundColor: "#FAF8F4",
    borderRadius: "10px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  categoryMenuItem: {
    gap: 1.5,
    py: 1.5,
  },

  rightIcons: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  iconButton: {
    color: "#1C1C1C",
  },

  cartBadge: {
    "& .MuiBadge-badge": {
      backgroundColor: "#E8D8C4",
      color: "#1C1C1C",
      fontSize: "10px",
    },
  },

  userMenuPaper: {
    mt: 1,
    minWidth: 160,
    backgroundColor: "#FAF8F4",
    borderRadius: "10px",
  },

  userGreetingBox: {
    px: 2,
    py: 1.5,
    backgroundColor: "#FAF8F4",
  },

  userGreetingText: {
    fontSize: "14px",
    fontWeight: 300,
    color: "#9B8064",
    letterSpacing: "0.5px",
  },

  divider: {
    borderColor: "#EEE9E2",
  },
} satisfies Record<string, SxProps<Theme>>;
