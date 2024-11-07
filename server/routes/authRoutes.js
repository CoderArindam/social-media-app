import express from "express";
import { signup, login, me } from "../controllers/authContoller.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, me); // Protect the `/me` route with the `verifyToken` middleware

export default router;
