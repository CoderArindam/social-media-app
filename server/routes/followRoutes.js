import express from "express";
import { followUser } from "../controllers/followController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:followedId/follow", authenticateToken, followUser);

export default router;
