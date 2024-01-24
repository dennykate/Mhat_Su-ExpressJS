import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";

import googlePassport from "./src/strategies/google.strategy.js";
import facebookPassport from "./src/strategies/facebook.strategy.js";

import config from "./src/config/index.js";
import corsOptions from "./src/helper/corsOptions.js";

import routes from "./src/routes/index.js";
import responseMiddleware from "./src/middlewares/response.middleware.js";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);

// for google oauth
app.use(googlePassport.initialize());
app.use(googlePassport.session());

// for facebook auth
app.use(facebookPassport.initialize());
app.use(facebookPassport.session());

// for success and error response
app.use(responseMiddleware);

// implement routes
app.use(config.API_PREFIX + "/v1", routes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

mongoose.connect(config.MONGO_URL).then(() => {
  console.log("DB connected");
  app.listen(config.PORT, () => {
    console.log(`Server running at port - ${config.PORT}`);
  });
});

export default app;
