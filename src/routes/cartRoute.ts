import express, { type Response } from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import type { ExtendRequest } from "../types/extendedRequest";
import { addItemToCart } from "../services/cartService";
import { updateItemInToCart } from "../services/cartService";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = req.user._id.toString();

  const cart = await getActiveCartForUser({ userId });

  res.status(200).send(cart);
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = req.user._id.toString();
  const { productId, quantity } = req.body;
  const response = await addItemToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = req.user._id.toString();
  const { productId, quantity } = req.body;
  const response = await updateItemInToCart({ userId, productId, quantity });
  res.status(response.statusCode).send(response.data);
});

export default router;
