import { _googleAuth, createAuth } from "../services/auth.service.js";

export const googleAuth = async (req, res) => {
  const authService = await _googleAuth(req);

  return res.success(authService);
};

export const facebookAuth = async (req, res) => {
  const authService = await createAuth(req.user, "facebook");

  return res.success(authService);
};
