import express from "express";
import { deleteUser, getUser, updateUser } from "../Controllers/UserController";

const router = express.Router();

// get user from db
router.get("/:id", getUser);

// update a user
router.put("/:id", updateUser);

// Delete user
router.delete(":/id", deleteUser);

export default router;
