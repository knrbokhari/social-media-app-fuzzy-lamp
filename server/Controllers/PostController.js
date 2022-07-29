import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";

// Creat new Post
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
  
    try {
      await newPost.save();
      res.status(200).json("Post created!");
    } catch (error) {
      res.status(500).json(error);
    }
  };