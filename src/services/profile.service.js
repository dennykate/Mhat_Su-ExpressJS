import ProfileModel from "../models/profile.model.js";
import { BadRequestError, NotFoundError } from "../helper/customErrors.js";
import uploadImage from "../libs/uploadImage.js";

export const _getProfile = async (id) => {
  const profile = await ProfileModel.findOne({ auth: id });

  if (!profile) {
    throw new NotFoundError("Invalid Id");
  }

  return profile;
};

export const _updateProfile = async (req) => {
  const profile = await ProfileModel.findOne({ auth: req.user._id });

  if (!profile) throw new BadRequestError();

  let image = "";

  if (req.file) {
    image = await uploadImage(req.file.buffer, profile.name.toLowerCase());
  }

  profile.name = req.body.name ?? profile.name;
  profile.image = image ?? profile.image;
  profile.date_of_birth = req.body.date_of_birth ?? profile.date_of_birth;

  await profile.save();

  return { profile };
};
