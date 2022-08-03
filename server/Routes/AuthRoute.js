import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

// register User
router.post("/register", registerUser);
// login User
router.post("/login", loginUser);

export default router;
