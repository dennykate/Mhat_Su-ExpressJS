import tryCatch from "../helper/tryCatch.js";
import {
  _googleAuth,
  _facebookAuth,
  _refreshToken,
} from "../services/auth.service.js";

export const googleAuth = tryCatch(async (req, res) => {
  const authService = await _googleAuth(req);

  return res.success(authService);
});

export const facebookAuth = tryCatch(async (req, res) => {
  const authService = await _facebookAuth(req);

  return res.success(authService);
});

export const refreshToken = tryCatch(async (req, res) => {
  const authService = await _refreshToken(req);

  return res.success(authService);
});
