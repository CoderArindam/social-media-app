import express from "express";
import {
  followUser,
  unfollowUser,
  getUserProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/follow", verifyToken, followUser);
router.post("/unfollow", verifyToken, unfollowUser);
router.get("/profile/:profileId", verifyToken, getUserProfile);

export default router;
