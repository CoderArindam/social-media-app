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
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Function to like a post
export const likePost = async (req, res) => {
  const { userId } = req;
  const { postId } = req.body;

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

    let likeCount = 0;

    if (likeExists.length > 0) {
      // If like exists, remove it (unlike)
      await db.execute("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [
        userId,
        postId,
      ]);
      likeCount = likeExists.length - 1; // Decrease like count
    } else {
      // If like does not exist, add it (like)
      await db.execute("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [
        userId,
        postId,
      ]);
      likeCount = likeExists.length + 1; // Increase like count
    }

    // Get the updated liked status
    const [updatedLikeStatus] = await db.execute(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );
    const liked = updatedLikeStatus.length > 0;

    res.status(200).json({
      message: liked ? "Post liked" : "Post unliked",
      liked,
      likeCount, // Include updated like count
    });
  } catch (err) {
    console.error("Error in liking/unliking post:", err);
    res
      .status(500)
      .json({ message: "Error in liking/unliking post", error: err.message });
  }
};

//function to check liked status

// Function to check liked status
export const checkLikedStatus = async (req, res) => {
  const { userId } = req; // Logged-in user's ID
  const { postId } = req.body; // Post ID to check

  console.log(req);

  if (!userId || !postId) {
    return res
      .status(400)
      .json({ message: "User ID and Post ID are required" });
  }

  try {
    // Check if a like entry exists for this user and post
    const [likeStatus] = await db.execute(
      "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
      [userId, postId]
    );

    // Determine if the post is liked by the user
    const liked = likeStatus.length > 0;

    res.status(200).json({
      liked,
      message: liked
        ? "Post is liked by the user"
        : "Post is not liked by the user",
    });
  } catch (error) {
    console.error("Error checking liked status:", error);
    res
      .status(500)
      .json({ message: "Error checking liked status", error: error.message });
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

    // Retrieve the newly inserted comment along with user information
    const [newComment] = await db.execute(
      "SELECT c.id AS commentId, c.comment, u.username FROM comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.id = ?",
      [result.insertId]
    );

    // Send response with success message and the new comment data
    res.status(201).json({
      message: "Comment added",
      comment: newComment[0], // The newly added comment
    });
  } catch (err) {
    console.error("Error in commenting:", err);
    res
      .status(500)
      .json({ message: "Error in commenting", error: err.message });
  }
};

// Function to fetch comments for a post
export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    // Fetch the comments for the given post
    const [comments] = await db.execute(
      "SELECT c.id AS commentId, c.comment, u.username FROM comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.post_id = ?",
      [postId]
    );

    // Send the comments to the client
    res.status(200).json({ comments });
  } catch (err) {
    console.error("Error in fetching comments:", err);
    res
      .status(500)
      .json({ message: "Error in fetching comments", error: err.message });
  }
};

// Function to get the feed (all posts)
export const getFeed = async (req, res) => {
  const { userId } = req; // Logged-in user's ID from auth middleware
  const { username } = req.body; // Username from request body

  if (!userId || !username) {
    return res
      .status(400)
      .json({ message: "User ID and username are required" });
  }

  const sql = `
    SELECT p.id AS postId, p.content, p.image, p.caption, u.username, p.created_at,
           (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likeCount,
           (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS commentCount,
           EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = ?) AS liked,
           EXISTS (SELECT 1 FROM followers WHERE follower_username = ? AND following_username = u.username) AS isFollowing
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
  `;

  try {
    const [postResults] = await db.execute(sql, [userId, username]);

    const posts = await Promise.all(
      postResults.map(async (post) => {
        const [comments] = await db.execute(
          `SELECT c.id AS commentId, c.comment, c.created_at, u.username
           FROM comments c
           JOIN users u ON c.user_id = u.id
           WHERE c.post_id = ?
           ORDER BY c.created_at ASC`,
          [post.postId]
        );

        return {
          postId: post.postId,
          content: post.content,
          caption: post.caption,
          image: post.image,
          created_at: post.created_at,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
          username: post.username,
          liked: Boolean(post.liked),
          isFollowing: Boolean(post.isFollowing),
          comments: comments.map((comment) => ({
            commentId: comment.commentId,
            comment: comment.comment,
            created_at: comment.created_at,
            username: comment.username,
          })),
        };
      })
    );

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: err.message });
  }
};
