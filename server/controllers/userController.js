import db from "../config/db.js";

// Function to follow another user

export const followUser = async (req, res) => {
  const { userId } = req; // The logged-in user
  const { followId } = req.body; // The user to be followed

  // Validate the input data
  if (!userId || !followId) {
    return res
      .status(400)
      .json({ message: "User ID and Follow ID are required" });
  }

  if (userId === followId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    // Check if the user is already following the target user
    const [existingFollow] = await db.execute(
      "SELECT * FROM followers WHERE follower_id = ? AND following_id = ?",
      [userId, followId]
    );

    if (existingFollow.length > 0) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Insert the follow relationship into the followers table
    await db.execute(
      "INSERT INTO followers (follower_id, following_id) VALUES (?, ?)",
      [userId, followId]
    );

    // Return a success message
    res.status(201).json({ message: "User followed successfully" });
  } catch (err) {
    console.error("Error in following user:", err);
    res.status(500).json({ message: "Error in following user" });
  }
};

// Function to unfollow a user
export const unfollowUser = async (req, res) => {
  const { userId } = req;
  const { unfollowId } = req.body;

  // Validate the input data
  if (!userId || !unfollowId) {
    return res
      .status(400)
      .json({ message: "User ID and Unfollow ID are required" });
  }

  try {
    // Delete the follow relationship from the followers table
    const [result] = await db.execute(
      "DELETE FROM followers WHERE follower_id = ? AND following_id = ?",
      [userId, unfollowId]
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
  const { profileId } = req.params; // Profile ID from the route parameter
  const { userId } = req; // The logged-in user

  // Validate the profileId
  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required" });
  }

  try {
    // Get the user profile details including posts and followers/following info
    const [profileData] = await db.execute(
      `SELECT 
        u.id, u.username, u.email,
        (SELECT COUNT(*) FROM followers WHERE following_id = u.id) AS followersCount,
        (SELECT COUNT(*) FROM followers WHERE follower_id = u.id) AS followingCount,
        (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS postCount,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('followerId', f.follower_id, 'followerUsername', u2.username)) 
         FROM followers f 
         LEFT JOIN users u2 ON f.follower_id = u2.id 
         WHERE f.following_id = u.id) AS followers,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('followingId', f.following_id, 'followingUsername', u2.username)) 
         FROM followers f 
         LEFT JOIN users u2 ON f.following_id = u2.id 
         WHERE f.follower_id = u.id) AS following,
        p.id AS postId, p.content, p.caption, p.image, p.created_at,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS commentCount
      FROM users u
      LEFT JOIN posts p ON p.user_id = u.id
      WHERE u.id = ?
      ORDER BY p.created_at DESC`,
      [profileId]
    );

    if (profileData.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no posts available" });
    }

    const profile = profileData[0];

    // Safely handle null or undefined followers and following fields
    const followers = profile.followers || [];
    const following = profile.following || [];

    // Check if the logged-in user is following the profile
    const isFollowing = followers.some(
      (follower) => follower.followerId === userId
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
