import express from "express";
import {
  createPost,
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

export default router;
