import db from "../config/db.js";

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    const [exists] = await db.query(
      `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`,
      [userId, postId]
    );

    if (exists.length > 0) {
      return res.status(400).json({ error: "Post already liked" });
    }

    await db.query(`INSERT INTO likes (user_id, post_id) VALUES (?, ?)`, [
      userId,
      postId,
    ]);
    res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error liking post" });
  }
};
