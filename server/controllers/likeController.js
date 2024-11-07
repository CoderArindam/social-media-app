import db from "../config/db.js";

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  // Validate the input
  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required" });
  }

  try {
    // Check if the user has already liked the post
    const [exists] = await db.execute(
      `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`,
      [userId, postId]
    );

    if (exists.length > 0) {
      // If the user has already liked the post, return an error
      return res.status(400).json({ error: "Post already liked" });
    }

    // Insert the like into the database
    await db.execute(`INSERT INTO likes (user_id, post_id) VALUES (?, ?)`, [
      userId,
      postId,
    ]);

    // Return success message
    res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error in liking post:", error);
    res.status(500).json({ error: "Error liking post" });
  }
};
