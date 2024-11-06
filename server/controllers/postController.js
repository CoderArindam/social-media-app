import db from "../config/db.js";

export const createPost = async (req, res) => {
  const { content, image_url } = req.body;
  const userId = req.userId;

  try {
    const [result] = await db.query(
      `INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)`,
      [userId, content, image_url]
    );
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await db.query(`
            SELECT posts.*, users.username FROM posts
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC
        `);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
};
