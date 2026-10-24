import express, { type Response } from "express";
import {
  getActiveCartForUser,
  addItemToCart,
  updateItemInToCart,
  deleteItemInCart,
  clearCart,
  checkout,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import type { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.delete("/", validateJWT, async (req: ExtendRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const response = await clearCart({ userId });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const { productId, quantity } = req.body;
    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const { productId, quantity } = req.body;
    const response = await updateItemInToCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

router.delete(
  "/items/:productId",
  validateJWT,
  async (req: ExtendRequest, res) => {
    try {
      if (!req.user) {
        res.status(401).send("Unauthorized");
        return;
      }
      const userId = req.user._id.toString();
      const { productId } = req.params;
      const response = await deleteItemInCart({ userId, productId });
      res.status(response.statusCode).send(response.data);
    } catch {
      res.status(500).send("Something went wrong!");
    }
  },
);

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).send("Unauthorized");
      return;
    }
    const userId = req.user._id.toString();
    const { address } = req.body;
    const response = await checkout({ userId, address });
    res.status(response.statusCode).send(response.data);
  } catch {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
