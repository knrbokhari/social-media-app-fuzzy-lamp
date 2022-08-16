import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  UnFollowUser,
  updateUser,
  getAllUsers,
} from "../Controllers/UserController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

// get all user
router.get("/", getAllUsers);

// get user from db
router.get("/:id", getUser);

// update a user
router.put("/:id", authMiddleWare, updateUser);

// Delete user
router.delete(":/id", authMiddleWare, deleteUser);

// Follow a User
router.put("/:id/follow", authMiddleWare, followUser);

// UnFollow a User
router.put("/:id/unfollow", authMiddleWare, UnFollowUser);

export default router;
