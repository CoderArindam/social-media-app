import db from "../config/db.js";

export const followUser = async (req, res) => {
  const { followedId } = req.params; // ID of the user being followed
  const followerId = req.userId; // ID of the user who is following

  // Validate the input (both IDs must be present)
  if (!followerId || !followedId) {
    return res
      .status(400)
      .json({ error: "Follower ID and Followed ID are required" });
  }

  try {
    // Check if the user is already following the target user
    const [exists] = await db.execute(
      `SELECT * FROM follows WHERE follower_id = ? AND followed_id = ?`,
      [followerId, followedId]
    );

    if (exists.length > 0) {
      // If already following, return an error message
      return res.status(400).json({ error: "Already following this user" });
    }

    // If not already following, insert a new follow relationship into the database
    await db.execute(
      `INSERT INTO follows (follower_id, followed_id) VALUES (?, ?)`,
      [followerId, followedId]
    );

    // Return success response
    res.status(201).json({ message: "User followed successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in following user:", error);
    res.status(500).json({ error: "Error following user" });
  }
};
