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
  Divider,
} from "@mui/material";

import {
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlined,
  KeyboardArrowDown,
  Female,
  Male,
} from "@mui/icons-material";

import { useAuth } from "../context/Auth/AuthContext";
import { Link } from "react-router-dom";
import { navbarStyles } from "../styles/navbarStyles";
import { useCart } from "../context/Cart/CartContext";

function Navbar() {
  const [anchorElCategories, setAnchorElCategories] =
    React.useState<null | HTMLElement>(null);
  const { username, token, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleCloseCategories = () => {
    setAnchorElCategories(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={navbarStyles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={navbarStyles.toolbar}>
          {/* LOGO */}
          <Typography component={Link} to="/" sx={navbarStyles.logo}>
            ELVÉORA
          </Typography>

          {/* CENTER LINKS */}
          <Box sx={navbarStyles.centerLinks}>
            <Button component={Link} to="/products" sx={navbarStyles.navButton}>
              All Products
            </Button>

            <Button
              endIcon={<KeyboardArrowDown />}
              onClick={(event) => setAnchorElCategories(event.currentTarget)}
              sx={navbarStyles.navButton}
            >
              Categories
            </Button>

            <Menu
              anchorEl={anchorElCategories}
              open={Boolean(anchorElCategories)}
              onClose={handleCloseCategories}
              slotProps={{
                paper: {
                  sx: navbarStyles.categoriesMenuPaper,
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/category/for-her"
                onClick={handleCloseCategories}
                sx={navbarStyles.categoryMenuItem}
              >
                <Female fontSize="small" />
                For Her
              </MenuItem>

              <MenuItem
                component={Link}
                to="/category/for-him"
                onClick={handleCloseCategories}
                sx={navbarStyles.categoryMenuItem}
              >
                <Male fontSize="small" />
                For Him
              </MenuItem>
            </Menu>

            <Button component={Link} to="/about" sx={navbarStyles.navButton}>
              About
            </Button>
          </Box>

          {/* RIGHT ICONS */}
          <Box sx={navbarStyles.rightIcons}>
            {/* FAVORITES */}
            <IconButton
              component={Link}
              to="/favorites"
              sx={navbarStyles.iconButton}
            >
              <FavoriteBorder />
            </IconButton>

            {/* CART */}
            <IconButton
              component={Link}
              to="/cart"
              sx={navbarStyles.iconButton}
            >
              <Badge
                badgeContent={cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0,
                )}
                showZero
                sx={navbarStyles.cartBadge}
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>

            {/* USER */}
            <IconButton
              onClick={(event) => setAnchorElUser(event.currentTarget)}
              sx={navbarStyles.iconButton}
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
                  sx: navbarStyles.userMenuPaper,
                },
              }}
            >
              {token ? (
                <>
                  <Box sx={navbarStyles.userGreetingBox}>
                    <Typography sx={navbarStyles.userGreetingText}>
                      Hello, {username}
                    </Typography>
                  </Box>

                  <Divider sx={navbarStyles.divider} />

                  <MenuItem
                    component={Link}
                    to="/account"
                    onClick={handleCloseUserMenu}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleCloseUserMenu();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
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
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
