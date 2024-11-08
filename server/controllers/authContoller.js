import jwt from "jsonwebtoken";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const getTokenFromCookies = (req) => req.cookies.token;

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Error registering user. Please try again later." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const [results] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true }).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Error logging in. Please try again later." });
  }
};

export const me = (req, res) => {
  const token = getTokenFromCookies(req);

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sql = "SELECT id, username, email FROM users WHERE id = ?";
    db.execute(sql, [decoded.id])
      .then(([results]) => {
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(results[0]);
      })
      .catch((err) => {
        console.error("Fetch user error:", err);
        res.status(500).json({ message: "Error fetching user data." });
      });
  } catch (err) {
    console.error("Invalid token:", err);
    res.status(403).json({ message: "Invalid token." });
  }
};
