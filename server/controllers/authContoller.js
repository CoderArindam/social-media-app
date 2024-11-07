import jwt from "jsonwebtoken"; // To verify the token
import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

// Helper to get the token from cookies
const getTokenFromCookies = (req) => {
  const token = req.cookies.token;
  return token;
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await db.execute(sql, [username, email, hashedPassword]);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in signup" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.execute(sql, [email]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true }).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in login" });
  }
};

// The 'me' function to get the user details from the token
export const me = (req, res) => {
  const token = getTokenFromCookies(req);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sql = "SELECT id, username, email FROM users WHERE id = ?";
    db.execute(sql, [decoded.id])
      .then(([results]) => {
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(results[0]);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Error fetching user" });
      });
  } catch (err) {
    console.error("Invalid token", err);
    res.status(403).json({ message: "Invalid token" });
  }
};
