import tryCatch from "../helper/tryCatch.js";
import { _getProfile, _updateProfile } from "../services/profile.service.js";

export const me = tryCatch(async (req, res) => {
  const profile = req?.user?.profile;

  return res.success(profile);
});

export const update = tryCatch(async (req, res) => {
  const profile = await _updateProfile(req);

  return res.success(profile);
});
