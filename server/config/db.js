import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "social_media_app",
});

export default db;
