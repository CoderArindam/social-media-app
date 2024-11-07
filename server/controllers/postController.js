import db from "../config/db.js";

// Function to create a post
export const createPost = async (req, res) => {
  const { userId } = req; // Extract userId from request, assuming auth middleware sets this
  const { content, image, caption } = req.body;

  // Check that user ID and content/caption/image are present
  if (!userId || (!content && !image)) {
    return res
      .status(400)
      .json({ message: "Content or image is required to create a post" });
  }

  // Prepare the SQL statement
  const sql =
    "INSERT INTO posts (user_id, content, image, caption) VALUES (?, ?, ?, ?)";

  try {
    // Execute the query with user input
    const [result] = await db.execute(sql, [userId, content, image, caption]);

    // Check if insertion was successful
    if (result.affectedRows > 0) {
      // Respond with success message and new post ID
      res.status(201).json({
        message: "Post created successfully",
        postId: result.insertId,
      });
    } else {
      // Handle case where no rows were inserted
      res.status(500).json({ message: "Failed to create post" });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
};

// Function to like a post

export const likePost = async (req, res) => {
  const { userId } = req; // Assuming `userId` is attached via a middleware or JWT
  const { postId } = req.body;

  // Validate that userId and postId are present
  if (!userId || !postId) {
    return res
      .status(400)
      .json({ message: "User ID and Post ID are required" });
  }

  try {
    // Check if the user has already liked the post
    const [likeExists] = await db.execute(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );

    if (likeExists.length > 0) {
      // If like exists, remove it (unlike)
      await db.execute("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);
      return res.status(200).json({ message: "Post unliked" });
    } else {
      // If like does not exist, add it (like)
      await db.execute("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [
        userId,
        postId,
      ]);
      return res.status(200).json({ message: "Post liked" });
    }
  } catch (err) {
    console.error("Error in liking/unliking post:", err);
    res.status(500).json({ message: "Error in liking/unliking post" });
  }
};

// Function to comment on a post
export const commentPost = async (req, res) => {
  const { userId } = req;
  const { postId, comment } = req.body;

  // Validate that userId, postId, and comment are present
  if (!userId || !postId || !comment) {
    return res
      .status(400)
      .json({ message: "User ID, Post ID, and Comment are required" });
  }

  try {
    // Insert the comment into the comments table
    const [result] = await db.execute(
      "INSERT INTO comments (user_id, post_id, comment) VALUES (?, ?, ?)",
      [userId, postId, comment]
    );

    // Send response with success message and the new comment ID
    res
      .status(201)
      .json({ message: "Comment added", commentId: result.insertId });
  } catch (err) {
    console.error("Error in commenting:", err);
    res.status(500).json({ message: "Error in commenting" });
  }
};
export const getFeed = async (req, res) => {
  const { userId } = req; // Logged-in user's ID

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Modified SQL query to get all posts from all users (removing any filters by follower status)
  const sql = `
    SELECT p.id AS postId, p.content, p.image, p.caption, u.username, p.created_at,
           (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
           (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS commentCount
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `;

  try {
    const [results] = await db.execute(sql);

    if (results.length === 0) {
      return res.json({ message: "No posts found" });
    }

    // Standardizing the response format for posts
    const posts = results.map((post) => ({
      postId: post.postId,
      content: post.content,
      caption: post.caption,
      image: post.image,
      created_at: post.created_at,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      username: post.username,
      comments: [], // Comments are not being returned here, we can add them later if needed
    }));

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};
