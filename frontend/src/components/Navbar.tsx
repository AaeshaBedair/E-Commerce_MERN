import * as React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Badge,
} from "@mui/material";

import {
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlined,
  KeyboardArrowDown,
  Female,
  Male,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

function Navbar() {
  const [anchorElCategories, setAnchorElCategories] =
    React.useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleCloseCategories = () => {
    setAnchorElCategories(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navButtonStyle = {
    color: "#1C1C1C",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "1px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#9B8064",
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#FAF8F4",
        color: "#1C1C1C",
        borderBottom: "1px solid #EEE9E2",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "70px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            sx={{
              fontSize: "32px",
              fontWeight: 400,
              letterSpacing: "3px",
              color: "#1C1C1C",
              textDecoration: "none",
            }}
          >
            ELVÉORA
          </Typography>

          {/* CENTER LINKS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button component={Link} to="/products" sx={navButtonStyle}>
              All Products
            </Button>

            <Button
              endIcon={<KeyboardArrowDown />}
              onClick={(event) => setAnchorElCategories(event.currentTarget)}
              sx={navButtonStyle}
            >
              Categories
            </Button>

            <Menu
              anchorEl={anchorElCategories}
              open={Boolean(anchorElCategories)}
              onClose={handleCloseCategories}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    backgroundColor: "#FAF8F4",
                    borderRadius: "10px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  },
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/category/for-her"
                onClick={handleCloseCategories}
                sx={{ gap: 1.5, py: 1.5 }}
              >
                <Female fontSize="small" />
                For Her
              </MenuItem>

              <MenuItem
                component={Link}
                to="/category/for-him"
                onClick={handleCloseCategories}
                sx={{ gap: 1.5, py: 1.5 }}
              >
                <Male fontSize="small" />
                For Him
              </MenuItem>
            </Menu>

            <Button component={Link} to="/about" sx={navButtonStyle}>
              About
            </Button>
          </Box>

          {/* RIGHT ICONS */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* FAVORITES */}
            <IconButton
              component={Link}
              to="/favorites"
              sx={{ color: "#1C1C1C" }}
            >
              <FavoriteBorder />
            </IconButton>

            {/* CART */}
            <IconButton component={Link} to="/cart" sx={{ color: "#1C1C1C" }}>
              <Badge
                badgeContent={0}
                showZero
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#E8D8C4",
                    color: "#1C1C1C",
                    fontSize: "10px",
                  },
                }}
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>

            {/* USER */}
            <IconButton
              onClick={(event) => setAnchorElUser(event.currentTarget)}
              sx={{ color: "#1C1C1C" }}
            >
              <PersonOutlined />
            </IconButton>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 160,
                    backgroundColor: "#FAF8F4",
                    borderRadius: "10px",
                  },
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleCloseUserMenu}
              >
                Login
              </MenuItem>

              <MenuItem
                component={Link}
                to="/register"
                onClick={handleCloseUserMenu}
              >
                Register
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
