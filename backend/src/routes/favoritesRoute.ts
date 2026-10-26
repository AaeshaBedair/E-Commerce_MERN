import express from "express";
import validateJWT from "../middlewares/validateJWT";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";
import type { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user._id.toString();
    const { data, statusCode } = await getFavorites(userId);
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/:productId", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user._id.toString();
    const productId = String(req.params.productId);
    const { data, statusCode } = await addFavorite(userId, productId);
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.delete("/:productId", validateJWT, async (req: ExtendRequest, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user._id.toString();
    const productId = String(req.params.productId);
    const { data, statusCode } = await removeFavorite(userId, productId);
    res.status(statusCode).json(data);
  } catch (error) {
    console.error("Remove favorite error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;
