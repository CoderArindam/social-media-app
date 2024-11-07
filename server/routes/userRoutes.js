import express from "express";
import {
  followUser,
  unfollowUser,
  getUserProfile,
  searchUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for following/unfollowing users by their username
router.post("/follow/:username", verifyToken, followUser);
router.post("/unfollow/:username", verifyToken, unfollowUser);

// Profile and search routes
router.get("/profile/:username", verifyToken, getUserProfile);
router.get("/search", verifyToken, searchUsers);

export default router;
