import express from "express";
import { addMessage, getMessages } from "../Controllers/MessageController.js";

const router = express.Router();

router.post("/", addMessage);

router.get("/:chatId", getMessages);

const configureMessageRoutes = (app) => {
  app.use("/message", router);
};

export default configureMessageRoutes;
