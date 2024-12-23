import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Connected to the database successfully.");
    connection.release(); // release the connection back to the pool
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

export default db;
