import { _getProfile } from "../services/profile.service.js";

export const me = async (req, res) => {
  const profile = await _getProfile(req?.user?.id);

  return res.success(profile);
};
