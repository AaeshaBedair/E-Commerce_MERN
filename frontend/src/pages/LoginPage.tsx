import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
interface TokenPayload {
  firstName: string;
  lastName: string;
  email: string;
}
const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;
  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        setError(
          typeof errorData?.message === "string"
            ? errorData.message
            : "Invalid email or password",
        );
        return;
      }
      const data = await response.json();
      const token = typeof data === "string" ? data : data?.token;
      if (typeof token !== "string" || !token) {
        setError("Login succeeded, but no valid token was returned");
        return;
      }
      const decoded = jwtDecode<TokenPayload>(token);
      if (!decoded.firstName) {
        setError("Unable to retrieve user information");
        return;
      }
      login(decoded.firstName, token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Georgia, serif",
            textAlign: "center",
            mb: 1,
            letterSpacing: 2,
          }}
        >
          ELVÉORA
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mb: 4,
          }}
        >
          Sign in to continue your fragrance journey.
        </Typography>
        {successMessage && (
          <Typography
            sx={{
              color: "#4F7A5A",
              textAlign: "center",
              mb: 2,
            }}
          >
            {successMessage}
          </Typography>
        )}
        <Box
          component="form"
          onSubmit={onSubmit}
          autoComplete="off"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            inputRef={emailRef}
            label="Email Address"
            type="email"
            fullWidth
            required
          />

          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: "#29231F",
              borderRadius: 0,
              textTransform: "none",
              fontSize: 15,
              "&:hover": {
                backgroundColor: "#51463D",
              },
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          Don't have an account?{" "}
          <Box
            component="a"
            href="/register"
            sx={{
              color: "#29231F",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Create Account
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
