import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orderModel";
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "User already exists", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface loginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Incorrect email or password", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect email or password", statusCode: 400 };
};
interface GetMyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: GetMyOrdersParams) => {
  const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

  return {
    data: orders,
    statusCode: 200,
  };
};

const generateJWT = (data: any) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign(data, secret);
};
