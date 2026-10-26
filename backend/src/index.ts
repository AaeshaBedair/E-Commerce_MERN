import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import favoritesRoute from "./routes/favoritesRoute";
import path from "node:path";
import cors from "cors";

const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

seedInitialProducts();
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/user/favorites", favoritesRoute);
app.use(
  "/images",
  express.static(path.join(process.cwd(), "public", "images")),
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
