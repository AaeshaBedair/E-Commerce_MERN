import express, { type Response } from "express";
import {
  getActiveCartForUser,
  addItemToCart,
  updateItemInToCart,
  deleteItemInCart,
  clearCart,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import type { ExtendRequest } from "../types/extendedRequest";

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

router.delete("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = req.user._id.toString();
  const response = await clearCart({ userId });
  res.status(response.statusCode).send(response.data);
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

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }

    const userId = req.user._id.toString();
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId });
    res.status(response.statusCode).send(response.data);
  },
);

export default router;
