import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
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

// Get Timeline POsts
router.get("/:id/timeline", getTimelinePosts);

export default router;
