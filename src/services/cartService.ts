import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCardForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCardForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface getActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: getActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface AddItemToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId,
  );

  if (existsInCart) {
    return { data: "Item already exists in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "Product not fount!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity,
  });
  cart.totalAmount += product.price * quantity;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface updateItemInToCart {
  productId: any;
  quantity: number;
  userId: string;
}

export const updateItemInToCart = async ({
  productId,
  quantity,
  userId,
}: updateItemInToCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId,
  );

  if (!existsInCart) {
    return { data: "Item dose not exist in cart!", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not fount!", statusCode: 400 };
  }

  if (product.stock < quantity) {
    return { data: "low stock for item", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId,
  );

  let total = otherCartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);

  existsInCart.quantity = quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};
