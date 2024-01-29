import { UnauthenticatedError } from "../helper/customErrors.js";
import { decode } from "../libs/jwt.js";
import { _getAuth } from "../services/auth.service.js";
import { _getProfile } from "../services/profile.service.js";

export default async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return next(new UnauthenticatedError());
    }

    const [type, token] = authorization.split(" ");

    if (type != "Bearer") {
      return next(new UnauthenticatedError());
    }

    const payload = await decode(token);

    const auth = await _getAuth(payload.id);

    if (!auth) next(new UnauthenticatedError());

    const profile = await _getProfile(auth.id);

    req.user = { ...auth._doc, profile, auth_type: payload.auth_type };

    return next();
  } catch (err) {
    console.log(err);
    return next(new UnauthenticatedError("Token expired"));
  }
};
