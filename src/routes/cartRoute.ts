import express, { type Response } from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import type { ExtendRequest } from "../middlewares/validateJWT";

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

export default router;
