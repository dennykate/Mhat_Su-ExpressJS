import { decode } from "../libs/jwt.js";

export default async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.error("Token is requried");
    }

    const [type, token] = authorization.split(" ");

    if (type != "Bearer") {
      return res.error("Type must be Bearer");
    }

    const payload = await decode(token);
    console.log("payload", payload);
    req.user = payload;

    return next();
  } catch (err) {
    return res.error("Invalid token");
  }
};
