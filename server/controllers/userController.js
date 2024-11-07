import db from "../config/db.js";
export const followUser = async (req, res) => {
  const { username } = req.params; // Target username to follow
  const { followerUsername } = req.body; // Username of the user who wants to follow

  // Validate the input data
  if (!username || !followerUsername) {
    return res.status(400).json({ message: "Both usernames are required" });
  }

  if (username === followerUsername) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    // Check if already following
    const [existingFollow] = await db.execute(
      "SELECT * FROM followers WHERE follower_username = ? AND following_username = ?",
      [followerUsername, username]
    );

    if (existingFollow.length > 0) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Insert the follow relationship
    await db.execute(
      "INSERT INTO followers (follower_username, following_username) VALUES (?, ?)",
      [followerUsername, username]
    );

    res.status(201).json({ message: "User followed successfully" });
  } catch (err) {
    console.error("Error in following user:", err);
    res.status(500).json({ message: "Error in following user" });
  }
};

export const unfollowUser = async (req, res) => {
  const { username } = req.params; // Target username to unfollow
  const { followerUsername } = req.body; // Username of the user who wants to unfollow

  // Validate the input data
  if (!username || !followerUsername) {
    return res.status(400).json({ message: "Both usernames are required" });
  }

  try {
    // Delete the follow relationship
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
    console.error("Error in unfollowing user:", err);
    res.status(500).json({ message: "Error in unfollowing user" });
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params; // Username from the route parameter
  const { userId } = req; // The logged-in user

  // Validate the username
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Fetch the user profile details based on username, including posts and followers/following info
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
    console.log(profile);

    // Safely handle null or undefined followers and following fields
    const followers = profile.followers || [];
    const following = profile.following || [];

    // Check if the logged-in user is following the profile
    const isFollowing = followers.some(
      (follower) => follower.followerUsername === userId
    );

    // Standardize the posts format
    const posts = profileData.map((post) => {
      const createdAt = new Date(post.created_at); // Convert to Date object

      return {
        postId: post.postId,
        content: post.content,
        caption: post.caption,
        image: post.image,
        created_at: createdAt.toISOString(), // Convert to ISO string format (e.g., '2024-11-07T13:45:30.000Z')
        likeCount: post.likeCount,
        commentCount: post.commentCount,
        username: profile.username, // Same username for all posts by this user
        comments: [], // Comments can be fetched separately if needed
      };
    });

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
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// Search Users Controller
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
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Error searching users" });
  }
};
