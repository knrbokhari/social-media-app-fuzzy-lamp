import express from "express";
import {
  createChat,
  findChat,
  userChats,
} from "../Controllers/ChatController.js";
const router = express.Router();

router.post("/", createChat);
router.get("/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

const configureChatRoutes = (app) => {
  app.use("/chat", router);
};

export default configureChatRoutes;
