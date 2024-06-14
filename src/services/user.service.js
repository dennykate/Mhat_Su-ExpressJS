import { NotFoundError } from "../helper/custom-errors.js";
import UserModel from "../models/user.model.js";

export const findUserService = async (_id) => {
  const user = await UserModel.findOne({ _id });

  if (!user) throw new NotFoundError("User not found");

  return user;
};

export const findAllUserService = async (req) => {
  const users = await UserModel.find({ _id: { $ne: req?.user?.id } }).sort({
    created_at: 1,
  });

  return users;
};
