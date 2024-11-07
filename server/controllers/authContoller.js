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
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const [result] = await db.execute(sql, [username, email, hashedPassword]);

    // Respond with success message and user ID
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
    // Check if the user exists by email
    const sql = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.execute(sql, [email]);

    // If no user found, send an error
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    // Compare the hashed password with the input password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token for the user
    const token = generateToken(user.id);

    // Set token in cookies (HTTP Only) and return username, email, and token in response
    res.cookie("token", token, { httpOnly: true }).json({
      token,
      user: {
        id: user.id,
        username: user.username, // Include username in the response
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in login" });
  }
};

// The 'me' function to get the user details from the token
export const me = (req, res) => {
  const token = getTokenFromCookies(req);

  // If token is not found, return an error
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token using JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user details from the database
    const sql = "SELECT id, username, email FROM users WHERE id = ?";
    db.execute(sql, [decoded.id])
      .then(([results]) => {
        // If no user found with the decoded ID, return an error
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        // Send back the user data (id, username, email)
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
