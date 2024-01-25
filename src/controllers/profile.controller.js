import tryCatch from "../helper/tryCatch.js";
import { _getProfile } from "../services/profile.service.js";

export const me = tryCatch(async (req, res) => {
  const profile = await _getProfilee(req?.user?.id);

  return res.success(profile);
});
