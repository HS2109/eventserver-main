import "dotenv/config";
import express, { Application } from "express";
import cors from "cros";
import helmet from "helmet";
import { errorHandler } from "./utils/middleware/error.middleware";
import { mongoose } from "@typegoose/typegoose";
const eFileUpload = require("express-fileupload");

(async () => {
  const mainRoutes = require("./mainRoutes");

  const app: Application = express();

  app.use(cors({ origin: "*" }));
  app.use(helmet());
  app.use(express.json({ limit: "5000mb" }));
  app.use(
    express.urlencoded({
      limit: "5000mb",
      extended: true,
      parameterLimit: 50000000,
    })
  );

  mongoose
    .connect(
      process.env.DATABASEURL,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });

  mongoose.set("debug", false);

  app.use(eFileUpload());
  app.use("/status", (req, res, next) => {
    res.send({ message: "Success" });
  });

  app.use("/cicd", (req, res, next) => {
    res.send({ message: "CI CD IMPLEMENTED" });
  });

  app.use("/api", mainRoutes);

  app.use(errorHandler);

  const port = process.env.PORT || 6033;
  try {
    app.listen(port, () =>
      console.log(`API server started at http://localhost:${port}`)
    );
  } catch (err) {
    console.log(err);
  }
})();
