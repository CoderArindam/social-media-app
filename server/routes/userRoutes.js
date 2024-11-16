import express from "express";
import {
  followUser,
  unfollowUser,
  getUserProfile,
  searchUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Profile and search routes
router.get("/profile/:username", getUserProfile);
router.get("/search", verifyToken, searchUsers);

// Routes for following/unfollowing users by their username
router.post("/follow/:username", verifyToken, followUser);
router.post("/unfollow/:username", verifyToken, unfollowUser);

export default router;
