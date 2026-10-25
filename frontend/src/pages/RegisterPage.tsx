import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.log("Register failed:", response.status, errorData);

        setError(
          typeof errorData?.message === "string"
            ? errorData.message
            : "Unable to register user, please try again",
        );

        return;
      }
      const data = await response.json();
      console.log("Registration successful:", data);
    } catch (err) {
      setError("Unable to connect to the server");
      console.error(err);
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
        <Typography variant="h5" sx={{ textAlign: "center", mt: 3, mb: 1 }}>
          Create an Account
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
        >
          Join us and discover your signature scent.
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            fullWidth
            required
          />
          <TextField
            inputRef={lastNameRef}
            label="Last Name"
            fullWidth
            required
          />
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
          <TextField
            inputRef={confirmPasswordRef}
            label="Confirm Password"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
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
            Create Account
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 3 }}>
          Already have an account?{" "}
          <Box
            component="a"
            href="/login"
            sx={{
              color: "#29231F",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Sign In
          </Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
