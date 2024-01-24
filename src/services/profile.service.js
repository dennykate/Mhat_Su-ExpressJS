import mongoose from "mongoose";
import ProfileModel from "../models/profile.model.js";

export const _getProfile = async (id) => {
  const profile = await ProfileModel.findOne({ auth: id });

  console.log(id);
  console.log(profile);
  // if (!profile) {
  //   throw new Error("Invalid id");
  // }

  return profile;
};
