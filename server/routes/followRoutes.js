import express from "express";
import { followUser } from "../controllers/followController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:followedId/follow", verifyToken, followUser);

export default router;
