import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AllProductsPage from "./pages/AllProductsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import AuthProvider from "./context/Auth/AuthProvider";
import { FavoritesProvider } from "./context/Favorites/FavoritesContext";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products" element={<AllProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
