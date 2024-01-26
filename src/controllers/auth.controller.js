import tryCatch from "../helper/tryCatch.js";
import { _googleAuth, _facebookAuth } from "../services/auth.service.js";

export const googleAuth = tryCatch(async (req, res) => {
  const authService = await _googleAuth(req);

  return res.success(authService);
});

export const facebookAuth = tryCatch(async (req, res) => {
  const authService = await _facebookAuth(req);

  return res.success(authService);
});
