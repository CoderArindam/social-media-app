import express from "express";
import { registerUser, loginUser } from "../controllers/authContoller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
