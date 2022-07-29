import express from "express";
import { getUser, updateUser } from "../Controllers/UserController";

const router = express.Router();

// get user from db
router.get("/:id", getUser);

// update a user
router.put("/:id", updateUser);

export default router;
