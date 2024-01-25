import mongoose, { Schema, model, modelNames } from "mongoose";

export const ProfileSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  auth: {
    type: String,
  },
});

const ProfileModel = modelNames.Profile || model("Profile", ProfileSchema);

export default ProfileModel;
