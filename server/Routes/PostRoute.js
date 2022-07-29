import express from "express";
import { createPost, getPost } from "../Controllers/PostController.js";

const router = express.Router();

// Creat new Post
router.post("/", createPost);

// Get a post
router.get("/:id", getPost);

export default router;
