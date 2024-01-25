import { BadRequestError } from "../helper/customErrors.js";

import getOAuthUserInfo from "../libs/getOAuthUserInfo.js";
import { generate } from "../libs/jwt.js";

import AuthModel from "../models/auth.model.js";
import ProfileModel from "../models/profile.model.js";

export const _googleAuth = async (req) => {
  const userInfo = await getOAuthUserInfo(req.body["access_token"]);

  if (userInfo?.error) throw new BadRequestError("Invalid Credentials");

  const { email, sub, name, picture } = userInfo;

  const isExistUser = await AuthModel.findOne({ google_id: sub });

  if (isExistUser) {
    const payload = {
      id: isExistUser._id,
    };

    const token = generate(payload);

    return { token };
  } else {
    const newUser = await AuthModel.create({
      google_id: sub,
    });

    await ProfileModel.create({
      name,
      email,
      image: picture,
      auth: newUser._id,
    });

    const payload = {
      id: newUser._id,
    };

    const token = generate(payload);

    return { token };
  }
};

export const createAuth = async (user, type) => {
  const store_id = type === "google" ? "google_id" : "facebook_id";

  const isExist = await AuthModel.findOne({ [store_id]: user?.id });

  if (isExist) {
    const token = generate({ id: isExist.id, auth_type: "google" });

    return { token };
  }

  const auth = await AuthModel.create({
    [store_id]: user?.id,
  });

  ProfileModel.create({
    name: user?.displayName,
    image: user?.photos[0]?.value,
    auth: auth._id,
  });

  console.log(auth);

  const token = generate({ id: auth.id, auth_type: type });

  return { token };
};

export const _getAuth = async (id) => {
  return await AuthModel.findById(id);
};
