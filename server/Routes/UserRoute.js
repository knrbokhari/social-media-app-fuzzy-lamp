import express from "express";
import { getUser } from "../Controllers/UserController";

const router = express.Router();

// get user from db
router.get("/:id", getUser);

export default router;
