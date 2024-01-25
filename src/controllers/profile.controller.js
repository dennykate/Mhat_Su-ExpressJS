import tryCatch from "../helper/tryCatch.js";
import { _getProfile } from "../services/profile.service.js";

export const me = tryCatch(async (req, res) => {
  const profile = req?.user?.profile;

  return res.success(profile);
});
