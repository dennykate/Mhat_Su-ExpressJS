import { BadRequestError } from "../helper/customErrors.js";
import getFacebookUserInfo from "../libs/getFacebookUserInfo.js";

import getOAuthUserInfo from "../libs/getOAuthUserInfo.js";
import { decode, generate } from "../libs/jwt.js";

import AuthModel from "../models/auth.model.js";
import ProfileModel from "../models/profile.model.js";
import { _createTheme } from "./theme.service.js";

export const _googleAuth = async (req) => {
  const userInfo = await getOAuthUserInfo(req.body["access_token"]);

  if (userInfo?.error) throw new BadRequestError("Invalid Credentials");

  const { email, sub, name, picture } = userInfo;

  const isExistUser = await AuthModel.findOne({ google_id: sub });

  if (isExistUser) {
    const profile = await ProfileModel.findOne({ auth: isExistUser._id });

    const access_payload = {
      id: isExistUser._id,
      profile,
    };

    const refresh_payload = {
      id: isExistUser._id,
    };

    const access_token = generate(access_payload, "access");
    const refresh_token = generate(refresh_payload, "refresh");

    return { access_token, refresh_token };
  } else {
    const newUser = await AuthModel.create({
      google_id: sub,
    });

    const profile = await ProfileModel.create({
      name,
      email,
      image: picture,
      auth: newUser._id,
    });

    const access_payload = {
      id: newUser._id,
      profile,
    };

    const refresh_payload = {
      id: newUser._id,
    };

    const access_token = generate(access_payload, "access");
    const refresh_token = generate(refresh_payload, "refresh");

    await _createTheme(newUser._id, {
      name: "default",
      bg_color: "#f5f5f5",
      font_family: "roboto",
    });

    return { access_token, refresh_token };
  }
};

export const _facebookAuth = async (req) => {
  const userInfo = await getFacebookUserInfo(req.body["access_token"]);

  if (userInfo?.error) throw new BadRequestError("Invalid Credentials");

  const { name, email, picture, id } = userInfo;

  const isExistUser = await AuthModel.findOne({ facebook_id: id });

  if (isExistUser) {
    const profile = await ProfileModel.findOne({ auth: isExistUser._id });

    const access_payload = {
      id: isExistUser._id,
      profile,
    };

    const refresh_payload = {
      id: isExistUser._id,
    };

    const access_token = generate(access_payload, "access");
    const refresh_token = generate(refresh_payload, "refresh");

    return { access_token, refresh_token };
  } else {
    const newUser = await AuthModel.create({
      facebook_id: id,
    });

    const profile = await ProfileModel.create({
      name: name,
      email: email,
      image: picture?.data?.url,
      auth: newUser._id,
    });

    const access_payload = {
      id: newUser._id,
      profile,
    };

    const refresh_payload = {
      id: newUser._id,
    };

    const access_token = generate(access_payload, "access");
    const refresh_token = generate(refresh_payload, "refresh");

    await _createTheme(newUser._id, {
      name: "default",
      bg_color: "#f5f5f5",
      font_family: "roboto",
    });

    return { access_token, refresh_token };
  }
};

export const _getAuth = async (id) => {
  return await AuthModel.findById(id);
};

export const _refreshToken = async (req) => {
  const body = req.body;

  const payload = await decode(body.refresh_token);

  const auth = await AuthModel.findById(payload.id);

  if (!auth) throw new BadRequestError("User not found");

  const profile = await ProfileModel.findOne({ auth: payload.id });

  const access_payload = {
    id: auth._id,
    profile,
  };

  const refresh_payload = {
    id: auth.id,
  };

  const access_token = generate(access_payload, "access");
  const refresh_token = generate(refresh_payload, "refresh");

  return { access_token, refresh_token };
};
