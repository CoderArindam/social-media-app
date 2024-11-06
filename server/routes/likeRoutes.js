import express from "express";
import { likePost } from "../controllers/likeController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId/like", authenticateToken, likePost);

export default router;
