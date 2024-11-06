import db from "../config/db.js";

const createTables = async () => {
  try {
    await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    await db.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                content TEXT,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

    await db.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                post_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (post_id) REFERENCES posts(id)
            );
        `);

    await db.query(`
            CREATE TABLE IF NOT EXISTS follows (
                id INT AUTO_INCREMENT PRIMARY KEY,
                follower_id INT NOT NULL,
                following_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (follower_id) REFERENCES users(id),
                FOREIGN KEY (following_id) REFERENCES users(id)
            );
        `);

    console.log("Tables created or verified successfully.");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  }
};

export default createTables;
