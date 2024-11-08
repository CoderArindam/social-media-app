import db from "../config/db.js";

// Helper function to handle errors
const handleError = (res, error, message, statusCode = 500) => {
  console.error(message, error);
  return res.status(statusCode).json({ message });
};

export const followUser = async (req, res) => {
  const { username } = req.params;
  const { followerUsername } = req.body;

  if (!username || !followerUsername) {
    return res.status(400).json({ message: "Both usernames are required" });
  }

  if (username === followerUsername) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    const [existingFollow] = await db.execute(
      "SELECT * FROM followers WHERE follower_username = ? AND following_username = ?",
      [followerUsername, username]
    );

    if (existingFollow.length > 0) {
      return res.status(400).json({ message: "Already following this user" });
    }

    await db.execute(
      "INSERT INTO followers (follower_username, following_username) VALUES (?, ?)",
      [followerUsername, username]
    );

    res.status(201).json({ message: "User followed successfully" });
  } catch (err) {
    handleError(res, err, "Error in following user");
  }
};

export const unfollowUser = async (req, res) => {
  const { username } = req.params;
  const { followerUsername } = req.body;

  if (!username || !followerUsername) {
    return res.status(400).json({ message: "Both usernames are required" });
  }

  try {
    const [result] = await db.execute(
      "DELETE FROM followers WHERE follower_username = ? AND following_username = ?",
      [followerUsername, username]
    );

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {
    handleError(res, err, "Error in unfollowing user");
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  const { userId } = req;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const [profileData] = await db.execute(
      `SELECT 
        u.id, u.username, u.email,
        (SELECT COUNT(*) FROM followers WHERE following_username = u.username) AS followersCount,
        (SELECT COUNT(*) FROM followers WHERE follower_username = u.username) AS followingCount,
        (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS postCount,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('followerUsername', f.follower_username)) 
         FROM followers f 
         WHERE f.following_username = u.username) AS followers,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('followingUsername', f.following_username)) 
         FROM followers f 
         WHERE f.follower_username = u.username) AS following,
        p.id AS postId, p.content, p.caption, p.image, p.created_at,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS commentCount
      FROM users u
      LEFT JOIN posts p ON p.user_id = u.id
      WHERE u.username = ?
      ORDER BY p.created_at DESC`,
      [username]
    );

    if (profileData.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no posts available" });
    }

    const profile = profileData[0];
    const followers = profile.followers || [];
    const following = profile.following || [];

    const isFollowing = followers.some(
      (follower) => follower.followerUsername === userId
    );

    const posts = profileData.map((post) => ({
      postId: post.postId,
      content: post.content,
      caption: post.caption,
      image: post.image,
      created_at: new Date(post.created_at).toISOString(),
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      username: profile.username,
      comments: [],
    }));

    res.json({
      id: profile.id,
      username: profile.username,
      email: profile.email,
      followersCount: profile.followersCount,
      followingCount: profile.followingCount,
      postCount: profile.postCount,
      followers,
      following,
      isFollowing,
      posts,
    });
  } catch (err) {
    handleError(res, err, "Error fetching user profile");
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const [results] = await db.execute(
      `SELECT id, username, email FROM users WHERE username LIKE ? OR email LIKE ? LIMIT 5`,
      [`%${query}%`, `%${query}%`]
    );

    res.status(200).json(results);
  } catch (error) {
    handleError(res, error, "Error searching users");
  }
};
