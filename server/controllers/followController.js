import db from "../config/db.js";

export const followUser = async (req, res) => {
  const { followedId } = req.params;
  const followerId = req.userId;

  try {
    const [exists] = await db.query(
      `SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?`,
      [followerId, followedId]
    );

    if (exists.length > 0) {
      return res.status(400).json({ error: "Already following this user" });
    }

    await db.query(
      `INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)`,
      [followerId, followedId]
    );
    res.status(201).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error following user" });
  }
};
