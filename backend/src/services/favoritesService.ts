import userModel from "../models/userModel";
import productModel from "../models/productModel";
import mongoose from "mongoose";

export const getFavorites = async (userId: string) => {
  const user = await userModel.findById(userId).populate("favorites");
  if (!user) {
    return {
      data: "User not found",
      statusCode: 404,
    };
  }
  return {
    data: user.favorites,
    statusCode: 200,
  };
};
export const addFavorite = async (userId: string, productId: string) => {
  if (!mongoose.isValidObjectId(productId)) {
    return { data: "Invalid product ID", statusCode: 400 };
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }
  const user = await userModel.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: product._id } },
    { new: true },
  );
  if (!user) {
    return { data: "User not found", statusCode: 404 };
  }
  return {
    data: "Product added to favorites",
    statusCode: 200,
  };
};
export const removeFavorite = async (
  userId: string,
  productId: string
) => {
  if (!mongoose.isValidObjectId(productId)) {
    return { data: "Invalid product ID", statusCode: 400 };
  }
  const user = await userModel.findByIdAndUpdate(
    userId,
    {
      $pull: { favorites: productId },
    },
    { new: true }
  );
  if (!user) {
    return { data: "User not found", statusCode: 404 };
  }
  return {
    data: "Product removed from favorites",
    statusCode: 200,
  };
};