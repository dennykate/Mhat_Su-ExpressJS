import mongoose from "mongoose";
import ProfileModel from "../models/profile.model.js";
import { NotFoundError } from "../helper/customErrors.js";

export const _getProfile = async (id) => {
  const profile = await ProfileModel.findOne({ auth: "eqweqweqwe" });

  if (!profile) {
    throw new NotFoundError("Invalid Id");
  }

  return profile;
};
