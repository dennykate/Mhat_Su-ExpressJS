import tryCatch from "../helper/tryCatch.js";
import { generate } from "../libs/jwt.js";
import AuthModel from "../models/auth.model.js";
import ProfileModel from "../models/profile.model.js";

export const _googleAuth = async (req) => {
  const userInfo = await getOAuthUserInfo(req.body["access_token"]);
  const { email, sub, id } = userInfo;

  console.log("user info", userInfo);

  return;

  const isExistUser = await AuthModel.findOne({ google_id: id });

  if (isExistUser) {
    const payload = {
      id: isExistUser._id,
      verified_at: isExistUser.verified_at,
    };

    const token = generate(payload);

    return { access_token: token, is_verified: !!payload["verified_at"] };
  } else {
    const newUser = await User.create({
      name: null,
      email,
      password: null,
      verified_at: new Date(),
      google_id: sub,
    });

    const payload = {
      id: newUser._id,
      verified_at: newUser.verified_at,
    };

    const token = generate(payload);

    return { access_token: token, is_verified: !!payload["verified_at"] };
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
