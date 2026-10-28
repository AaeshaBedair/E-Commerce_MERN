import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";
import { ICartItem } from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
import mongoose from "mongoose";
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
  populateProduct?: boolean;
}

export const getActiveCartForUser = async ({
  userId,
  populateProduct,
}: getActiveCartForUser) => {
  let cart;
  if (populateProduct) {
    cart = await cartModel
      .findOne({ userId, status: "active" })
      .populate("items.product");
  } else {
    cart = await cartModel.findOne({ userId, status: "active" });
  }
  if (!cart) {
    cart = await createCartForUser({ userId });
  }
  return cart;
};

interface ClearCart {
  userId: string;
}
export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });

  cart.items = [];
  cart.totalAmount = 0;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
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
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
const calculateCartTotalItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice;
    return sum;
  }, 0);
  return total;
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

  let total = calculateCartTotalItems({ cartItems: otherCartItems });

  existsInCart.quantity = quantity;
  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};

interface DeleteItemInCart {
  productId: any;
  userId: string;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId,
  );

  if (!existsInCart) {
    return { data: "Item dose not exist in cart!", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId,
  );

  const total = calculateCartTotalItems({ cartItems: otherCartItems });
  cart.items = otherCartItems;
  cart.totalAmount = total;
  await cart.save();
  return {
    data: await getActiveCartForUser({ userId, populateProduct: true }),
    statusCode: 200,
  };
};
interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address?.trim()) {
    return { data: "Please add your address", statusCode: 400 };
  }

  const cart = await cartModel.findOne({
    userId,
    status: "active",
  });

  if (!cart || cart.items.length === 0) {
    return { data: "Cart is empty", statusCode: 400 };
  }

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return { data: "Invalid item quantity", statusCode: 400 };
    }

    const product = await productModel.findById(item.product.toString());

    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }

    if (product.stock < item.quantity) {
      return {
        data: `Insufficient stock for ${product.title}`,
        statusCode: 400,
      };
    }

    orderItems.push({
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    });
  }

  const cartId = new mongoose.Types.ObjectId(cart.id);

  const claimedCart = await cartModel.findOneAndUpdate(
    { _id: cartId, status: "active" },
    { $set: { status: "processing" } },
    { new: true },
  );

  if (!claimedCart) {
    return {
      data: "Checkout is already being processed",
      statusCode: 409,
    };
  }

  const decrementedItems: {
    productId: string;
    quantity: number;
  }[] = [];

  let orderCreated = false;

  try {
    for (const item of claimedCart.items) {
      const productId = item.product.toString();

      const updatedProduct = await productModel.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(productId),
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { new: true },
      );

      if (!updatedProduct) {
        throw new Error("INSUFFICIENT_STOCK");
      }

      decrementedItems.push({
        productId,
        quantity: item.quantity,
      });
    }

    const order = await orderModel.create({
      orderItems,
      userId,
      total: claimedCart.totalAmount,
      address: address.trim(),
    });

    orderCreated = true;

    const completedCart = await cartModel.findOneAndUpdate(
      { _id: cartId, status: "processing" },
      { $set: { status: "completed" } },
      { new: true },
    );

    if (!completedCart) {
      console.error(
        "Order created but cart was not completed:",
        cartId.toString(),
      );
    }

    return { data: order, statusCode: 200 };
  } catch (error) {
    if (!orderCreated) {
      for (const item of decrementedItems) {
        try {
          await productModel.updateOne(
            { _id: new mongoose.Types.ObjectId(item.productId) },
            { $inc: { stock: item.quantity } },
          );
        } catch (rollbackError) {
          console.error("Stock rollback failed:", rollbackError);
        }
      }

      try {
        await cartModel.updateOne(
          { _id: cartId, status: "processing" },
          { $set: { status: "active" } },
        );
      } catch (rollbackError) {
        console.error("Cart rollback failed:", rollbackError);
      }
    }

    if (error instanceof Error && error.message === "INSUFFICIENT_STOCK") {
      return {
        data: "One or more products are out of stock",
        statusCode: 400,
      };
    }

    console.error("Checkout failed:", error);

    return {
      data: "Checkout failed. Please try again",
      statusCode: 500,
    };
  }
};
