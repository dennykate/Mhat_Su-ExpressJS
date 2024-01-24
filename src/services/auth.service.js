import { generate } from "../libs/jwt.js";
import AuthModel from "../models/auth.model.js";
import ProfileModel from "../models/profile.model.js";

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
