import express from "express";
import { likePost } from "../controllers/likeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId/like", verifyToken, likePost);

export default router;
