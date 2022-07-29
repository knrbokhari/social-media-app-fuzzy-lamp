import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  likeAndDislikePost,
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

// like/dislike a post
router.put("/:id", likeAndDislikePost);

export default router;
