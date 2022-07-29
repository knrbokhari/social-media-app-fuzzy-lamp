import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  UnFollowUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

// get user from db
router.get("/:id", getUser);

// update a user
router.put("/:id", updateUser);

// Delete user
router.delete(":/id", deleteUser);

// Follow a User
router.put("/:id", followUser);

// UnFollow a User
router.put("/:id", UnFollowUser);

export default router;
