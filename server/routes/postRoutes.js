import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createPost);
router.get("/", getAllPosts);

export default router;
