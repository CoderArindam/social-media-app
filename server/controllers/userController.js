import { connectDB } from "../config/db.js";

export const getUserProfile = async (req, res) => {
  const username = req.user; // Get username from JWT token
  const connection = await connectDB();

  const [user] = await connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  const [posts] = await connection.query(
    "SELECT * FROM posts WHERE username = ?",
    [username]
  );

  res.status(200).json({ user: user[0], posts });
};
