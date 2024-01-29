import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

import config from "./src/config/index.js";

import routes from "./src/routes/index.js";
import responseMiddleware from "./src/middlewares/response.middleware.js";
import errorHandlerMiddleware from "./src/middlewares/errorHandler.middleware.js";
import corsMiddleware from "./src/middlewares/cors.middleware.js";

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse formData
app.use(upload.single("image"));

// for cors protection
app.use(corsMiddleware);

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
