import { BadRequestError } from "../helper/customErrors.js";
import getFacebookUserInfo from "../libs/getFacebookUserInfo.js";

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

    await ProfileModel.findOneAndUpdate(
      { auth: isExistUser._id },
      {
        $set: {
          name: name,
          image: picture,
        },
      },
      { new: true }
    );

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

export const _facebookAuth = async (req) => {
  const userInfo = await getFacebookUserInfo(req.body["access_token"]);

  if (userInfo?.error) throw new BadRequestError("Invalid Credentials");

  const { name, email, picture, id } = userInfo;

  const isExistUser = await AuthModel.findOne({ facebook_id: id });

  if (isExistUser) {
    const payload = {
      id: isExistUser._id,
    };

    await ProfileModel.findOneAndUpdate(
      { auth: isExistUser._id },
      {
        $set: {
          name: name,
          image: picture,
        },
      },
      { new: true }
    );

    const token = generate(payload);

    return { token };
  } else {
    const newUser = await AuthModel.create({
      facebook_id: id,
    });

    await ProfileModel.create({
      name: name,
      email: email,
      image: picture?.data?.url,
      auth: newUser._id,
    });

    const payload = {
      id: newUser._id,
    };

    const token = generate(payload);

    return { token };
  }
};

export const _getAuth = async (id) => {
  return await AuthModel.findById(id);
};
