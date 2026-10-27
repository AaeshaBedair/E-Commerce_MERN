import express from "express";
import { register } from "../services/userService";
import { login } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";
import { getMyOrders } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.get("/my-orders", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const{statusCode, data} = await getMyOrders({ userId});
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
