import express from "express";
import {
  followUser,
  unfollowUser,
  getUserProfile,
  searchUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);
router.get("/profile/:username", verifyToken, getUserProfile);
router.get("/search", verifyToken, searchUsers);

export default router;
