import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./Routes/AuthRouth.js";

// middlewares
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// connecting to mongobd
mongoose
  .connect(`${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    throw err;
  });

// routes
app.use("/auth", AuthRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
