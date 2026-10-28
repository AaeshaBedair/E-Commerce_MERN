import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";
import { ICartItem } from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";

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
  if (!address) {
    return { data: "Please add your address", statusCode: 404 };
  }
  const cart = await getActiveCartForUser({ userId });
  if (!cart) {
    return { data: "Cart not found", statusCode: 404 };
  }

  const orderItems: IOrderItem[] = [];

  for (const item of cart.items) {
    const product = await productModel.findById(item.product);
    if (!product) {
      return { data: "Product not found", statusCode: 400 };
    }
    const orderItem: IOrderItem = {
      productTitle: product.title,
      productImage: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };
    orderItems.push(orderItem);
  }
  const order = await orderModel.create({
    orderItems,
    userId,
    total: cart.totalAmount,
    address,
  });

  await order.save();
  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
