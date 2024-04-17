const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressApp = require("./express-app");

const SatrtServer = async () => {
  const app = express();
  dotenv.config();

  // app.use(express.json());
  // app.use("/", (req, res, next) => {
  //   return res.status(200).json({ msg: "Group service" });
  // });

  const MONGOURL = process.env.MONGO_URL;
  mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log("Connected to Mongo");
    })
    .catch((err) => console.log(err));

  await expressApp(app);

  app.listen(8002, () => {
    console.log("Group service listening on 8002");
  });
};

SatrtServer();