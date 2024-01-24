import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generate = (data) => {
  return jwt.sign(data, config.secret_key, { expiresIn: config.expiresIn });
};

export const decode = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secret_key, (err, payload) => {
      if (err) reject(err);

      resolve(payload);
    });
  });
};
