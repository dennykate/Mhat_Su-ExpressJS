import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import config from "./src/config/index.js";

import routes from "./src/routes/index.js";
import responseMiddleware from "./src/middlewares/response.middleware.js";
import errorHandlerMiddleware from "./src/middlewares/errorHandler.middleware.js";
import corsMiddleware from "./src/middlewares/cors.middleware.js";

const app = express();

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for success and error response
app.use(responseMiddleware);

// implement routes
app.use(config.API_PREFIX + "/v1", routes);

// error handling
app.use(errorHandlerMiddleware);

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
