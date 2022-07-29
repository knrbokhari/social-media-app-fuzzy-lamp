import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

// Creat new Post
router.post("/", createPost);

// Get a post
router.get("/:id", getPost);

// Update a post
router.put("/:id", updatePost);

// Delete a post
router.delete("/:id", deletePost);

export default router;
