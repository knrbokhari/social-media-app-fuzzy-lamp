import express from "express";
import { createPost } from "../Controllers/PostController.js";

const router = express.Router();

// Creat new Post
router.post("/", createPost);

export default router;
