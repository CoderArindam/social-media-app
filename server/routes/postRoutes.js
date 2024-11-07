import express from "express";
import {
  createPost,
  likePost,
  commentPost,
  getFeed,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.post("/like", verifyToken, likePost);
router.post("/comment", verifyToken, commentPost);
router.get("/feed", verifyToken, getFeed);

export default router;
